import React from 'react';
import {
  Home,
  ShoppingCart,
  Package,
  Users,
  FileText as FileTextIcon,
  DollarSign,
  TrendingUp,
  CreditCard,
  Plus,
  FileText,
} from 'lucide-react';

const MobileSidebarContent = ({ setShowAddProduct, onClose }) => {
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'orders', label: 'All Orders', icon: ShoppingCart },
    { id: 'products', label: 'All Products', icon: Package },
    { id: 'customers', label: 'All Customers', icon: Users },
    { id: 'inquiries', label: 'Inquiries', icon: FileTextIcon },
    { id: 'billing', label: 'Billing', icon: DollarSign },
    { id: 'reports', label: 'Analytics / Reports', icon: TrendingUp },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'inventory', label: 'Inventory', icon: Package }
  ];

  const handleNavigate = (section) => {
    window.__onNavigate?.(section);
    onClose();
  };

  return (
    <>
      <nav className="p-4 space-y-2">
        {sidebarItems.map(item => (
          <button
            key={item.id}
            onClick={() => handleNavigate(item.id)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left text-foreground hover:bg-accent"
          >
            <item.icon size={20} />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Mobile Invoice & Add Product */}
      <div className="border-t border-border p-4 space-y-2">
        <button className="w-full flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-sm font-medium">
          <FileText size={16} />
          Make Invoice
        </button>
        <button
          onClick={() => {
            setShowAddProduct(true);
            onClose();
          }}
          className="w-full flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>
    </>
  );
};

export default MobileSidebarContent;
