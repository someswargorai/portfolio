"use client";
import { useAppDispatch } from "@/redux/hooks/hook";
import { ContactToggle, resumeToggle } from "@/redux/slices/dockSlice";
import { BatteryFull, Search, User, Wifi } from "lucide-react";
import Image from "next/image";

export default function MacMenuBar() {
  const dispatch = useAppDispatch();

  return (
    <div className="sticky top-0 left-0 right-0 z-50">
      <nav
        className="
          h-10
          flex items-center justify-between
          px-4
          bg-[#eceaff]/20
          backdrop-blur-3xl
          border-b border-black/10
          select-none
          text-sm
        "
      >
        <div className="flex items-center gap-4">
          <span className="text-xl font-semibold text-black">
            <Image
              src="/public/images/logo.svg"
              alt=""
              width={14}
              height={17}
            />
          </span>

          <span className="font-medium text-black hidden sm:block">
            Someswar&apos;s Portfolio
          </span>

          <div className="hidden md:flex items-center gap-6">
          
            <span className="text-gray-800 hover:text-black cursor-pointer" onClick={()=>dispatch(resumeToggle())}>
              Resume
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-black">
          <Wifi size={16} className="hidden sm:block" />
          <Search size={16} className="hidden sm:block" />
          <BatteryFull size={16} className="hidden sm:block" />

          <span className="ml-1 text-xs sm:text-sm">
            {new Date().toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </span>

          <User size={16} className="hidden sm:block cursor-pointer" onClick={()=>dispatch(ContactToggle())}/>
        </div>
      </nav>
    </div>
  );
}
