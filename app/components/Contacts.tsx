import { useAppDispatch, useAppSelector } from "@/redux/hooks/hook";
import { ContactToggle } from "@/redux/slices/dockSlice";
import { clickedZIndex } from "@/redux/slices/zIndexSlice";
import { Check, Copy, ExternalLink, Github, Linkedin, Mail, Twitter } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
  iconBg: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  { 
    name: 'GitHub', 
    url: 'https://github.com/someswargorai', 
    icon: 'github', 
    color: 'hover:text-black', 
    iconBg: 'bg-zinc-100 group-hover:bg-zinc-200' 
  },
  { 
    name: 'LinkedIn', 
    url: 'https://www.linkedin.com/in/som-gorai-3a12582b3/', 
    icon: 'linkedin', 
    color: 'hover:text-blue-600', 
    iconBg: 'bg-blue-50 group-hover:bg-blue-100' 
  },
  { 
    name: 'Twitter', 
    url: 'https://twitter.com', 
    icon: 'twitter', 
    color: 'hover:text-sky-500', 
    iconBg: 'bg-sky-50 group-hover:bg-sky-100' 
  },
  { 
    name: 'Platform', 
    url: '#', 
    icon: 'external', 
    color: 'hover:text-emerald-600', 
    iconBg: 'bg-emerald-50 group-hover:bg-emerald-100' 
  },
];

export default function Contacts() {
  const dispatch = useAppDispatch();
  const [top, setTop] = useState(40);
  const [left, setLeft] = useState(40);
  const [drag, setDrag] = useState(false);
  const [offset, setOffSet] = useState({ x: 0, y: 0 });
  const { zIndexclicked } = useAppSelector((state) => state.zIndex);
  const [copied, setCopied] = useState(false);

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

  const clicked = () => {
    dispatch(clickedZIndex("contacts"));
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('somgorai726@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIcon = (type: string) => {
    const size = 20;
    switch (type) {
      case 'github': return <Github size={size} />;
      case 'linkedin': return <Linkedin size={size} />;
      case 'twitter': return <Twitter size={size} />;
      case 'external': return <ExternalLink size={size} />;
      default: return null;
    }
  };

  return (
    <div
      className="fixed"
      style={{ 
        top: `${top}px`, 
        left: `${left}px`,
        zIndex: zIndexclicked === "contacts" ? 100 : 1 
      }}
      onClick={clicked}
    >
      <section className="w-[340px] md:w-[520px] bg-white/50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/30">
        {/* Header */}
        <div 
          onMouseDown={onMouseDown}
          className="flex items-center justify-between px-5 h-12 bg-white/40 border-b border-white/20 cursor-grab active:cursor-grabbing backdrop-blur-md"
        >
          <div className="flex items-center gap-2.5">
            <div 
              onClick={close} 
              className="w-3 h-3 rounded-full bg-[#FF5F57] border border-black/10 hover:shadow-inner hover:brightness-90 transition-all cursor-pointer"
            />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-black/10" />
            <div className="w-3 h-3 rounded-full bg-[#28C840] border border-black/10" />
          </div>
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
            Connect
          </div>
          <div className="w-12" />
        </div>

        {/* Content */}
        <div className="max-h-[500px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-zinc-400">
          <div className="p-8 md:p-12 flex flex-col items-center">
            
            {/* Profile Section */}
            <div className="relative group">
              <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-pink-500 shadow-xl">
                <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-zinc-100">
                  <Image 
                    src="/public/images/profile.jpg" 
                    alt="Profile"
                    width={250}
                    height={250} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                  />
                </div>
              </div>
              <div className="absolute top-20 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full shadow-lg" />
            </div>

            {/* Title */}
            <div className="mt-8 text-center">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-800 to-zinc-500 tracking-tight">
                Let&apos;s Connect
              </h1>
              <p className="mt-3 text-zinc-600 font-medium max-w-sm leading-relaxed">
                Have a bold vision? A complex bug? Or just want to geek out over the latest tech? I&apos;m all ears.
              </p>
            </div>

            {/* Email Card */}
            <div className="mt-10 w-full">
              <div className="relative flex items-center justify-between p-4 bg-white/40 border border-white/50 rounded-2xl shadow-sm hover:shadow-md hover:bg-white/60 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Email Address</p>
                    <p className="text-sm font-semibold text-zinc-800">somgorai726@gmail.com</p>
                  </div>
                </div>
                <button 
                  onClick={copyEmail}
                  className="p-2.5 rounded-xl hover:bg-white transition-colors text-zinc-400 hover:text-indigo-600"
                  title="Copy to clipboard"
                >
                  {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            {/* Social Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 w-full">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-center justify-center p-5 bg-white/30 border border-white/40 rounded-2xl hover:bg-white/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${link.color}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 ${link.iconBg}`}>
                    {getIcon(link.icon)}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wide text-zinc-500 group-hover:text-inherit">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>

            {/* Footer */}
            <p className="mt-12 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] text-center">
              Available for remote opportunities
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}