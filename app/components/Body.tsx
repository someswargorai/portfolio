export default function Body() {
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

      <style>{`
        @keyframes fadeIn {
          to { opacity: 1 }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(18px) }
          to { opacity: 1; transform: translateY(0px) }
        }
        @keyframes grow {
          from { width: 0 }
          to { width: 96px }
        }
      `}</style>
    </div>
  );
}
