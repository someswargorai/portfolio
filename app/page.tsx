"use client";


import { useAppSelector } from "@/redux/hooks/hook";
import Body from "./components/Body";
import Dock from "./components/Dock";
import Navbar from "./components/Navbar";
import SafariWindow from "./components/SafariWindow";
import TerminalWindow from "./components/TerminalWindow";
import Contacts from "./components/Contacts";
import ResumeWindow from "./components/Resume";
import SettingsWindow from "./components/SettingsWindow";

export default function Home() {

  const {safari, terminal,contact, resume, settings}= useAppSelector(state=>state.dock);

  return (
    <div className="h-screen overflow-none">
      <Navbar />
      <Body />
      <Dock/>
      {safari && <SafariWindow/>}
      {terminal && <TerminalWindow/>}
      {contact && <Contacts/>}
      {resume && <ResumeWindow/>}
      {settings && <SettingsWindow/>}
    </div>
  );
}
