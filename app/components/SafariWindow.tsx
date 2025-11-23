"use client";
import { useAppDispatch } from "@/redux/hooks/hook";
import { safariToggle } from "@/redux/slices/dockSlice";
import { Linkedin, Package } from "lucide-react";
import { useEffect, useState } from "react";

export default function SafariWindow() {
  const [drag, setDrag] = useState(false);
  const [top, setTop] = useState(10);
  const [left, setLeft] = useState(10);
  const [offset, setOffSet] = useState({ x: 0, y: 0 });
  const dispatch=useAppDispatch();

  useEffect(() => {
    const mouseUp = () => {
      setDrag(false);
    };

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
    setOffSet({
      x: e.clientX - left,
      y: e.clientY - top,
    });
  };

  const closeWindow=(e:React.MouseEvent<HTMLDivElement>)=>{
    e.preventDefault();
    dispatch(safariToggle());
  }
  return (
    <div
      className={`fixed w-full flex justify-center py-12 px-4 bg-linear-to-br h-[600px]`}
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      <div
        className="
        w-full max-w-3xl bg-white/80 backdrop-blur-xl
        border border-white/30 shadow-2xl
        rounded-2xl 
      "
      >
        <div
          className="flex items-center justify-between gap-2 px-4 py-3 border-b border-white/30 bg-gray-100 backdrop-blur-xl cursor-move"
          onMouseDown={onMouseDown}
        >
          <div className="flex flex-row gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={closeWindow}></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          <span className="text-sm font-medium text-gray-700">Safari</span>
        </div>

        <div className="px-8 py-10 overflow-y-auto h-[calc(100vh-300px)]">
          <h2 className="text-pink-600 font-semibold text-xl mb-10">
            My Developer Blog
          </h2>

          <div className="flex flex-col gap-12">
           
            <div className="flex gap-4 items-start">
              <div className="rounded-lg bg-gray-100 p-3 flex items-center justify-center">
                <Linkedin size={40} className="text-[#0077B5]" />{" "}
           
              </div>

              <div>
                <p className="text-gray-500 text-sm mb-1">March 2025</p>
                <h3 className="font-semibold text-lg text-gray-900 leading-snug">
                  Journey of Building My Own Chat Application — PingMe
                </h3>

                <a
                  href="https://www.linkedin.com/posts/som-gorai-3a12582b3_mern-socketio-aws-activity-7298774778117529602-EWUB?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEtSVSkB-hFrIn0Ik_aye-ZMZGU_Ge5Fsz4"
                  target="_blank"
                  className="text-blue-600 text-sm mt-1 inline-flex items-center gap-1"
                >
                  Read full post on LinkedIn →
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="rounded-lg bg-gray-100 p-3 flex items-center justify-center">
                <Package size={40} className="text-red-600" /> 
              </div>

              <div>
                <p className="text-gray-500 text-sm mb-1">
                  Published — 2 years ago
                </p>
                <h3 className="font-semibold text-lg text-gray-900 leading-snug">
                  node-data-cryption: Secure SHA-256 based password hashing for
                  Node.js
                </h3>

                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  <strong>node-data-cryption · 1.0.2 · Public</strong>
                  <br />
                  A simple Node.js package providing secure encryption &
                  password comparison using SHA-256 hashing.
                  <br /> <br />
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded block mb-1">
                    const {`{ encryption, is_match }`} ={" "}
                    {`require('node-data-cryption')`};
                  </code>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded block mb-1">
                    const key ={" "}
                    {`encryption('user_input_password', key_length)`};
                  </code>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded block">
                    const result = is_match(`user_input_password`, key[1],
                    key[0]);
                  </code>
                </p>

                <a
                  href="https://www.npmjs.com/package/node-data-cryption"
                  className="text-blue-600 text-sm mt-2 inline-flex items-center gap-1"
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
