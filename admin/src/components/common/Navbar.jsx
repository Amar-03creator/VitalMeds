import React, { useState } from 'react';
import { Search, Bell, ChevronDown, User, X, Check, XCircle, Sun, Moon, Plus, TrendingUp } from 'lucide-react';
import { useTheme } from '@/contexts/useTheme';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const pendingApprovals = [
    { id: 1, name: 'Apollo Pharmacy', email: 'apollo@example.com', time: '5 mins ago', type: 'new' },
    { id: 2, name: 'MedPlus Store', email: 'medplus@example.com', time: '18 mins ago', type: 'new' },
    { id: 3, name: 'HealthCare Clinic', email: 'healthcare@example.com', time: '1 hour ago', type: 'new' }
  ];

  const handleApprove = (id) => {
    console.log('Approved:', id);
  };

  const handleReject = (id) => {
    console.log('Rejected:', id);
  };

  return (
    <div className="bg-background border-b border-border px-4 lg:px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        {/* Search - Hidden on small screens, shown on md+ */}
        <div className="hidden md:flex items-center flex-1">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search products, customers, SKU..."
              className="w-full pl-12 pr-4 py-3 bg-secondary border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Hidden on mobile, shown on lg+ */}
          <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all">
            <Plus size={18} />
            <span className="font-medium">Invoice</span>
          </button>
          
          <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition-all">
            <TrendingUp size={18} />
            <span className="font-medium">Product</span>
          </button>
          
          {/* Mobile action buttons - icon only */}
          <button className="lg:hidden p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
            <Plus size={20} />
          </button>
          
          <button className="lg:hidden p-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <TrendingUp size={20} />
          </button>
          
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-3 text-foreground hover:bg-accent rounded-xl transition-colors"
          >
            {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-3 text-foreground hover:bg-accent rounded-xl transition-colors"
            >
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                {pendingApprovals.length}
              </span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 md:w-96 bg-card rounded-xl shadow-2xl border border-border z-50 max-h-[600px] overflow-hidden">
                <div className="p-4 border-b border-border bg-accent">
                  <h3 className="font-bold text-foreground text-lg">Pending Approvals</h3>
                  <p className="text-xs text-muted-foreground mt-1">Customer registration requests</p>
                </div>
                <div className="overflow-y-auto max-h-[500px]">
                  {pendingApprovals.map(approval => (
                    <div key={approval.id} className="p-4 hover:bg-accent border-b border-border transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-foreground text-sm">{approval.name}</p>
                          <p className="text-xs text-muted-foreground">{approval.email}</p>
                          <p className="text-xs text-muted-foreground mt-1">{approval.time}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(approval.id)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          <Check size={16} />
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(approval.id)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                        >
                          <XCircle size={16} />
                          Reject
                        </button>
                        <button className="px-3 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium">
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-2 hover:bg-accent rounded-xl transition-colors"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <ChevronDown size={18} className="hidden lg:block text-foreground" />
            </button>
            
            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-card rounded-xl shadow-xl border border-border z-50 overflow-hidden">
                <div className="p-4 bg-accent border-b border-border">
                  <p className="font-semibold text-foreground">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@vitalmeds.com</p>
                </div>
                <button className="w-full px-4 py-3 text-left text-sm hover:bg-accent flex items-center gap-2">
                  <User size={16} />
                  Profile Settings
                </button>
                <button className="w-full px-4 py-3 text-left text-sm hover:bg-accent text-red-600 dark:text-red-400 flex items-center gap-2 border-t border-border">
                  <X size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
