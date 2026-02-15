
import React from 'react';
import { Wifi, Lock, Check, ToggleRight, ToggleLeft } from 'lucide-react';
import DropdownMenu from './DropdownMenu';
import { WifiNetwork } from '@/types';

interface WifiMenuProps {
  isConnected: boolean;
  onToggle: (status: boolean) => void;
  networks: WifiNetwork[];
  onConnect: (id: string) => void;
}

const WifiMenu: React.FC<WifiMenuProps> = ({ isConnected, onToggle, networks, onConnect }) => {
  return (
    <DropdownMenu className="w-80 bg-gray-100!">
      <div className="px-3 py-2 flex items-center justify-between border-b border-black/5 mb-1">
        <span className="font-semibold text-gray-900">Wi-Fi</span>
        <button onClick={() => onToggle(!isConnected)}>
          {isConnected ? (
            <ToggleRight className="text-blue-500" size={32} />
          ) : (
            <ToggleLeft className="text-gray-400" size={32} />
          )}
        </button>
      </div>

      <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
        {isConnected ? (
          <>
            <div className="px-3 py-1.5 text-[10px] font-bold text-gray-500 uppercase">Preferred Networks</div>
            {networks.map((net) => (
              <button
                key={net.id}
                onClick={() => onConnect(net.id)}
                className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-blue-500 hover:text-white group transition-colors text-sm text-left"
              >
                <div className="w-5 flex justify-center">
                  {net.isConnected ? <Check size={14} /> : <Wifi size={14} className="opacity-60" />}
                </div>
                <span className="flex-1 font-medium">{net.name}</span>
                {net.isSecure && <Lock size={12} className="opacity-40 group-hover:opacity-100" />}
              </button>
            ))}
            <div className="h-px bg-black/5 my-1" />
            <button className="w-full px-3 py-1.5 rounded-lg hover:bg-blue-500 hover:text-white text-sm text-left transition-colors">
              Wi-Fi Settings...
            </button>
          </>
        ) : (
          <div className="px-6 py-8 text-center text-gray-400 text-sm italic">
            Wi-Fi is turned off.
          </div>
        )}
      </div>
    </DropdownMenu>
  );
};

export default WifiMenu;
