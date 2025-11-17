import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, Users, FileText, Package, DollarSign, TrendingUp, CreditCard } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/admin/dashboard' },
    { id: 'orders', label: 'All Orders', icon: ShoppingCart, badge: 45, path: '/admin/orders' },
    { id: 'products', label: 'All Products', icon: Package, path: '/admin/products' },
    { id: 'customers', label: 'All Customers', icon: Users, path: '/admin/customers' },
    { id: 'inquiries', label: 'Inquiries', icon: FileText, badge: 12, path: '/admin/inquiries' },
    { id: 'billing', label: 'Billing', icon: DollarSign, path: '/admin/billing' },
    { id: 'reports', label: 'Analytics / Reports', icon: TrendingUp, path: '/admin/reports' },
    { id: 'payments', label: 'Payments', icon: CreditCard, path: '/admin/payments' },
    { id: 'inventory', label: 'Inventory', icon: Package, path: '/admin/inventory' }
  ];

  // Check if current route matches item path
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Sidebar - FIXED HEIGHT, NO SCROLL */}
      <div className="hidden lg:flex fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-gray-50 dark:bg-slate-950 flex-col shadow-2xl border-r border-border">
        
        {/* Navigation - scrollable, but sidebar stays fixed */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-between px-4 py-3 mb-2 rounded-lg transition-all ${
                isActive(item.path)
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
                  isActive(item.path) ? 'bg-white text-primary' : 'bg-red-500 text-white'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        
        {/* User Profile */}
        <div className="p-4 border-t border-border bg-white dark:bg-slate-900 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              {localStorage.getItem('adminName')?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">
                {localStorage.getItem('adminName') || 'Admin User'}
              </div>
              <div className="text-xs text-muted-foreground">
                {localStorage.getItem('adminEmail') || 'admin@vitalmeds.com'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for desktop - takes sidebar width so content doesn't overlap */}
      <div className="hidden lg:block w-64 flex-shrink-0" />
    </>
  );
};

export default Sidebar;
