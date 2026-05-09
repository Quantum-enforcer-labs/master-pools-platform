import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/client";

export default function AdminNewsletter() {
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !html) return toast.error("Subject and content required");
    setSending(true);
    try {
      const res = await api.post("/newsletter/admin/send", { subject, html });
      toast.success(res.data?.message || "Newsletter sent");
      setSubject("");
      setHtml("");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Send failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Newsletter</h1>
      <p className="text-sm text-gray-500">
        Send a newsletter to all subscribers.
      </p>

      <form
        onSubmit={handleSend}
        className="mt-4 flex flex-col gap-3 max-w-3xl"
      >
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          className="px-3 py-2 border rounded"
        />
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder="HTML body (allowed tags: p, a, img, strong, em, ul, ol, li)"
          rows={12}
          className="px-3 py-2 border rounded font-mono"
        />
        <div>
          <button type="submit" className="btn btn-primary" disabled={sending}>
            {sending ? "Sending…" : "Send to subscribers"}
          </button>
        </div>
      </form>
    </div>
  );
}
