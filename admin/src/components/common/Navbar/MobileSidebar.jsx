import React from 'react';
import MobileSidebarContent from './MobileSidebarContent';

const MobileSidebar = ({ isOpen, onClose, setShowAddProduct }) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 top-16"
        onClick={onClose}
      />
      <div className="lg:hidden fixed top-16 left-0 w-64 h-[calc(100vh-64px)] bg-card border-r border-border z-50 overflow-y-auto">
        <MobileSidebarContent 
          setShowAddProduct={setShowAddProduct}
          onClose={onClose}
        />
      </div>
    </>
  );
};

export default MobileSidebar;
