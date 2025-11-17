import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/useTheme';
import AddProductModal from './AddProductModal';
import NavbarLogo from '../common/Navbar/NavbarLogo';
import NavbarSearch from '../common/Navbar/NavbarSearch';
import NavbarActions from '../common/Navbar/NavbarActions';
import MobileSidebar from '../common/Navbar/MobileSidebar';

const AdminNavbar = ({ onLogout }) => {
  const { theme, setTheme } = useTheme();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/40 backdrop-blur-xl shadow-sm">
        <div className="w-full px-2 sm:px-4 lg:px-6">
          <div className="flex h-16 items-center justify-between gap-2 sm:gap-4">
            {/* Logo Section */}
            <NavbarLogo 
              mobileSidebarOpen={mobileSidebarOpen}
              setMobileSidebarOpen={setMobileSidebarOpen}
            />

            {/* Search Bar */}
            <NavbarSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {/* Action Buttons */}
            <NavbarActions 
              theme={theme}
              setTheme={setTheme}
              setShowAddProduct={setShowAddProduct}
              onLogout={onLogout}
            />
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        setShowAddProduct={setShowAddProduct}
      />

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        onAdd={(formData) => {
          console.log('New product:', formData);
          window.dispatchEvent(new Event('product-added'));
          setShowAddProduct(false);
        }}
        loading={false}
      />
    </>
  );
};

export default AdminNavbar;
