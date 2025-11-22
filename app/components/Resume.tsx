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
      style={{ top: `${top}px`, left: `${left}px`, width: "900px", height: "600px" }}
    >
      <div
        className="flex items-center gap-2 bg-gray-100 px-4 py-3 cursor-move border-b"
        onMouseDown={onMouseDown}
      >
        <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={closeWindow}></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>

        <p className="mx-auto text-gray-700 text-sm font-medium">Resume.pdf</p>
      </div>

      <div className="flex gap-6 px-6 pt-4 border-b text-sm font-medium">
        <button
          className={`${activeTab === "resume" ? "text-blue-600" : "text-gray-500"} hover:text-black`}
          onClick={() => setActiveTab("resume")}
        >
          Resume
        </button>
        <button
          className={`${activeTab === "projects" ? "text-blue-600" : "text-gray-500"} hover:text-black`}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
        <button
          className={`${activeTab === "skills" ? "text-blue-600" : "text-gray-500"} hover:text-black`}
          onClick={() => setActiveTab("skills")}
        >
          Skills
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
          <ul className="space-y-3 text-gray-700">
            <li>• GetIRNow — Investment Platform</li>
            <li>• BikeMart — eCommerce Website</li>
            <li>• Chatter Box — Real-time Chat App</li>
            <li>• Node-Data-Cryption — NPM Package</li>
          </ul>
        )}

        {activeTab === "skills" && (
          <ul className="space-y-2 text-gray-700">
            <li>Frontend: React, Next.js, TypeScript, Tailwind</li>
            <li>Backend: Express.js, Node.js</li>
            <li>Database: MongoDB, MySQL</li>
            <li>Tools: Docker, Git, Postman, JIRA</li>
          </ul>
        )}
      </div>
    </div>
  );
}
