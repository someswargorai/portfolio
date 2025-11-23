"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hook";
import { resumeToggle } from "@/redux/slices/dockSlice";
import { clickedZIndex } from "@/redux/slices/zIndexSlice";

export default function ResumeWindow() {
  const dispatch = useAppDispatch();
  const { zIndexclicked } = useAppSelector((state) => state.zIndex);
  const [top, setTop] = useState(50);
  const [left, setLeft] = useState(40);
  const [drag, setDrag] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

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

  const clicked = () => {
    dispatch(clickedZIndex("resume"));
  };

  return (
    <div
      className="fixed bg-white rounded-xl shadow-2xl w-[300px] h-[400px] md:w-[900px] md:h-[600px]  z-100"
      style={{
        top: `${top}px`,
        left: `${left}px`,
        zIndex: zIndexclicked === "resume" ? 10 : 1,
      }}
      onClick={clicked}
    >
      <div
        className="flex items-center gap-2 bg-gray-100 px-4 py-3 cursor-move "
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

      <div className="p-4 overflow-y-auto h-[calc(100%-120px)]">
        <embed
          src="/public/files/resume.pdf"
          type="application/pdf"
          className="w-full h-full rounded-lg"
        />
      </div>
    </div>
  );
}
