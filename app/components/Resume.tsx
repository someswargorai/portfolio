"use client";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks/hook";
import { resumeToggle } from "@/redux/slices/dockSlice";

export default function ResumeWindow() {
  const dispatch = useAppDispatch();

  const [top, setTop] = useState(40);
  const [left, setLeft] = useState(40);
  const [drag, setDrag] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [activeTab, setActiveTab] = useState("resume");

  const closeWindow = () => {
    dispatch(resumeToggle());
  };

  useEffect(() => {
    const mouseUp = () => setDrag(false);
    const mouseMove = (e: MouseEvent) => {
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
  }, [drag, offset]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDrag(true);
    setOffset({ x: e.clientX - left, y: e.clientY - top });
  };

  return (
    <div
      className="fixed bg-white rounded-xl shadow-2xl border z-100"
      style={{
        top: `${top}px`,
        left: `${left}px`,
        width: "900px",
        height: "600px",
      }}
    >
      <div
        className="flex items-center gap-2 bg-gray-100 px-4 py-3 cursor-move border-b"
        onMouseDown={onMouseDown}
      >
        <div
          className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
          onClick={closeWindow}
        ></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>

        <p className="mx-auto text-gray-700 text-sm font-medium">Resume.pdf</p>
      </div>

      <div className="flex gap-6 px-6 pt-4 border-b text-sm font-medium">
        <button
          className={`${
            activeTab === "resume" ? "text-blue-600" : "text-gray-500"
          } hover:text-black cursor-pointer`}
          onClick={() => setActiveTab("resume")}
        >
          Resume
        </button>
        <button
          className={`${
            activeTab === "projects" ? "text-blue-600" : "text-gray-500"
          } hover:text-black cursor-pointer`}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
     
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100%-120px)]">
        {activeTab === "resume" && (
          <embed
            src="/public/files/resume.pdf"
            type="application/pdf"
            className="w-full h-full rounded-lg"
          />
        )}

        {activeTab === "projects" && (
          <div className="space-y-6">
            {/* BikeMart */}
            <div className="p-5 rounded-xl border bg-gray-100 hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-1 text-gray-900">
                BikeMart
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                An eCommerce website for buying and selling bikes, built with
                React, Express, and MongoDB. Features include user
                authentication, product listings, cart management, and secure
                checkout.
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {["React", "Redux", "Express", "MongoDB"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href="https://ecommerce-frontend-blond-tau.vercel.app"
                target="_blank"
                className="inline-block mt-4 text-sm text-blue-600 font-medium hover:underline"
              >
                🔗 Visit Project
              </a>
            </div>

            {/* Chatter Box */}
            <div className="p-5 rounded-xl border bg-gray-50 hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-1 text-gray-900">
                Chatter Box
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                A full-stack real-time chat application using Socket.io, React,
                and Node.js — featuring user authentication, online/offline
                status, profile image upload, and broadcast messaging with a
                modern MUI interface.
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {["React", "Socket.io", "Node.js"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href="https://ping-me-frontend.vercel.app"
                target="_blank"
                className="inline-block mt-4 text-sm text-blue-600 font-medium hover:underline"
              >
                🔗 Visit Project
              </a>
            </div>

            {/* Portfolio */}
            <div className="p-5 rounded-xl border bg-gray-50 hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-1 text-gray-900">
                Portfolio Website
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Personal portfolio website built to showcase skills, projects,
                blogs and an interactive macOS-style UI that includes draggable
                windows and dock animations.
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {["Next.js", "Tailwind", "Redux", "Framer Motion"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>

              <a
                href="https://portfolio-rho-pied-bftkib754x.vercel.app"
                target="_blank"
                className="inline-block mt-4 text-sm text-blue-600 font-medium hover:underline"
              >
                🔗 Visit Portfolio
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
