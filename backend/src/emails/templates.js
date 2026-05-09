const BRAND_PRIMARY = "#0b5bd7";
const SITE = process.env.CLIENT_URL || "https://www.masterspools.co.zw";

function headerHtml() {
  const logo = `${SITE.replace(/\/$/, "")}/images/logo.svg`;
  return `
  <div style="background:#f5f7fb;padding:24px 0;font-family:Arial,Helvetica,sans-serif;"> 
    <div style="max-width:600px;margin:0 auto;padding:18px;background:#ffffff;border-radius:8px;overflow:hidden;"> 
      <div style="text-align:center;padding-bottom:8px;"> 
        <img src="${logo}" alt="MATERPOOLS logo" style="height:48px;width:auto;display:inline-block;" />
      </div>
      <div style="padding:12px 20px;color:#111;font-size:15px;line-height:1.5;">
`;
}

function footerHtml() {
  return `
      </div>
      <div style="border-top:1px solid #eef2f6;padding:12px 20px;font-size:13px;color:#6b7280;text-align:center;"> 
        <div>Need help? Reply to this email or visit <a href="${SITE}" style="color:${BRAND_PRIMARY}">${SITE}</a></div>
        <div style="margin-top:6px;font-size:12px;color:#9ca3af">© ${new Date().getFullYear()} MATERPOOLS AND CONTRUCTION</div>
      </div>
    </div>
  </div>`;
}

export function renderWelcome(name) {
  return (
    headerHtml() +
    `
        <h2 style="color:${BRAND_PRIMARY};margin:0 0 12px 0;font-size:20px;">Welcome to MATERPOOLS AND CONTRUCTION, ${escapeHtml(
          name,
        )}!</h2>
        <p>Thanks for joining MATERPOOLS. We're excited to help you start your project.</p>
        <p style="margin-top:12px"><a href="${SITE}" style="display:inline-block;background:${BRAND_PRIMARY};color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;">Open Dashboard</a></p>
        <p style="margin-top:14px">— The MATERPOOLS Team</p>
  ` +
    footerHtml()
  );
}

export function renderOtp(name, code) {
  return (
    headerHtml() +
    `
        <h2 style="color:${BRAND_PRIMARY};margin:0 0 12px 0;font-size:18px;">Verify your email</h2>
        <p>Hi ${escapeHtml(name)},</p>
        <p>Your verification code is:</p>
        <div style="margin:12px 0;padding:12px 16px;background:#f3f6ff;border-radius:6px;font-weight:700;letter-spacing:2px;font-size:18px;text-align:center;">${escapeHtml(
          code,
        )}</div>
        <p style="font-size:13px;color:#6b7280">This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
  ` +
    footerHtml()
  );
}

export function renderPasswordReset(name, link) {
  const safeLink = escapeHtml(link);
  return (
    headerHtml() +
    `
        <h2 style="color:${BRAND_PRIMARY};margin:0 0 12px 0;font-size:18px;">Reset your password</h2>
        <p>Hi ${escapeHtml(name)},</p>
        <p>Click the button below to reset your password. The link is valid for 60 minutes.</p>
        <p style="margin-top:12px"><a href="${safeLink}" style="display:inline-block;background:${BRAND_PRIMARY};color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;">Reset Password</a></p>
        <p style="margin-top:12px;color:#6b7280;font-size:13px">If you did not request a password reset, please ignore this email.</p>
  ` +
    footerHtml()
  );
}

export function renderPasswordChanged(name) {
  return (
    headerHtml() +
    `
        <h2 style="color:${BRAND_PRIMARY};margin:0 0 12px 0;font-size:18px;">Password changed</h2>
        <p>Hi ${escapeHtml(name)},</p>
        <p>Your password was changed successfully. If you did not perform this action, contact support immediately.</p>
  ` +
    footerHtml()
  );
}

export function renderNewsletter(subject, bodyHtml, recipientName) {
  // bodyHtml is assumed safe HTML produced by admin; we still wrap with header/footer and escape the recipient name
  return (
    headerHtml() +
    `
        <h2 style="color:${BRAND_PRIMARY};margin:0 0 12px 0;font-size:18px;">${escapeHtml(subject)}</h2>
        <p>Hi ${escapeHtml(recipientName || "Subscriber")},</p>
        <div style="margin-top:10px;color:#111;">${bodyHtml}</div>
  ` +
    footerHtml()
  );
}

export function renderContactNotification({
  name,
  email,
  phone,
  subject,
  message,
}) {
  return (
    headerHtml() +
    `
        <h2 style="color:${BRAND_PRIMARY};margin:0 0 12px 0;font-size:18px;">New contact message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "N/A")}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject || "No subject")}</p>
        <hr style="border:none;border-top:1px solid #eef2f6;margin:12px 0;" />
        <div style="white-space:pre-wrap;color:#111">${escapeHtml(message)}</div>
  ` +
    footerHtml()
  );
}

export function renderContactConfirmation(name, contactId) {
  return (
    headerHtml() +
    `
        <h2 style="color:${BRAND_PRIMARY};margin:0 0 12px 0;font-size:18px;">Thanks for contacting us</h2>
        <p>Hi ${escapeHtml(name)},</p>
        <p>We received your message. Our team will reply within 24 hours.</p>
        <p style="margin-top:12px">Reference: <strong>${escapeHtml(contactId)}</strong></p>
  ` +
    footerHtml()
  );
}

function escapeHtml(str) {
  return String(str ?? "").replace(
    /[&<>\"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c],
  );
}
