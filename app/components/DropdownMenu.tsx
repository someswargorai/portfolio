
import React from 'react';

interface DropdownMenuProps {
  children: React.ReactNode;
  className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, className = "" }) => {
  return (
    <div 
      className={`absolute top-10 right-0 mt-1 min-w-[280px] bg-white/70 backdrop-blur-3xl border border-white/20 rounded-xl mac-dropdown-shadow p-1.5 z-[100] animate-in fade-in zoom-in-95 duration-100 origin-top-right ${className}`}
    >
      {children}
    </div>
  );
};

export default DropdownMenu;
