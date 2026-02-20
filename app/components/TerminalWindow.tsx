"use client";

import { GoogleGenAI } from "@google/genai";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hook";
import { TerminalToggle } from "@/redux/slices/dockSlice";
import { clickedZIndex } from "@/redux/slices/zIndexSlice";
import { Send, Terminal as TerminalIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from 'react-markdown';


const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.warn("[Terminal] GEMINI_API_KEY missing → responses disabled");
}

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY || "" });

const SYSTEM_INSTRUCTION = `
You are Som — a Software Developer with 1.5 years of professional experience.

Core identity:
- Practical, ownership-driven engineer
- Focus on clean code, scalability, maintainability, security
- Strong problem-solving and continuous learning mindset
- Comfortable full-stack, but emphasize thoughtful architecture

Short version (use when concise):
"Software Developer • 1.5+ years • Clean architecture • Problem solver • Always learning"

When users ask about you/your background/tech stack/experience:
- Be honest and professional
- Mention ~1.5 years experience building & maintaining production apps
- Highlight React/Next.js/Tailwind, Node.js, MongoDB, Docker, GitHub, learning AWS/Linux
- Talk about side projects, experimentation, clean code principles

Tone: confident but humble, clear, technical when appropriate, friendly

Do NOT hallucinate experience or technologies you don't have.
If question is unrelated to you → answer normally without forcing profile in.
`.trim();

type Message = {
  role: "user" | "model";
  parts: { text: string }[];
};

type HistoryDisplayItem =
  | { type: "welcome" | "command" | "error"; content: string }
  | { type: "response"; content: string; isStreaming?: boolean };

export default function TerminalWindow() {
  const [top, setTop] = useState(60);
  const [left, setLeft] = useState(20);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState(false);

  const dispatch = useAppDispatch();
  const { zIndexclicked } = useAppSelector((state) => state.zIndex);

 const [displayHistory, setDisplayHistory] = useState<HistoryDisplayItem[]>([
  {
    type: "welcome",
    content: `
Welcome to **Som's Portfolio Terminal**  
Powered by Someswar Gorai • Premium Edition

@som % show tech stack

\`\`\`
Category          │ Technologies
──────────────────┼───────────────────────────────────────
Frontend          │ React, Next.js, JavaScript, HTML, CSS
Styling           │ Tailwind CSS
Backend           │ Node.js
Database          │ MongoDB
Dev Tools         │ Docker, GitHub
Learning          │ AWS, Linux
\`\`\`

**✓ 6 of 6 stacks loaded successfully (100%)**  
Render time: 6ms
    `.trim(),
  },
]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = () => dispatch(TerminalToggle());

  useEffect(() => {
    const onMouseUp = () => setDrag(false);
    const onMouseMove = (e: MouseEvent) => {
      if (!drag) return;
      setLeft(e.clientX - offset.x);
      setTop(e.clientY - offset.y);
    };

    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [drag, offset]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).tagName === "INPUT") return;
    setDrag(true);
    setOffset({ x: e.clientX - left, y: e.clientY - top });
  };

const handleSubmit = async () => {
  const command = input.trim();
  if (!command || isLoading) return;

  setDisplayHistory((prev) => [...prev, { type: "command", content: command }]);
  setInput("");
  setIsLoading(true);

  setDisplayHistory((prev) => [...prev, { type: "response", content: "", isStreaming: true }]);
  const responseIndex = displayHistory.length;

  try {
    const stream = await genAI.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: [
        {
        role: "model",
        parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        {
          role: "user",
          parts: [{ text: command }],
        },
      ]
    });

    let fullResponse = "";

    for await (const chunk of stream) {
      const textChunk = chunk.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      if (textChunk) {
        fullResponse += textChunk;

        setDisplayHistory((current) =>
          current.map((item, idx) =>
            idx === responseIndex
              ? { ...item, content: fullResponse }
              : item
          )
        );
      }
    }
    setDisplayHistory((current) =>
      current.map((item, idx) =>
        idx === responseIndex ? { ...item, isStreaming: false } : item
      )
    );
  } catch (err) {
    console.error("Gemini error:", err);
   
  } finally {
    setIsLoading(false);
  }
};

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [displayHistory]);


  const handleWindowClick = () => {
    dispatch(clickedZIndex("terminal"));
    
  };

  return (
    <div
      className="fixed bg-black/90 backdrop-blur-xl text-green-100 shadow-2xl rounded-xl border border-green-900/50 overflow-hidden font-mono text-sm w-[350px] sm:w-full sm:max-w-2xl max-h-[85vh] text-[10px] sm:text-[14px] [&::-webkit-scrollbar]:w-1"
      style={{
        top: `${top}px`,
        left: `${left}px`,
        zIndex: zIndexclicked === "terminal" ? 100 : 1,
      }}
      onClick={handleWindowClick}
    >
      {/* Title bar */}
      <div
        className="bg-gradient-to-r from-gray-950 to-black px-4 py-2.5 flex items-center justify-between cursor-move border-b border-green-900/60 select-none"
        onMouseDown={onMouseDown}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer transition-colors" onClick={close} />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-green-400/90 font-medium flex items-center gap-1.5 ml-2">
            <TerminalIcon size={15} /> som@ai-terminal
          </span>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="p-4 pb-2 min-h-[180px] max-h-[65vh] overflow-y-auto leading-relaxed scrollbar-thin [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-black/40 [&::-webkit-scrollbar-thumb]:bg-black [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-black"
      >
        {displayHistory.map((item, i) => (
          <div key={i} className="mb-2 break-words">
            {item.type === "command" ? (
              <div className="text-cyan-400">
                @som % <span className="text-gray-200"><ReactMarkdown>{item.content}</ReactMarkdown></span>
              </div>
            ) : item.type === "response" ? (
              <ReactMarkdown>
                {item.content}
              </ReactMarkdown>
            ) : item.type === "error" ? (
              <div className="text-red-400 font-medium">
                <ReactMarkdown>{item.content}</ReactMarkdown></div>
            ) : (
              <div className="text-green-400/80 italic">
                <ReactMarkdown>{item.content}</ReactMarkdown></div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 py-3 flex items-center gap-2">
        <span className="text-cyan-400 shrink-0">@som %</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="flex-1 bg-transparent outline-none text-green-100 caret-green-400 placeholder:text-green-800/60 font-mono disabled:opacity-50"
          placeholder={isLoading ? "thinking..." : "ask me anything... (about me, tech, code...)"}
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          autoComplete="off"
        />
        <button
    onClick={handleSubmit}
    disabled={isLoading || !input.trim()}
    className="sm:hidden text-green-400 hover:text-green-300 disabled:opacity-40 transition"
    aria-label="Send command"
  >
    <Send size={18} />
  </button>
        {isLoading && <div className="text-green-600 animate-pulse">...</div>}
      </div>
    </div>
  );
}