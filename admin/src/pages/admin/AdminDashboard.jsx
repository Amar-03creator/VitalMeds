import React from 'react';
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
  return (
    <div className="p-6 space-y-6">
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
  );
};

export default AdminDashboard;
