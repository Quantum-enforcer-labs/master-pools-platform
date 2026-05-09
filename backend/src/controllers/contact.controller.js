import {
  renderContactConfirmation,
  renderContactNotification,
} from "../emails/templates.js";
import { Contact } from "../models/Review.model.js";
import { sendFromPlatform, sendToPlatform } from "../utils/email.service.js";

export const submitContact = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  const contact = await Contact.create({
    name,
    email,
    phone,
    subject,
    message,
  });

  const inboxEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

  if (inboxEmail) {
    // Send internal notification to platform inbox via Nodemailer using branded template
    sendToPlatform({
      to: inboxEmail,
      subject: `[MATERPOOLS AND CONTRUCTION] New Contact: ${subject}`,
      html: renderContactNotification({ name, email, phone, subject, message }),
      from: process.env.EMAIL_FROM,
      replyTo: email,
    }).catch(console.error);

    // Send confirmation to user using Resend (transactional provider) with branded template
    sendFromPlatform({
      to: email,
      subject: "Thank you for contacting MATERPOOLS AND CONTRUCTION",
      html: renderContactConfirmation(name, String(contact._id)),
      from: process.env.RESEND_FROM || process.env.EMAIL_FROM,
    }).catch((err) => {
      // If Resend fails, fallback to Nodemailer for the confirmation
      console.error("Resend send failed, falling back to Nodemailer:", err);
      sendToPlatform({
        to: email,
        subject: "Thank you for contacting MATERPOOLS AND CONTRUCTION",
        html: renderContactConfirmation(name, String(contact._id)),
        from: process.env.EMAIL_FROM,
      }).catch(console.error);
    });
  }

  res
    .status(201)
    .json({ message: "Message sent successfully", id: contact._id });
};

export const adminGetContacts = async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;
  const filter = status ? { status } : {};
  const total = await Contact.countDocuments(filter);
  const contacts = await Contact.find(filter)
    .sort("-createdAt")
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json({
    contacts,
    pagination: { total, page: Number(page), pages: Math.ceil(total / limit) },
  });
};

export const adminUpdateContact = async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ contact });
};
