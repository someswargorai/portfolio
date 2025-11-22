import { useAppDispatch } from "@/redux/hooks/hook";
import { ContactToggle } from "@/redux/slices/dockSlice";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Contacts() {
  const dispatch = useAppDispatch();
  const [top, setTop] = useState(10);
  const [left, setLeft] = useState(10);
  const [drag, setDrag] = useState(false);
  const [offset, setOffSet] = useState({ x: 0, y: 0 });

  const close = () => {
    dispatch(ContactToggle());
  };

  useEffect(() => {
    const mouseUp = () => {
      setDrag(false);
    };

    const mouseMove = (e: globalThis.MouseEvent) => {
      if (!drag) return;

      setLeft(e.clientX - offset.x);
      setTop(e.clientY - offset.y);
    };
    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mouseup", mouseUp);
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [drag, offset]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDrag(true);
    setOffSet({
      x: e.clientX - left,
      y: e.clientY - top,
    });
  };
  return (
    <div
      className={`fixed w-full flex justify-center py-12 px-4 bg-linear-to-br h-[600px]`}
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      <section className="fixed  max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-0 overflow-hidden">
        <div
          className="flex items-center gap-2 bg-gray-100 px-4 py-3"
          onMouseDown={onMouseDown}
        >
          <div
            className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
            onClick={close}
          ></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <p className="text-sm text-gray-500 mx-auto">Contact Me</p>
        </div>

        <div className="p-6 md:p-10">
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/public/images/profile.jpg"
              alt="profile"
              className="w-20 h-20 rounded-full object-cover"
              width={200}
              height={200}
            />

            <h1 className="text-2xl font-semibold">Let&apos;s Connect</h1>

            <p className="text-center text-gray-600 max-w-md">
              Got an idea? A bug to fix? Or just wanna talk tech? I&apos;m in.
            </p>

            <p className="text-blue-600 font-medium">somgorai726@gmail.com</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <a
              href="https://github.com/someswargorai"
              target="_blank"
              className="flex flex-col justify-center items-center bg-red-400 text-white p-4 rounded-xl gap-2 hover:opacity-90 transition"
            >
              <span className="text-lg">🐙</span>
              <p className="font-semibold">Github</p>
            </a>

            <a
              href="#"
              target="_blank"
              className="flex flex-col justify-center items-center bg-green-400 text-white p-4 rounded-xl gap-2 hover:opacity-90 transition"
            >
              <span className="text-lg">🧩</span>
              <p className="font-semibold">Platform</p>
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              className="flex flex-col justify-center items-center bg-orange-300 text-white p-4 rounded-xl gap-2 hover:opacity-90 transition"
            >
              <span className="text-lg">✖</span>
              <p className="font-semibold">Twitter / X</p>
            </a>

            <a
              href="https://www.linkedin.com/in/som-gorai-3a12582b3/"
              target="_blank"
              className="flex flex-col justify-center items-center bg-blue-500 text-white p-4 rounded-xl gap-2 hover:opacity-90 transition"
            >
              <span className="text-lg">in</span>
              <p className="font-semibold">LinkedIn</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
