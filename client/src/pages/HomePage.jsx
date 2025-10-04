import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Client Dashboard Components
import HeroSection from '@/components/client/dashboard/HeroSection';
import StatusMessage from '@/components/client/dashboard/StatusMessage';
import CarouselSlider from '@/components/client/dashboard/CarouselSlider';
import QuickActionBar from '@/components/client/dashboard/QuickActionBar';
import TopProducts from '@/components/client/dashboard/TopProducts';
import RecentOrders from '@/components/client/dashboard/RecentOrders';
import MonthlySummary from '@/components/client/dashboard/MonthlySummary';
import QuickContact from '@/components/client/dashboard/QuickContact';
import TrustBadges from '@/components/client/dashboard/TrustBadges';
import FooterSection from '@/components/client/dashboard/FooterSection';

const HomePage = () => {
  const { user } = useAuth();

  return (
  <>
    <div className="min-h-screen bg-page-gradient pb-0">
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Status Message */}
        <StatusMessage />

        {/* Carousel */}
        <CarouselSlider />

        {/* Quick Action Bar */}
        <QuickActionBar />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Top Products */}
            <TopProducts />

            {/* Recent Orders */}
            <RecentOrders />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <MonthlySummary />
            <QuickContact />
            <TrustBadges />
          </div>
        </div>
      </div>

      {/* Floating Quick Reorder FAB (Mobile) */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg"
          disabled={user?.status !== 'Approved'}
        >
          <RotateCcw className="w-6 h-6" />
        </Button>
      </div>
    </div>

    {/* Footer Section - Completely outside the gradient background div */}
    <FooterSection />
  </>
);

};

export default HomePage;
