// src/components/client/dashboard/HeroSection.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import {
  CheckCircle,
  Clock,
  RotateCcw,
  Package,
  Building,
  Truck,
  Shield
} from 'lucide-react';

const HeroSection = () => {
  const { user } = useAuth();

  const getHeroMessage = () => {
    if (user?.status !== 'Approved') {
      return "Get started with verified companies";
    }
    return "Ready to reorder?";
  };

  return (
    <div className="relative overflow-hidden rounded-3xl text-white shadow-xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 dark:from-emerald-900 dark:via-emerald-800 dark:to-teal-800">
      <div className="absolute inset-0 bg-black/5 dark:bg-black/30"></div>
      
      <div className="relative grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
        {/* Left Content */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
              Welcome back, {user?.ownerName?.split(' ')[0] || 'Partner'}!
            </h1>
            <h2 className="text-xl lg:text-2xl font-medium opacity-90">
              {getHeroMessage()}
            </h2>
            <p className="text-lg opacity-75 max-w-lg">
              Get authentic medicines from verified companies. Fast delivery & GST-compliant invoices.
            </p>
          </div>

          {/* Status Badge */}
          <div className="flex flex-wrap items-center gap-3">
            {user?.status === 'Approved' ? (
              <Badge className="px-3 py-1 text-sm bg-white/20 text-white border-white/30 hover:bg-white/25">
                <CheckCircle className="w-4 h-4 mr-1" />
                {user?.status}
              </Badge>
            ) : (
              <Badge className="px-3 py-1 text-sm bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:text-amber-200 dark:border-amber-700 hover:bg-amber-200 dark:hover:bg-amber-800">
                <Clock className="w-4 h-4 mr-1" />
                {user?.status}
              </Badge>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-white text-green-700 hover:bg-gray-50 dark:bg-gray-100 dark:text-green-800 dark:hover:bg-gray-200 font-semibold px-8 shadow-lg"
              disabled={user?.status !== 'Approved'}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Quick Reorder
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 bg-white/10 backdrop-blur-sm"
            >
              <Package className="w-5 h-5 mr-2" />
              Browse Catalogue
            </Button>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold">100+</div>
              <div className="text-sm opacity-75">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">3-4</div>
              <div className="text-sm opacity-75">Trusted Companies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">48</div>
              <div className="text-sm opacity-75">Hours Avg Delivery</div>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative hidden lg:flex items-center justify-center">
          <div className="relative w-64 h-64 bg-white/10 dark:bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="w-48 h-48 bg-white/20 dark:bg-white/10 rounded-full flex items-center justify-center">
              <Building className="w-24 h-24 text-white/80" />
            </div>
            {/* Floating elements */}
            <div className="absolute top-4 right-8 bg-white/20 dark:bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <Truck className="w-6 h-6" />
            </div>
            <div className="absolute bottom-8 left-4 bg-white/20 dark:bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <Shield className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;