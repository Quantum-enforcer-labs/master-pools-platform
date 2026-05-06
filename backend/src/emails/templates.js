export function renderWelcome(name) {
  return `
  <div style="font-family: Arial, sans-serif; color:#111">
    <h2 style="color:#0b5bd7">Welcome to MATERPOOLS AND CONTRUCTION, ${escapeHtml(name)}!</h2>
    <p>Thank you for registering with MATERPOOLS AND CONTRUCTION. We're excited to help you build your dream pool.</p>
    <p style="margin-top:1rem">Visit your dashboard to get started: <a href="${process.env.CLIENT_URL}">Open Dashboard</a></p>
    <p style="margin-top:1.5rem">— MATERPOOLS AND CONTRUCTION Team</p>
  </div>`;
}

export function renderOtp(name, code) {
  return `
  <div style="font-family: Arial, sans-serif; color:#111">
    <h2 style="color:#0b5bd7">Your MATERPOOLS AND CONTRUCTION Verification Code</h2>
    <p>Hi ${escapeHtml(name)},</p>
    <p>Your verification code is:</p>
    <p style="font-size:1.5rem; font-weight:700; letter-spacing:2px">${escapeHtml(code)}</p>
    <p>This code expires in 10 minutes. If you didn't request this, please ignore this email.</p>
    <p style="margin-top:1.5rem">— MATERPOOLS AND CONTRUCTION Team</p>
  </div>`;
}

export function renderPasswordReset(name, link) {
  return `
  <div style="font-family: Arial, sans-serif; color:#111">
    <h2 style="color:#0b5bd7">Reset Your MATERPOOLS AND CONTRUCTION Password</h2>
    <p>Hi ${escapeHtml(name)},</p>
    <p>Click the link below to reset your password. This link is valid for 60 minutes.</p>
    <p><a href="${escapeHtml(link)}">Reset Your Password</a></p>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p style="margin-top:1.5rem">— MATERPOOLS AND CONTRUCTION Team</p>
  </div>`;
}

export function renderPasswordChanged(name) {
  return `
  <div style="font-family: Arial, sans-serif; color:#111">
    <h2 style="color:#0b5bd7">Your MATERPOOLS AND CONTRUCTION Password Was Changed</h2>
    <p>Hi ${escapeHtml(name)},</p>
    <p>Your password has been successfully updated. If you did not perform this change, contact support immediately.</p>
    <p style="margin-top:1.5rem">— MATERPOOLS AND CONTRUCTION Team</p>
  </div>`;
}

function escapeHtml(str) {
  return String(str).replace(
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
