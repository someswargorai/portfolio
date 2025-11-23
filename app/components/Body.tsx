"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hook";
import { finderToggle } from "@/redux/slices/dockSlice";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Body() {
  const { wallpaper } = useAppSelector((state) => state.wallpaper);
  const dispatch = useAppDispatch();

  // 🔥 Reusable drag states for 3 icons
  const [icons, setIcons] = useState({
    projects: { top: 280, right: 48, dragging: false, offset: { x: 0, y: 0 } },
    getirnow: { top: 40, right: 40, dragging: false, offset: { x: 0, y: 0 } },
    pingme: { top: 160, right: 40, dragging: false, offset: { x: 0, y: 0 } },
  });

  // 🔥 Start dragging
  const onMouseDownIcon = (
    e: React.MouseEvent<HTMLDivElement>,
    key: keyof typeof icons
  ) => {
    e.preventDefault();
    setIcons((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        dragging: true,
        offset: {
          x: window.innerWidth - e.clientX - prev[key].right,
          y: e.clientY - prev[key].top,
        },
      },
    }));
  };

  // 🔥 Drag move & stop listeners
  useEffect(() => {
    const mouseup = () => {
      setIcons((prev) => {
        const updated = { ...prev };
        (Object.keys(updated) as (keyof typeof updated)[]).forEach((k) => {
          updated[k].dragging = false;
        });

        return updated;
      });
    };

    const mousemove = (e: MouseEvent) => {
      setIcons((prev) => {
        const updated = { ...prev };

        (Object.keys(updated) as (keyof typeof icons)[]).forEach((key) => {
          if (!updated[key].dragging) return;

          const newTop = e.clientY - updated[key].offset.y;
          const newRight =
            window.innerWidth - e.clientX - updated[key].offset.x;

          // constraints
          const maxTop = window.innerHeight - 0;
          const maxRight = window.innerWidth - 0;

          updated[key].top = Math.max(0, Math.min(maxTop, newTop));
          updated[key].right = Math.max(0, Math.min(maxRight, newRight));
        });

        return updated;
      });
    };

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    return () => {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    };
  }, []);

  return (
    <div
      className="
        h-[calc(100vh-40px)]
        overflow-y-auto
        flex flex-col items-center justify-center text-center
        px-6 select-none
        bg-gradient-to-b from-white to-[#eceaff]
        relative
      "
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-32 w-72 h-72 bg-purple-200/40 rounded-full blur-[150px]"></div>

      <h5
        className="
          text-gray-600 text-sm md:text-base tracking-wide
          opacity-0 animate-[fadeIn_0.8s_ease_forwards]
        "
      >
        Hey, I&apos;m{" "}
        <span className="font-semibold text-black hover:text-purple-600 transition">
          Someswar
        </span>{" "}
        👋 Welcome to my
      </h5>

      <h1
        className="
          font-extrabold
          text-[34px] md:text-[74px]
          leading-none mt-3
          bg-clip-text text-transparent 
          bg-gradient-to-r from-[#1a1a1a] to-[#6c6c6c]
          opacity-0 animate-[slideUp_0.8s_ease_0.2s_forwards]
        "
      >
        Portfolio
      </h1>

      <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-3 animate-[grow_0.6s_forwards]"></div>

      <p
        className="
          text-gray-600 text-sm md:text-lg max-w-lg mt-5
          opacity-0 animate-[fadeIn_1s_ease_0.4s_forwards]
        "
      >
        A Developer passionate about building clean, modern & user-friendly web
        experiences — delivering creative ideas into production-ready results.
      </p>

      {/* ICON 1 — getirnow PRD */}
      <div
        className="absolute cursor-grab flex items-center flex-col"
        style={{
          top: icons.getirnow.top,
          right: icons.getirnow.right,
        }}
        onMouseDown={(e) => onMouseDownIcon(e, "getirnow")}
      >
        <Image src="/public/images/txt.png" alt="" width={50} height={50} />
        <span className="text-[12px] mt-2 font-medium text-gray-700 text-center">
          getirnow PRD
        </span>
      </div>

      {/* ICON 2 — pingME PRD */}
      <div
        className="absolute cursor-grab flex items-center flex-col"
        style={{
          top: icons.pingme.top,
          right: icons.pingme.right,
        }}
        onMouseDown={(e) => onMouseDownIcon(e, "pingme")}
      >
        <Image src="/public/images/txt.png" alt="" width={50} height={50} />
        <span className="text-[12px] mt-2 font-medium text-gray-700 text-center">
          pingME PRD
        </span>
      </div>

      {/* ICON 3 — projects folder */}
      <div
        className="absolute cursor-grab flex items-center flex-col"
        style={{
          top: icons.projects.top,
          right: icons.projects.right,
        }}
        onMouseDown={(e) => onMouseDownIcon(e, "projects")}
        onDoubleClick={() => dispatch(finderToggle())}
      >
        <Image src="/public/images/folder.png" alt="" width={50} height={50} />
        <span className="text-[12px] mt-2 font-medium text-gray-700 text-center">
          projects
        </span>
      </div>

      <style>{`
        @keyframes fadeIn { to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(18px) } to { opacity: 1; transform: translateY(0px) } }
        @keyframes grow { from { width: 0 } to { width: 96px } }
      `}</style>
    </div>
  );
}
