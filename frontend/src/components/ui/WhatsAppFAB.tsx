import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppFAB() {
  const phoneNumber = "263772562125";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hello%20MasterPools!%20I%20would%20like%20to%20inquire%20about%20your%20services.`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      title="Chat with us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        width: "3.5rem",
        height: "3.5rem",
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#FFFFFF",
        textDecoration: "none",
        zIndex: 40,
        boxShadow: "0 4px 12px rgba(37, 211, 102, 0.4)",
        cursor: "pointer",
      }}
    >
      <MessageCircle size={24} fill="currentColor" />
    </motion.a>
  );
}
