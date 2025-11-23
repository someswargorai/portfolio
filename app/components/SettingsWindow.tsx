"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks/hook";
import { settingsToggle } from "@/redux/slices/dockSlice";
import Image from "next/image";
import { setWallpaper } from "@/redux/slices/wallpaperSlice";

export default function SettingsWindow() {
  const dispatch = useAppDispatch();
  const [top, setTop] = useState(70);
  const [left, setLeft] = useState(70);
  const [drag, setDrag] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const wallpapers = [
    "/public/wallpapers/bg1.jpg",
    "/public/wallpapers/bg2.jpg",
    "/public/wallpapers/bg3.jpg",
    "/public/wallpapers/bg4.jpg",
    "/public/wallpapers/bg5.jpg",
    "/public/wallpapers/bg6.jpg"
  ];

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

  const close = () => dispatch(settingsToggle());

  return (
    <div
      className="fixed bg-white/50 backdrop-blur-xl border border-white/30 shadow-2xl rounded-xl w-[420px]"
      style={{ top: `${top}px`, left: `${left}px` }}
    >

      <div
        className="flex items-center gap-2 px-4 py-2 border-b border-white/30 cursor-move bg-gray-100"
        onMouseDown={onMouseDown}
      >
        <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={close} />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <div className="flex-1" />
        <span className="text-sm font-medium text-gray-700">Settings</span>
      </div>

      <div className="p-5 space-y-6">
        <h2 className="text-gray-700 font-semibold text-lg">Wallpaper</h2>
        <p className="text-sm text-gray-500 -mt-2">Choose the background of your system</p>

        <div className="grid grid-cols-2 gap-4">
          {wallpapers.map((src, i) => (
            <button
              key={i}
              onClick={() => dispatch(setWallpaper(src))}
              className="relative h-28 rounded-lg overflow-hidden group border border-gray-200 hover:border-blue-400 transition"
            >
              <Image src={src} className="object-cover w-full h-full" alt="" fill />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
