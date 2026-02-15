
import React from 'react';
import { Battery, Zap, BatteryLow, BatteryMedium, BatteryFull as BatteryFullIcon } from 'lucide-react';
import DropdownMenu from './DropdownMenu';


interface BatteryMenuProps {
  level: number;
  isCharging: boolean;
}

const BatteryMenu: React.FC<BatteryMenuProps> = ({ level, isCharging }) => {
  const percentage = Math.round(level * 100);
  
  const getBatteryIcon = () => {
    if (level < 0.2) return <BatteryLow size={16} className="rotate-90 text-red-500" />;
    if (level < 0.6) return <BatteryMedium size={16} className="rotate-90 text-yellow-500" />;
    return <BatteryFullIcon size={16} className="rotate-90 text-green-500" />;
  };

  return (
    <DropdownMenu className="w-64 bg-gray-100!">
      <div className="px-4 py-3 flex items-center justify-between border-b border-black/5 mb-1 ">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 uppercase">Battery</span>
          <span className="text-lg font-semibold text-gray-900">{percentage}%</span>
        </div>
        <div className={`${isCharging ? 'text-green-500' : 'text-gray-500'} flex items-center gap-1`}>
          {isCharging ? <Zap size={16} fill="currentColor" /> : <Battery size={16} className="rotate-90" />}
          <span className="text-[9px] font-bold uppercase">
            {isCharging ? 'Power Source: Power Adapter' : 'Power Source: Battery'}
          </span>
        </div>
      </div>
      
      <div className="p-1">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm text-left transition-colors group">
          {getBatteryIcon()}
          <span className="font-medium">Battery Settings...</span>
        </button>
      </div>
      
      <div className="px-4 py-2 text-[11px] text-gray-400 leading-tight">
        {isCharging ? 'Your Mac is currently connected to a power source and charging.' : 'Apps using significant energy: Chrome, Visual Studio Code'}
      </div>
    </DropdownMenu>
  );
};

export default BatteryMenu;
