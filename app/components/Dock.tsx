"use client";

import { useAppDispatch } from "@/redux/hooks/hook";
import { ContactToggle, safariToggle, TerminalToggle } from "@/redux/slices/dockSlice";
import Image from "next/image";
import { useState } from "react";

const apps = [
  { src: "/public/images/finder.png", name: "Finder" },
  { src: "/public/images/safari.png", name: "Safari" },
  { src: "/public/images/photos.png", name: "Photos" },
  { src: "/public/images/contact.png", name: "Contacts" },
  { src: "/public/images/terminal.png", name: "Terminal" },
  { src: "/public/images/trash.png", name: "Trash" },
];

export default function Dock() {
  const [hovered, setHovered] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const clickApp = (app: { src: string; name: string }) => {
    if (app.name === "Safari") {
      dispatch(safariToggle());
    }else if (app.name === "Terminal") {
      dispatch(TerminalToggle());
    }else if (app.name === "Contacts") {
      dispatch(ContactToggle());
    }
  };
  return (
    <div
      className="
      fixed bottom-2 left-1/2 -translate-x-1/2 z-50
      px-4
      bg-white/20 backdrop-blur-md
      border border-white/30
      rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.25)]
      flex gap-4 items-end
    "
    >
      {apps.map((app, i) => {
        const isHovered = hovered === i;

        return (
          <div
            key={i}
            className="flex flex-col items-center cursor-pointer"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => clickApp(app)}
          >
            <Image
              src={app.src}
              alt={app.name}
              width={60}
              height={60}
              className={`
                transition-all duration-300 ease-out
                ${
                  isHovered
                    ? "scale-125 -translate-y-3"
                    : "scale-100 translate-y-0"
                }
              `}
            />

            <span
              className={`
                text-xs mt-1 text-black
                transition-opacity duration-200
                ${isHovered ? "opacity-100" : "opacity-0"}
              `}
            >
              {app.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
