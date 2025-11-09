import React, { useState } from 'react';
import Sidebar from '@/components/common/Sidebar';
import Navbar from '@/components/common/Navbar';
import RevenueCards from '@/components/admin/dashboard/RevenueCards';
import CriticalAlerts from '@/components/admin/dashboard/CriticalAlerts';
import SalesTrend from '@/components/admin/dashboard/SalesTrend';
import TopProducts from '@/components/admin/dashboard/TopProducts';
import RevenueVsCost from '@/components/admin/dashboard/RevenueVsCost';
import TopCustomers from '@/components/admin/dashboard/TopCustomers';
import RecentInquiries from '@/components/admin/dashboard/RecentInquiries';
import NearExpiryBatches from '@/components/admin/dashboard/NearExpiryBatches';
import RecentOrders from '@/components/admin/dashboard/RecentOrders';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="flex h-screen bg-background overflow-hidden m-0 p-0">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        {/* REMOVED ALL PADDING - Content fills completely */}
        <div className="flex-1 overflow-y-auto p-6">
          <RevenueCards />
          <CriticalAlerts />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <SalesTrend />
            <TopProducts />
          </div>

          <div className="grid grid-cols-1 gap-6 mb-6">
            <RevenueVsCost />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <TopCustomers />
            <RecentInquiries />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <RecentOrders />
            <NearExpiryBatches />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
