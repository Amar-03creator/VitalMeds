import React from 'react';
import { Menu, X } from 'lucide-react';

const NavbarLogo = ({ mobileSidebarOpen, setMobileSidebarOpen }) => {
  return (
    <>
      {/* MOBILE: Hamburger + Logo */}
      <div className="lg:hidden flex items-center gap-2 min-w-0">
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 hover:bg-secondary/50 rounded-lg transition-colors flex-shrink-0"
        >
          {mobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">💊</span>
        </div>
        <h1 className="font-bold text-sm text-foreground truncate">VitalMEDS</h1>
      </div>

      {/* DESKTOP: Logo + Branding */}
      <div className="hidden lg:flex items-center gap-2 shrink-0">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">💊</span>
        </div>
        <h1 className="font-bold text-lg text-foreground">VitalMEDS Admin</h1>
      </div>
    </>
  );
};

export default NavbarLogo;
