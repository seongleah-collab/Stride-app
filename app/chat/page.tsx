"use client";
import { useState, useEffect, useRef } from "react";
import AppSidebar from "@/app/components/AppSidebar";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface UserContext {
  name: string;
  age: number | null;
  gender: string;
  goals: string[];
  activities: string[];
  level: string;
  days: number | null;
  duration: string;
  time: string;
}

// ── Gradient helpers ──────────────────────────────────────────────────────────

const gradientBg: React.CSSProperties = { background: "linear-gradient(135deg, #7c3aed, #f97316)" };

// ── Suggestion chips ──────────────────────────────────────────────────────────

const suggestions = [
  "Build me a weekly workout plan",
  "What should I eat after a workout?",
  "How do I improve my running pace?",
  "Tips for staying consistent",
  "How much rest do I need?",
  "Help me train for my first 5K",
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function ChatPage() {
  const [messages, setMessages]     = useState<Message[]>([]);
  const [input, setInput]           = useState("");
  const [loading, setLoading]       = useState(false);
  const [context, setContext]       = useState<UserContext>({ name: "", age: null, gender: "", goals: [], activities: [], level: "", days: null, duration: "", time: "" });
  const bottomRef                   = useRef<HTMLDivElement>(null);
  const inputRef                    = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const goals      = JSON.parse(localStorage.getItem("stride_goals")      ?? "[]");
    const activities = JSON.parse(localStorage.getItem("stride_activities")  ?? "[]");
    const schedule   = JSON.parse(localStorage.getItem("stride_schedule")    ?? "{}");
    const ageStr     = localStorage.getItem("stride_age");
    setContext({
      name:       localStorage.getItem("stride_name")   ?? "",
      age:        ageStr ? parseInt(ageStr, 10) : null,
      gender:     localStorage.getItem("stride_gender") ?? "",
      goals,
      activities,
      level:      schedule.level    ?? "",
      days:       schedule.days     ?? null,
      duration:   schedule.duration ?? "",
      time:       schedule.time     ?? "",
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Placeholder for streaming assistant message
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          context,
        }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: accumulated };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="min-h-screen bg-[#f8f7f4] flex">
      <AppSidebar />

      <div className="flex-1 md:ml-[260px] flex flex-col min-h-screen">

        {/* Header */}
        <div className="bg-white border-b border-slate-100 px-4 md:px-8 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={gradientBg}>
            <svg viewBox="0 0 48 48" fill="none" className="w-5 h-5">
              <path d="M 11 3 L 34 3 L 22 24 L 37 24 L 24 46 L 11 32 L 21 29 Z" fill="white" stroke="white" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h1 className="font-black text-slate-800 text-base leading-tight">Stride AI</h1>
            <p className="text-xs text-slate-400">Your personal fitness coach</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-400 font-medium">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 pb-2">
          <div className="max-w-2xl mx-auto">

            {/* Empty state */}
            {isEmpty && (
              <div className="flex flex-col items-center text-center pt-8 pb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={gradientBg}>
                  <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9">
                    <path d="M 11 3 L 34 3 L 22 24 L 37 24 L 24 46 L 11 32 L 21 29 Z" fill="white" stroke="white" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/>
                  </svg>
                </div>
                <h2 className="text-xl font-black text-slate-800 mb-1">Hey, I'm Stride AI 👋</h2>
                <p className="text-slate-400 text-sm max-w-xs">
                  Your personal fitness coach. Ask me anything about workouts, nutrition, recovery, or your goals.
                </p>

                {/* Suggestion chips */}
                <div className="flex flex-wrap gap-2 justify-center mt-6">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="px-4 py-2 rounded-2xl text-sm font-medium bg-white border border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-700 transition-all shadow-sm"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message bubbles */}
            <div className="flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={gradientBg}>
                      <svg viewBox="0 0 48 48" fill="none" className="w-4 h-4">
                        <path d="M 11 3 L 34 3 L 22 24 L 37 24 L 24 46 L 11 32 L 21 29 Z" fill="white" stroke="white" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/>
                      </svg>
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "text-white rounded-tr-sm"
                        : "bg-white text-slate-700 shadow-sm rounded-tl-sm border border-slate-100"
                    }`}
                    style={msg.role === "user" ? gradientBg : {}}
                  >
                    {msg.content === "" && msg.role === "assistant" ? (
                      <span className="flex gap-1 items-center h-5">
                        <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </span>
                    ) : (
                      <FormattedMessage text={msg.content} />
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-violet-400 flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-0.5">
                      Y
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input bar */}
        <div className="bg-white border-t border-slate-100 px-4 md:px-8 py-4">
          <div className="max-w-2xl mx-auto flex gap-3 items-end">
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-violet-200 focus-within:border-violet-300 transition-all">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Stride AI anything..."
                rows={1}
                style={{ resize: "none" }}
                className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none leading-relaxed"
              />
            </div>
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
                !input.trim() || loading ? "bg-slate-100 text-slate-300" : "text-white shadow-md"
              }`}
              style={!input.trim() || loading ? {} : gradientBg}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 -rotate-90">
                <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
              </svg>
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-300 mt-2">Stride AI · Powered by Claude · Press Enter to send</p>
        </div>

      </div>
    </div>
  );
}

// ── Minimal markdown renderer (bold + bullets) ────────────────────────────────

function FormattedMessage({ text }: { text: string }) {
  return (
    <div>
      {text.split("\n").map((line, i) => {
        // Bullet points
        if (line.startsWith("• ") || line.startsWith("- ")) {
          return (
            <div key={i} className="flex gap-2 my-0.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 opacity-50" />
              <span><BoldText text={line.slice(2)} /></span>
            </div>
          );
        }
        if (line.trim() === "") return <div key={i} className="h-2" />;
        return <p key={i} className="my-0.5"><BoldText text={line} /></p>;
      })}
    </div>
  );
}

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
