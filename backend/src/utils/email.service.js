import nodemailer from "nodemailer";

const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true",
    auth: process.env.EMAIL_USER
      ? { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
      : undefined,
  });

export async function sendToPlatform({ to, subject, html, from, replyTo }) {
  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: from || process.env.EMAIL_FROM,
      to: to || process.env.EMAIL_USER,
      ...(replyTo ? { replyTo } : {}),
      subject,
      html,
    });
    return info;
  } catch (err) {
    console.error("sendToPlatform error:", err);
    throw err;
  }
}

// Uses Resend API for sending transactional emails from the platform
export async function sendFromPlatform({ to, subject, html, from }) {
  const apiKey = process.env.RESEND_API_KEY;
  const sender = from || process.env.RESEND_FROM || process.env.EMAIL_FROM;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const payload = {
    from: sender,
    to,
    subject,
    html,
  };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      const err = new Error(`Resend API error: ${res.status} ${text}`);
      console.error(err);
      throw err;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("sendFromPlatform error:", err);
    throw err;
  }
}

export default { sendToPlatform, sendFromPlatform };
