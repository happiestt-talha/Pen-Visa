// app/api/contact/route.js
import nodemailer from "nodemailer";

export const runtime = "nodejs";

async function tryCreateAndVerifyTransport(config) {
  // create transporter and attempt verify()
  const transporter = nodemailer.createTransport(config);
  try {
    await transporter.verify();
    return { ok: true, transporter };
  } catch (err) {
    return { ok: false, error: err, transporter };
  }
}

export async function POST(request) {
  try {
    // parse multipart/form-data
    const formData = await request.formData();

    const get = (name) => {
      const v = formData.get(name);
      return v === null ? "" : String(v);
    };

    const fullName = get("fullName") || "(no name)";
    const email = get("email") || "(no email)";
    const message = get("message") || "";
    const option = get("option") || "";
    const phone = get("phone") || "";
    const country = get("country") || "";
    const visaType = get("visaType") || "";

    if (!fullName || !email) {
      return new Response(JSON.stringify({ ok: false, error: "Name and email are required." }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // prepare attachments from formData (key: "attachments")
    const attachments = [];
    const files = formData.getAll("attachments") || [];
    for (const f of files) {
      if (!f || typeof f === "string") continue;
      const arrayBuffer = await f.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      attachments.push({
        filename: f.name || "attachment",
        content: buffer,
        contentType: f.type || "application/octet-stream",
      });
    }

    // base transporter config from env
    const baseConfig = {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: (process.env.SMTP_SECURE === "true"),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // diagnostics & timeouts
      logger: true,
      debug: true,
      connectionTimeout: 10000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
      tls: {
        // keep default, but if you face certificate issues in dev uncomment next line
        // rejectUnauthorized: false
      },
    };

    // console.log("Contact route: attempting SMTP verify with config:", {
    //   host: baseConfig.host,
    //   port: baseConfig.port,
    //   secure: baseConfig.secure,
    //   user: baseConfig.auth.user ? baseConfig.auth.user.replace(/.(?=.{3})/g, "*") : "<none>",
    // });

    // First attempt with given config
    let attempt = await tryCreateAndVerifyTransport(baseConfig);

    // If failed and the user used port 587, try fallback to 465 (secure)
    if (!attempt.ok) {
      // console.warn("First SMTP verify attempt failed:", attempt.error && attempt.error.message ? attempt.error.message : attempt.error);

      // If the original port looks like 587 or not secure, try secure 465 as a fallback
      const fallbackConfig = {
        ...baseConfig,
        port: 465,
        secure: true,
      };

      // console.log("Trying fallback SMTP port 465 with secure=true...");
      attempt = await tryCreateAndVerifyTransport(fallbackConfig);

      if (!attempt.ok) {
        // console.error("Fallback SMTP verify failed:", attempt.error && attempt.error.message ? attempt.error.message : attempt.error);
        // Return a detailed error to help debugging
        const errMsg = attempt.error && attempt.error.message ? attempt.error.message : String(attempt.error);
        return new Response(JSON.stringify({ ok: false, error: `SMTP verify failed: ${errMsg}` }), { status: 500, headers: { "Content-Type": "application/json" } });
      } else {
        // use fallback transporter
        // console.log("Fallback transporter verified OK (465). Using that transporter.");
      }
    } else {
      // console.log("SMTP transporter verified OK with provided config.");
    }

    // `attempt.transporter` is ready
    const transporter = attempt.transporter;

    const subject = `Website Contact — ${option || "contact"} — ${fullName}`;
    const html = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p><strong>Visa Type:</strong> ${visaType}</p>
      <p><strong>Option:</strong> ${option}</p>
      <hr/>
      <p><strong>Message:</strong></p>
      <p>${(message || "(no message)").replace(/\n/g, "<br/>")}</p>
    `;

    // Send email
    const sendResult = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: process.env.EMAIL_TO || process.env.SMTP_USER,
      subject,
      html,
      text: message,
      attachments: attachments.length ? attachments : undefined,
    });

    // console.log("Mail sent result:", sendResult);

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    // console.error("Contact API error (final):", err);
    const msg = err && err.message ? err.message : String(err);
    return new Response(JSON.stringify({ ok: false, error: msg }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
