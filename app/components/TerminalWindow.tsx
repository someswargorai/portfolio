"use client";

import { useAppDispatch } from "@/redux/hooks/hook";
import { TerminalToggle } from "@/redux/slices/dockSlice";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

export default function TerminalWindow() {
  const [top, setTop] = useState(10);
  const [left, setLeft] = useState(10);
  const dispatch = useAppDispatch();
  const [offset, setOffSet] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState(false);

  const close = () => {
    dispatch(TerminalToggle());
  };

  useEffect(() => {
    const mouseUp = () => {
      setDrag(false);
    };

    const mouseMove = (e: globalThis.MouseEvent) => {
      if(!drag) return;  
      setLeft(e.clientX - offset.x);
      setTop(e.clientY - offset.y);
    };

    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mouseup", mouseUp);
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [drag, offset]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDrag(true);
    setOffSet({
      x: e.clientX - left,
      y: e.clientY - top,
    });
  };

  return (
    <div
      className="fixed bg-white/50 shadow-lg rounded-xl backdrop-blur-xl max-w-2xl mx-auto mt-10 font-mono"
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      <div
        className="bg-gray-100 px-4 py-3 items-center rounded-t-xl flex justify-between cursor-move"
        onMouseDown={onMouseDown}
      >
        <div className="flex gap-2">
          <div
            className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
            onClick={close}
          ></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-sm font-semibold">Tech Stack</span>
      </div>

      <div className="p-5 space-y-4 text-sm">
        <p className="text-gray-700">@som % show tech stack</p>

        <div className="border-t pt-2">
          <div className="grid grid-cols-2 font-semibold mb-3">
            <span>Category</span>
            <span>Technologies</span>
          </div>

          {[
            { cat: "Frontend", tech: "React, Next.js, JavaScript, HTML, CSS" },
            { cat: "Styling", tech: "Tailwind CSS" },
            { cat: "Backend", tech: "Node.js" },
            { cat: "Database", tech: "MongoDB" },
            { cat: "Dev Tools", tech: "Docker, GitHub" },
            { cat: "Learning", tech: "AWS, Linux" },
          ].map((item) => (
            <div key={item.cat} className="grid grid-cols-2 py-1 items-start">
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <Check size={16} />
                {item.cat}
              </div>
              <span className="text-gray-700">{item.tech}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t">
          <p className="flex items-center gap-2 text-green-600 font-semibold">
            <Check size={16} />6 of 6 stacks loaded successfully (100%)
          </p>
          <p className="text-gray-500 text-xs">⚑ Render time: 6ms</p>
        </div>
      </div>
    </div>
  );
}
