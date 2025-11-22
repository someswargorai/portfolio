export default function Body() {
  return (
    <div className="
      h-[calc(100vh-40px)]
      overflow-y-auto
      flex flex-col items-center justify-center
      text-center px-4

      bg-gradient-to-b from-white to-[#f3f3ff]
      animate-fadeIn
    ">
      {/* Small Intro Text */}
      <h5 className="text-gray-600 text-sm md:text-base tracking-wide">
        Hey, I&apos;m <span className="font-semibold text-black">Someswar</span> !
        Welcome to my
      </h5>

      {/* Main Heading */}
      <h1 className="
        font-bold 
        text-[32px] md:text-[72px] 
        leading-tight 
        bg-clip-text text-transparent 
        bg-gradient-to-r from-black to-gray-600
        mt-2
      ">
        Portfolio
      </h1>

      {/* Subtitle */}
      <p className="text-gray-500 text-sm md:text-md max-w-xl mt-3">
        A Developer passionate about building clean, modern, and user-friendly web experiences.
      </p>
    </div>
  );
}
