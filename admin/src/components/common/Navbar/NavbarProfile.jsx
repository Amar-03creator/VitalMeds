import React from 'react';
import { Settings, User, LogOut } from 'lucide-react';

const NavbarProfile = ({ onLogout }) => {
  const adminName = localStorage.getItem('adminName') || 'Admin';
  const adminEmail = localStorage.getItem('adminEmail') || 'admin@vitalmeds.com';

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminEmail');
    if (onLogout) onLogout();
  };

  return (
    <div className="absolute right-0 mt-2 w-56 bg-card rounded-lg shadow-lg border border-border z-50 overflow-hidden">
      <div className="p-3 bg-secondary/50 border-b border-border">
        <p className="font-semibold text-foreground text-sm">{adminName}</p>
        <p className="text-xs text-muted-foreground truncate">{adminEmail}</p>
      </div>
      <button className="w-full px-4 py-2 text-left text-sm hover:bg-secondary/50 flex items-center gap-2 text-foreground">
        <Settings size={16} />
        Settings
      </button>
      <button className="w-full px-4 py-2 text-left text-sm hover:bg-secondary/50 flex items-center gap-2 text-foreground border-t border-border">
        <User size={16} />
        Account
      </button>
      <button
        onClick={handleLogout}
        className="w-full px-4 py-2 text-left text-sm hover:bg-red-500/10 text-red-600 dark:text-red-400 flex items-center gap-2 border-t border-border"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
};

export default NavbarProfile;
