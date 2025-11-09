import React, { useState } from 'react';
import { Home, ShoppingCart, Users, FileText, Package, DollarSign, TrendingUp, CreditCard, Menu, X } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'orders', label: 'All Orders', icon: ShoppingCart, badge: 45 },
    { id: 'products', label: 'All Products', icon: Package },
    { id: 'customers', label: 'All Customers', icon: Users },
    { id: 'inquiries', label: 'Inquiries', icon: FileText, badge: 12 },
    { id: 'billing', label: 'Billing', icon: DollarSign },
    { id: 'reports', label: 'Analytics / Reports', icon: TrendingUp },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'inventory', label: 'Inventory', icon: Package }
  ];

  const handleMenuClick = (id) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - LIGHT MODE SUPPORT */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-gray-50 dark:bg-slate-950 flex flex-col shadow-2xl border-r border-border
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-6 border-b border-border bg-white dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <Package className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">VitalMEDS</h1>
              <p className="text-xs text-muted-foreground">Admin Portal</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 mb-2 rounded-lg transition-all ${
                activeSection === item.id 
                  ? 'bg-gradient-to-r from-primary to-blue-500 text-white shadow-lg' 
                  : 'text-foreground hover:bg-accent'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                  activeSection === item.id ? 'bg-white text-primary' : 'bg-red-500 text-white'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        
        {/* User Profile */}
        <div className="p-4 border-t border-border bg-white dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Admin User</div>
              <div className="text-xs text-muted-foreground">admin@vitalmeds.com</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
