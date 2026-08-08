import { X, Bot, Sparkles, SendHorizontal } from "lucide-react";
import { askAI } from "@/services/askAIService";
import {useEffect, useState, useRef, } from "react";



export default function AIChatDrawer({ open, onClose, report, }) {
    
  if (!open) return null;
  
    const [messages, setMessages] = useState(() => {
    const savedMessages = sessionStorage.getItem("ai-chat-history");

    if (savedMessages){
        return JSON.parse(savedMessages);
    }
        return [
        {
        role: "assistant",
        content:
        "👋 Welcome back!\n\nI can explain your spending, help you save money, analyze your budget, and answer questions about your finances.",
        },
        ];
    });

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
    sessionStorage.setItem(
        "ai-chat-history",
        JSON.stringify(messages)
        );
    }, [messages]);

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, [messages, loading]);

    const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [
        ...prev,
        {
        role: "user",
        content: input,
        },
    ]);

    setInput("");
    setLoading(true);

   try {
    const ai = await askAI({
    question: input,
    ...report.rawData,
    });

    setMessages((prev) => [
        ...prev,
        {
        role: "assistant",
        content: ai.answer,
        },
    ]);
    } catch (error) {
    console.error(error);

    setMessages((prev) => [
        ...prev,
        {
        role: "assistant",
        content: "Sorry, something went wrong.",
        },
    ]);
    } finally {
    setLoading(false);
    }
    };

  return (
    <div className="fixed inset-0 z-100 bg-black/40 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-[420px] bg-[#0E1628] border-l border-white/10 shadow-2xl flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <Bot className="h-6 w-6 text-violet-400" />
            <div>
              <h2 className="font-bold text-white">
                AI Financial Assistant
              </h2>
              <p className="text-xs text-slate-400">
                Ask anything about your finances
              </p>
            </div>
          </div>

          <button onClick={onClose}>
            <X className="text-slate-400" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg, index) => (
                <div
                key={index}
                className={`rounded-xl p-4 max-w-[90%] ${
                    msg.role === "assistant"
                    ? "bg-violet-500/10 border border-violet-500/20 text-white"
                    : "bg-sky-500/10 border border-sky-500/20 text-white ml-auto"
                }`}
                >
                {msg.content}
                </div>
            ))}

            {loading && (
                <div className="rounded-xl bg-violet-500/10 border border-violet-500/20 p-4 text-white">
                Thinking...
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your spending..."
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none"
                onKeyDown={(e) => {
                if (e.key === "Enter") {
                    sendMessage();
                }
                }}
                disabled={loading}
            />
            <button
            onClick={sendMessage}
            disabled={loading|| !input.trim()}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            <SendHorizontal className="h-5 w-5"/>
            </button>

        </div>
        </div>
      </div>
    </div>
  );
}