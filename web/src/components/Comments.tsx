'use client';

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, MessageCircle, User, Clock } from "lucide-react";

interface Comment {
  id: string;
  name: string;
  text: string;
  createdAt: string;
}

export default function CommentsPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!open) return;
    fetch("/api/comments")
      .then((r) => r.json())
      .then((data) => setComments(data.comments || []))
      .catch(() => {});
  }, [open]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSending(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() || "An\u00f3nimo", text: text.trim() }),
      });
      const data = await res.json();
      if (data.comment) {
        setComments((prev) => [data.comment, ...prev]);
        setText("");
        if (!name) setName("An\u00f3nimo");
      }
    } catch {} finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/50" onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: "0%" }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-[95] w-full max-w-md bg-bg-base shadow-2xl"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
                <div className="flex items-center gap-2">
                  <MessageCircle size={18} className="text-brand-blue" />
                  <h2 className="text-sm font-bold text-text-primary">
                    Comentarios ({comments.length})
                  </h2>
                </div>
                <button onClick={onClose} className="flex items-center justify-center rounded-[10px] p-2 min-h-[44px] min-w-[44px]">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                {comments.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-text-muted">
                    <MessageCircle size={40} className="mb-3 opacity-30" />
                    <p className="text-sm font-semibold">No hay comentarios a\u00fan</p>
                    <p className="text-xs">S\u00e9 el primero en comentar</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {comments.map((c) => (
                      <div key={c.id} className="rounded-[10px] bg-bg-surface p-3">
                        <div className="mb-1 flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue/10">
                            <User size={12} className="text-brand-blue" />
                          </div>
                          <span className="text-xs font-bold text-text-primary">{c.name}</span>
                          <span className="flex items-center gap-1 text-[10px] text-text-muted">
                            <Clock size={10} />
                            {new Date(c.createdAt).toLocaleDateString("es-CO", {
                              day: "numeric", month: "short",
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary">{c.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-border-subtle px-4 py-3">
                <form onSubmit={handleSubmit} className="space-y-2">
                  <input
                    type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre (opcional)"
                    maxLength={50}
                    className="w-full rounded-[10px] border border-border-default bg-bg-surface px-3 py-2 text-xs transition-all focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text" value={text} onChange={(e) => setText(e.target.value)}
                      placeholder="Escribe un comentario..."
                      maxLength={500}
                      required
                      className="flex-1 rounded-[10px] border border-border-default bg-bg-surface px-3 py-2 text-xs transition-all focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                    />
                    <button type="submit" disabled={sending || !text.trim()}
                      className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-brand-blue text-white disabled:opacity-40 min-h-[44px] min-w-[44px]"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
