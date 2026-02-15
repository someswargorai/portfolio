"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hook";
import { safariToggle } from "@/redux/slices/dockSlice";
import { clickedZIndex } from "@/redux/slices/zIndexSlice";
import { Linkedin, Package } from "lucide-react";
import { useEffect, useState } from "react";

export default function SafariWindow() {
  const [drag, setDrag] = useState(false);
  const [top, setTop] = useState(40);
  const [left, setLeft] = useState(10);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const dispatch = useAppDispatch();
  const { zIndexclicked } = useAppSelector((state) => state.zIndex);

  useEffect(() => {
    const mouseUp = () => setDrag(false);

    const mouseMove = (e: globalThis.MouseEvent) => {
      if (!drag) return;
      setLeft(e.clientX - offset.x);
      setTop(e.clientY - offset.y);
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, [offset, drag]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDrag(true);
    setOffset({
      x: e.clientX - left,
      y: e.clientY - top,
    });
  };

  const closeWindow = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(safariToggle());
  };

  const clicked = () => {
    dispatch(clickedZIndex("safari"));
  };

  return (
    <div
      className={`
        fixed flex justify-center py-1 px-2 sm:py-2 sm:px-4
        w-[min(96vw,380px)] sm:w-[min(90vw,800px)] md:w-[min(85vw,900px)]
      `}
      style={{
        top: `${top}px`,
        left: `${left}px`,
        zIndex: zIndexclicked === "safari" ? 10 : 1,
      }}
      onClick={clicked}
    >
      <div
        className={`
          w-full bg-white/80 backdrop-blur-xl
          border border-white/30 shadow-2xl rounded-md
          overflow-hidden flex flex-col
          max-h-[76vh]
        `}
      >
        {/* Title bar */}
        <div
          className={`
            flex items-center justify-between gap-2 
            px-3 sm:px-4 py-2.5 sm:py-3
            border-b border-white/30 bg-gray-100/80 backdrop-blur-xl
            cursor-move select-none
          `}
          onMouseDown={onMouseDown}
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 cursor-pointer"
              onClick={closeWindow}
            />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
          </div>

          <span className="text-xs sm:text-sm font-medium text-gray-700 truncate max-w-[140px] sm:max-w-[300px]">
            My Developer Blog — Safari
          </span>

          <div className="w-14 sm:w-16" /> {/* spacer for symmetry */}
        </div>

        {/* Content area */}
        <div
          className={`
            flex-1 overflow-y-auto
            px-5 sm:px-8 md:px-10
            py-6 sm:py-8 md:py-10
          `}
        >
          <h2
            className={`
              text-pink-600 font-semibold
              text-lg sm:text-xl md:text-2xl
              mb-6 sm:mb-10
              text-center sm:text-left
            `}
          >
            My Developer Blog
          </h2>

          <div className="flex flex-col gap-10 sm:gap-12">
            {/* LinkedIn post */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
              <div className="rounded-lg bg-gray-100/70 p-2.5 sm:p-3 flex-shrink-0">
                <Linkedin size={36} className="text-[#0077B5] sm:size-10" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-gray-500 text-xs sm:text-sm mb-1">
                  March 2025
                </p>
                <h3
                  className={`
                    font-semibold text-base sm:text-lg md:text-xl
                    text-gray-900 leading-snug
                  `}
                >
                  Journey of Building My Own Chat Application — PingMe
                </h3>

                <a
                  href="https://www.linkedin.com/posts/som-gorai-3a12582b3_mern-socketio-aws-activity-7298774778117529602-EWUB?..."
                  target="_blank"
                  className={`
                    text-blue-600 hover:underline
                    text-xs sm:text-sm mt-2 sm:mt-1
                    inline-flex items-center gap-1.5
                  `}
                >
                  Read full post on LinkedIn →
                </a>
              </div>
            </div>

            {/* npm package */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
              <div className="rounded-lg bg-gray-100/70 p-2.5 sm:p-3 flex-shrink-0">
                <Package size={36} className="text-red-600 sm:size-10" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-gray-500 text-xs sm:text-sm mb-1">
                  Published — 2 years ago
                </p>
                <h3
                  className={`
                    font-semibold text-base sm:text-lg md:text-xl
                    text-gray-900 leading-snug
                  `}
                >
                  node-data-cryption: Secure SHA-256 based password hashing for Node.js
                </h3>

                <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
                  <strong>node-data-cryption · 1.0.2 · Public</strong>
                  <br />
                  A simple Node.js package providing secure encryption & password comparison using SHA-256 hashing.
                  <br /><br />
                  <code className="text-[0.68rem] sm:text-xs bg-gray-100/80 px-1.5 py-0.5 rounded block mb-1 font-mono break-all">
                    const {"{ encryption, is_match }"} = require(&rsquo;node-data-cryption&rsquo;);
                  </code>
                  <code className="text-[0.68rem] sm:text-xs bg-gray-100/80 px-1.5 py-0.5 rounded block mb-1 font-mono break-all">
                    const key = encryption(&rsquo;user_input_password&rsquo;, key_length);
                  </code>
                  <code className="text-[0.68rem] sm:text-xs bg-gray-100/80 px-1.5 py-0.5 rounded block font-mono break-all">
                    const result = is_match(&rsquo;user_input_password&rsquo;, key[1], key[0]);
                  </code>
                </p>

                <a
                  href="https://www.npmjs.com/package/node-data-cryption"
                  className={`
                    text-blue-600 hover:underline
                    text-xs sm:text-sm mt-3 sm:mt-2
                    inline-flex items-center gap-1.5
                  `}
                >
                  View on npm →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}