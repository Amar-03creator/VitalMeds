import React, { useState } from 'react';
import { FileText, Plus, Sun, Moon, Bell, User, Settings, LogOut, Check, XCircle, ChevronDown } from 'lucide-react';
import NavbarNotifications from './NavbarNotifications';
import NavbarProfile from './NavbarProfile';

const NavbarActions = ({ theme, setTheme, setShowAddProduct, onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 flex-shrink-0">
      {/* DESKTOP: Invoice Button */}
      <button className="hidden lg:flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-all font-medium text-sm">
        <FileText size={18} />
        <span>Invoice</span>
      </button>

      {/* DESKTOP: Add Product Button */}
      <button
        onClick={() => setShowAddProduct(true)}
        className="hidden lg:flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-medium text-sm"
      >
        <Plus size={18} />
        <span>Add</span>
      </button>

      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2 text-foreground hover:bg-secondary/50 rounded-lg transition-colors flex-shrink-0"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Notifications Dropdown */}
      <div className="relative">
        <button
          onClick={() => {
            setShowNotifications(!showNotifications);
            setShowProfile(false);
          }}
          className="relative p-2 text-foreground hover:bg-secondary/50 rounded-lg transition-colors flex-shrink-0"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
            2
          </span>
        </button>

        {showNotifications && (
          <NavbarNotifications />
        )}
      </div>

      {/* Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => {
            setShowProfile(!showProfile);
            setShowNotifications(false);
          }}
          className="flex items-center gap-1 p-1 hover:bg-secondary/50 rounded-lg transition-colors flex-shrink-0"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xs">
            A
          </div>
          <ChevronDown size={18} className="hidden lg:block text-foreground" />
        </button>

        {showProfile && (
          <NavbarProfile onLogout={onLogout} />
        )}
      </div>
    </div>
  );
};

export default NavbarActions;
