
import React, { useState, useEffect, useRef } from 'react';
import { 
  BatteryFull, 
  Search, 
  User, 
  Wifi, 
  Apple, 
  LayoutGrid,
  Bell,
  Zap,
  BatteryLow,
  BatteryMedium
} from 'lucide-react';
import { MenuType, WifiNetwork } from '@/types';
import WifiMenu from './WifiMenu';
import BatteryMenu from './BatteryMenu';
import { ContactToggle } from '@/redux/slices/dockSlice';
import { useAppDispatch } from '@/redux/hooks/hook';

interface BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}


function hasBatteryAPI(
  nav: Navigator
): nav is Navigator & {
  getBattery(): Promise<BatteryManager>;
} {
  return "getBattery" in nav;
}


const INITIAL_NETWORKS: WifiNetwork[] = [
  { id: '1', name: "Home_5GHz", strength: 100, isSecure: true, isConnected: true },
  { id: '2', name: "Someswar_Network", strength: 80, isSecure: true, isConnected: false },
  { id: '3', name: "Coffee_Shop_Free", strength: 40, isSecure: false, isConnected: false },
  { id: '4', name: "iPhone_15_Pro", strength: 60, isSecure: true, isConnected: false },
];

export default function MacMenuBar() {
  const [activeMenu, setActiveMenu] = useState<MenuType>(null);
  const [isWifiConnected, setIsWifiConnected] = useState(true);
  const [networks, setNetworks] = useState<WifiNetwork[]>(INITIAL_NETWORKS);
  const [currentTime, setCurrentTime] = useState(new Date());
  const dispatch = useAppDispatch();  

  const [batteryLevel, setBatteryLevel] = useState(1);
  const [isCharging, setIsCharging] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);

  // Time effect
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Battery effect
useEffect(() => {
  let battery: BatteryManager | null = null;

  const updateBatteryInfo = (batt: BatteryManager) => {

    setBatteryLevel(batt.level);
    setIsCharging(batt.charging);
  
  };

  const handleLevelChange = () => {

    if (battery) updateBatteryInfo(battery);
  
  };

  const handleChargingChange = () => {

    if (battery) updateBatteryInfo(battery);
  
  };

 if (hasBatteryAPI(navigator)) {
  navigator.getBattery().then((batt) => {
    battery = batt;
    updateBatteryInfo(batt);

    batt.addEventListener("levelchange", handleLevelChange);
    batt.addEventListener("chargingchange", handleChargingChange);
  });
}

  return () => {
    if (battery) {
      battery.removeEventListener("levelchange", handleLevelChange);
      battery.removeEventListener("chargingchange", handleChargingChange);
    }
  };
}, []);


  // Click outside effect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (type: MenuType) => {
    setActiveMenu(prev => prev === type ? null : type);
  };

  const handleConnect = (id: string) => {
    setNetworks(prev => prev.map(net => ({
      ...net,
      isConnected: net.id === id
    })));
  };

  const formattedTime = currentTime.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const getBatteryIcon = () => {
    if (isCharging) return <Zap size={14} className="text-green-500 fill-current" />;
    if (batteryLevel < 0.2) return <BatteryLow size={18} className="text-red-500" />;
    if (batteryLevel < 0.6) return <BatteryMedium size={18} className="text-yellow-600" />;
    return <BatteryFull size={18} className="text-gray-800" />;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[1000] bg-gray-50" ref={menuRef}>
      <nav
        className="
          h-8
          flex items-center justify-between
          px-2
          bg-white/20
          backdrop-blur-2xl
          border-b border-black/10
          select-none
          text-[13px]
          font-medium
          text-gray-900
          mac-shadow
        "
      >
        {/* Left Side */}
        <div className="flex items-center gap-0.5">
          <button 
            onClick={() => toggleMenu('apple')}
            className={`px-3 py-1 rounded-md transition-colors ${activeMenu === 'apple' ? 'bg-black/10' : 'hover:bg-white/20'}`}
          >
            <Apple size={16} className="text-black" />
          </button>

          <span className="py-1 font-bold text-black rounded-md cursor-default">
            Portfolio
          </span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5 pr-2">
            
            {/* Dynamic Wifi Icon */}
            {isWifiConnected && (
              <div className="relative">
                <button 
                  onClick={() => toggleMenu('wifi')}
                  className={`p-1.5 rounded-md cursor-pointer transition-colors ${activeMenu === 'wifi' ? 'bg-black/10' : 'hover:bg-white/20'}`}
                >
                  <Wifi size={16} />
                </button>
                {activeMenu === 'wifi' && (
                  <WifiMenu
                    isConnected={isWifiConnected} 
                    onToggle={setIsWifiConnected} 
                    networks={networks}
                    onConnect={handleConnect}
                  />
                )}
              </div>
            )}

            <div className="relative">
              <button 
                onClick={() => toggleMenu('battery')}
                className={`flex items-center gap-1.5 p-1.5 rounded-md transition-colors cursor-pointer ${activeMenu === 'battery' ? 'bg-black/10' : 'hover:bg-white/20'}`}
              >
                <span className="text-[11px] font-bold">{Math.round(batteryLevel * 100)}%</span>
                <div className="flex items-center">
                  {getBatteryIcon()}
                </div>
              </button>
              {activeMenu === 'battery' && (
                <BatteryMenu level={batteryLevel} isCharging={isCharging} />
              )}
            </div>

            <button className="p-1.5 rounded-md hover:bg-white/20 transition-colors">
              <Search size={16} />
            </button>

            <button className="p-1.5 rounded-md hover:bg-white/20 transition-colors relative">
              <Bell size={16} />
              <div className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
            </button>
          </div>

          <div className="h-4 w-px bg-black/10 mx-1" />

          <button className="px-2 py-1 flex items-center gap-2 hover:bg-white/20 rounded-md transition-colors">
             <span className="font-semibold text-gray-800 tracking-tight">{formattedTime}</span>
          </button>
          
          <button className="p-1.5 rounded-md hover:bg-white/20 transition-colors ml-1 cursor-pointer">
            <User size={16} className="text-gray-700" onClick={()=>{
              dispatch(ContactToggle())
            }}/>
          </button>
        </div>
      </nav>
      
      {/* Search Bar Overlay Simulation */}
      {activeMenu === 'search' && (
        <div className="fixed inset-0 bg-black/20 flex justify-center pt-40 z-[-1]">
          <div className="w-[600px] h-12 bg-white/80 backdrop-blur-3xl rounded-xl border border-white/40 shadow-2xl flex items-center px-4 gap-3 animate-in fade-in slide-in-from-top-10">
            <Search className="text-gray-400" size={24} />
            <input 
              autoFocus 
              className="bg-transparent border-none outline-none flex-1 text-xl font-light text-gray-700" 
              placeholder="Spotlight Search"
            />
          </div>
        </div>
      )}
    </div>
  );
}
