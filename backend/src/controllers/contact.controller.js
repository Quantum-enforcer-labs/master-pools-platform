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

  if (process.env.EMAIL_USER) {
    // Send internal notification to platform inbox via Nodemailer
    sendToPlatform({
      to: process.env.EMAIL_USER,
      subject: `[MATERPOOLS AND CONTRUCTION] New Contact: ${subject}`,
      html: `<h2>New Contact</h2><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone || "N/A"}</p><p><b>Subject:</b> ${subject}</p><p>${message}</p>`,
      from: process.env.EMAIL_FROM,
    }).catch(console.error);

    // Send confirmation to user using Resend (transactional provider)
    sendFromPlatform({
      to: email,
      subject: "Thank you for contacting MATERPOOLS AND CONTRUCTION",
      html: `<h2>Thank you, ${name}!</h2><p>We received your message and will reply within 24 hours.</p><p>Reference: <b>${contact._id}</b></p><br/><p>MATERPOOLS AND CONTRUCTION Team</p>`,
      from: process.env.RESEND_FROM || process.env.EMAIL_FROM,
    }).catch((err) => {
      // If Resend fails, fallback to Nodemailer for the confirmation
      console.error("Resend send failed, falling back to Nodemailer:", err);
      sendToPlatform({
        to: email,
        subject: "Thank you for contacting MATERPOOLS AND CONTRUCTION",
        html: `<h2>Thank you, ${name}!</h2><p>We received your message and will reply within 24 hours.</p><p>Reference: <b>${contact._id}</b></p><br/><p>MATERPOOLS AND CONTRUCTION Team</p>`,
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
