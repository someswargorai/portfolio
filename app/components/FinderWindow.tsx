"use client";
import { useState, useEffect } from "react";
import { finderToggle } from "@/redux/slices/dockSlice";
import { useAppDispatch } from "@/redux/hooks/hook";
import { Pin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    name: "BikeMart",
    description:
      "An eCommerce platform for buying and selling bikes with authentication, product listings, cart management & secure checkout.",
    tech: ["React", "Redux", "Express", "MongoDB"],
    link: "https://ecommerce-frontend-blond-tau.vercel.app",
  },
  {
    name: "Chatter Box",
    description:
      "Full-stack real-time chat app using Socket.io with profile upload, online/offline status & broadcast messaging.",
    tech: ["React", "Socket.io", "Node.js"],
    link: "https://ping-me-frontend.vercel.app",
  },
  {
    name: "Portfolio Website",
    description:
      "Interactive macOS-style portfolio with draggable windows, dock animations, projects & blogs.",
    tech: ["Next.js", "Tailwind", "Redux", "Framer Motion"],
    link: "https://portfolio-rho-pied-bftkib754x.vercel.app",
  },
];

export default function FinderWindow() {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState(projects[0]);
  const [drag, setDrag] = useState(false);
  const [dragFolder, setDragFolder] = useState(false);
  const [top, setTop] = useState(50);
  const [left, setLeft] = useState(20);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hide, setHide] = useState(false);
  const [docs, setDocs] = useState<{ link: string; name: string }[]>([]);
  const [offsetFolder, setOffsetFolder] = useState({ x: 0, y: 0 });
  const [docPos, setDocPos] = useState({ x: 250, y: 60 });

  const closeWindow = () => dispatch(finderToggle());

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDrag(true);
    setOffset({ x: e.clientX - left, y: e.clientY - top });
  };

  const redirectToProject=(link:string)=>{
    window.open(link,"_blank")
  }
  useEffect(() => {
    const mouseUp = () => {
      setDrag(false);
    };
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

  useEffect(() => {
    const mouseFolderUp = () => {
      setDragFolder(false);
    };
    const mouseFolderMove = (e: MouseEvent) => {
      if (!dragFolder) return;
      setDocPos({
        x:e.clientX - offsetFolder.x,
        y:e.clientY - offsetFolder.y
      });
    };
    window.addEventListener("mousemove", mouseFolderMove);
    window.addEventListener("mouseup", mouseFolderUp);
    return () => {
      window.removeEventListener("mousemove", mouseFolderMove);
      window.removeEventListener("mouseup", mouseFolderUp);
    };
  }, [dragFolder, offsetFolder]);

  const onMouseDownFolder = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragFolder(true);
    e.preventDefault();
    setOffsetFolder({
      x: e.clientX - docPos.x,
      y: e.clientY - docPos.y,
    });
  };
  return (
    <div
      className="fixed w-full max-w-3xl rounded-2xl shadow-2xl bg-white/80 backdrop-blur-xl border border-white/40 overflow-hidden"
      style={{ top, left }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b border-white/30 cursor-move"
        onMouseDown={onMouseDown}
      >
        <div
          className="w-3 h-3 bg-red-500 rounded-full cursor-pointer"
          onClick={closeWindow}
        ></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <div className="flex-1"></div>
      </div>

      <div className="flex h-[480px]">
        <aside className="w-60 bg-white/50 border-r border-white/30 px-4 py-6 space-y-6">
          <div>
            <p className="text-xs font-semibold text-gray-400 mb-2">
              Favorites
            </p>
            <p className="py-1.5 font-medium text-blue-600 bg-blue-50 rounded-md px-2 flex items-center gap-2">
              {" "}
              <Pin size={17} />
              Work
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 mb-2">
              My Projects
            </p>
            {projects.map((p, index) => (
              <div
                key={index}
                onClick={() => {
                  setHide(false);
                  setDocs([]);
                }}
                className={`flex items-center gap-2 ${
                  selected.name === p.name
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Image
                  src="/public/images/folder.png"
                  alt=""
                  width={20}
                  height={20}
                />
                <p
                  key={p.name}
                  className={`px-2 py-1.5 truncate cursor-pointer rounded-md `}
                  onClick={() => {
                    setHide(true);
                    if (selected.name === p.name) {
                      const json = [
                        {
                          name: p.name,
                          link: p.link,
                        },
                      ];
                      setDocs(json);
                    }
                  }}
                >
                  {p.name}
                </p>
              </div>
            ))}
          </div>
        </aside>

        <div className="flex-1 p-8 flex gap-10">
          <div className="grid grid-cols-3 gap-8 ">
            {projects.map((p) => (
              <div
                key={p.name}
                onClick={() => setSelected(p)}
                className={`flex flex-col items-center cursor-pointer ${
                  selected.name === p.name
                    ? "opacity-100"
                    : "opacity-70 hover:opacity-100"
                }`}
                onDoubleClick={() => {
                  setHide(true);
                  if (selected.name === p.name) {
                    const json = [
                      {
                        name: p.name,
                        link: p.link,
                      },
                    ];
                    setDocs(json);
                  }
                }}
              >
                {!hide ? (
                  <>
                    <Image
                      src="/public/images/folder.png"
                      alt=""
                      width={50}
                      height={50}
                    />
                    <span className="text-sm mt-2 font-medium text-gray-700 text-center">
                      {p.name}
                    </span>
                  </>
                ) : (
                  <>
                    <div
                      onMouseDown={onMouseDownFolder}
                      style={{
                        position: "absolute",
                        left: `${docPos.x}px`,
                        top: `${docPos.y}px`,
                      }}
                    >
                      {docs?.[0]?.name === p.name && docs?.[0]?.link && (
                        <div
                          // href={docs[0]?.link}
                          // target="_blank"
                          onDoubleClick={()=>redirectToProject(docs[0]?.link)}
                          className="text-sm mt-2 font-medium text-gray-700 text-center flex items-center flex-col hover:text-blue-500"
                        >
                          <Image
                            src="/public/images/txt.png"
                            alt=""
                            width={50}
                            height={50}
                          />
                          <p>{docs?.[0]?.name}</p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
