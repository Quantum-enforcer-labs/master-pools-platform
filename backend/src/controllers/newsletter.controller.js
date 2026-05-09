import {
  renderContactConfirmation,
  renderNewsletter,
} from "../emails/templates.js";
import Newsletter from "../models/Newsletter.model.js";
import { sendFromPlatform } from "../utils/email.service.js";

export const subscribe = async (req, res) => {
  const { email, name } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });
  try {
    const doc = await Newsletter.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      {
        email: email.toLowerCase().trim(),
        name: name || "",
        unsubscribed: false,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    // send confirmation to subscriber
    try {
      await sendFromPlatform({
        to: doc.email,
        subject: "Subscribed to MATERPOOLS newsletter",
        html: renderContactConfirmation(doc.name || "Subscriber", doc._id),
      });
    } catch (err) {
      console.error("newsletter subscribe: confirmation send failed", err);
    }

    res.status(201).json({
      message: "Subscribed",
      subscriber: { email: doc.email, name: doc.name },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to subscribe" });
  }
};

export const unsubscribe = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });
  try {
    const doc = await Newsletter.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { unsubscribed: true },
      { new: true },
    );
    if (!doc) return res.status(404).json({ message: "Subscriber not found" });
    res.json({ message: "Unsubscribed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to unsubscribe" });
  }
};

// Admin-only endpoint: send newsletter to all subscribers (simple implementation)
export const sendNewsletter = async (req, res) => {
  const { subject, html } = req.body;
  if (!subject || !html)
    return res.status(400).json({ message: "subject and html required" });

  try {
    const recipients = await Newsletter.find({ unsubscribed: false })
      .select("email name")
      .lean();
    const apiSender = process.env.RESEND_FROM || process.env.EMAIL_FROM;

    // send sequentially to avoid hitting provider rate limits; for large lists use background jobs
    const results = [];
    for (const r of recipients) {
      try {
        const payloadHtml = renderNewsletter(
          subject,
          html,
          r.name || "Subscriber",
        );
        await sendFromPlatform({
          to: r.email,
          subject,
          html: payloadHtml,
          from: apiSender,
        });
        results.push({ email: r.email, status: "sent" });
      } catch (err) {
        console.error("newsletter send failed for", r.email, err);
        results.push({ email: r.email, status: "failed" });
      }
    }

    res.json({ message: "Newsletter queued", results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to send newsletter" });
  }
};

export default { subscribe, unsubscribe, sendNewsletter };
