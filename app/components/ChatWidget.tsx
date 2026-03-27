"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const gradientBg: React.CSSProperties = { background: "linear-gradient(135deg, #7c3aed, #f97316)" };

function BoldText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**")
          ? <strong key={i}>{p.slice(2, -2)}</strong>
          : <span key={i}>{p}</span>
      )}
    </>
  );
}

export default function ChatWidget() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const bottomRef               = useRef<HTMLDivElement>(null);
  const inputRef                = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    setMessages((p) => [...p, { role: "assistant", content: "" }]);

    try {
      const schedule  = JSON.parse(localStorage.getItem("stride_schedule") ?? "{}");
      const ageStr    = localStorage.getItem("stride_age");
      const context = {
        name:       localStorage.getItem("stride_name")   ?? "",
        age:        ageStr ? parseInt(ageStr, 10) : null,
        gender:     localStorage.getItem("stride_gender") ?? "",
        goals:      JSON.parse(localStorage.getItem("stride_goals")      ?? "[]"),
        activities: JSON.parse(localStorage.getItem("stride_activities")  ?? "[]"),
        level:      schedule.level    ?? "",
        days:       schedule.days     ?? null,
        duration:   schedule.duration ?? "",
        time:       schedule.time     ?? "",
      };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, context }),
      });

      const reader  = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((p) => {
          const updated = [...p];
          updated[updated.length - 1] = { role: "assistant", content: accumulated };
          return updated;
        });
      }
    } catch {
      setMessages((p) => {
        const updated = [...p];
        updated[updated.length - 1] = { role: "assistant", content: "Something went wrong. Try again!" };
        return updated;
      });
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-5 md:bottom-6 md:right-6 z-50 w-[calc(100vw-40px)] max-w-sm flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
          style={{ height: "min(520px, calc(100dvh - 120px))" }}>

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0" style={gradientBg}>
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 48 48" fill="none" className="w-4 h-4">
                <path d="M 11 3 L 34 3 L 22 24 L 37 24 L 24 46 L 11 32 L 21 29 Z" fill="white" stroke="white" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-none">Stride AI</p>
              <p className="text-white/70 text-xs mt-0.5">Your fitness coach</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors p-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center text-center py-6 gap-2">
                <span className="text-3xl">👋</span>
                <p className="text-sm font-bold text-slate-700">Hey! I'm Stride AI.</p>
                <p className="text-xs text-slate-400 max-w-[200px]">Ask me anything about workouts, nutrition, or your goals.</p>
                <div className="flex flex-col gap-1.5 w-full mt-2">
                  {["Build me a workout plan", "What should I eat today?", "Tips for staying consistent"].map((s) => (
                    <button key={s} onClick={() => send(s)}
                      className="text-xs text-left px-3 py-2 rounded-xl border border-slate-200 text-slate-500 hover:border-violet-300 hover:text-violet-600 transition-all bg-slate-50">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={gradientBg}>
                    <svg viewBox="0 0 48 48" fill="none" className="w-3 h-3">
                      <path d="M 11 3 L 34 3 L 22 24 L 37 24 L 24 46 L 11 32 L 21 29 Z" fill="white" stroke="white" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/>
                    </svg>
                  </div>
                )}
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                  msg.role === "user"
                    ? "text-white rounded-tr-sm"
                    : "bg-slate-100 text-slate-700 rounded-tl-sm"
                }`} style={msg.role === "user" ? gradientBg : {}}>
                  {msg.content === "" && msg.role === "assistant"
                    ? <span className="flex gap-1 items-center h-4">
                        {[0, 150, 300].map((d) => (
                          <span key={d} className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                        ))}
                      </span>
                    : msg.content.split("\n").map((line, j) => {
                        if (line.startsWith("• ") || line.startsWith("- "))
                          return <div key={j} className="flex gap-1.5"><span className="mt-1 w-1 h-1 rounded-full bg-current flex-shrink-0 opacity-50" /><span><BoldText text={line.slice(2)} /></span></div>;
                        if (line.trim() === "") return <div key={j} className="h-1" />;
                        return <p key={j}><BoldText text={line} /></p>;
                      })
                  }
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 pb-3 pt-2 border-t border-slate-100 flex-shrink-0 flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Ask anything..."
              className="flex-1 bg-slate-100 rounded-2xl px-3 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${!input.trim() || loading ? "bg-slate-100 text-slate-300" : "text-white"}`}
              style={!input.trim() || loading ? {} : gradientBg}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 -rotate-90">
                <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-20 right-5 md:bottom-6 md:right-6 z-50 w-14 h-14 rounded-2xl text-white shadow-lg flex items-center justify-center transition-transform active:scale-95"
        style={gradientBg}
        aria-label="Open Stride AI"
      >
        {open
          ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6"><path d="M 11 3 L 34 3 L 22 24 L 37 24 L 24 46 L 11 32 L 21 29 Z" fill="white" stroke="white" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/></svg>
        }
      </button>
    </>
  );
}
