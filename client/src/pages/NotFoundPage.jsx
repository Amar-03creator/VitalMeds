import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 md:p-12 text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-blue-600 dark:text-blue-500 mb-4">
            404
          </div>
          <div className="flex justify-center mb-6">
            <Search className="w-20 h-20 text-slate-300 dark:text-slate-700" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or is under construction. 
          Please check the URL or navigate back to continue.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          <Button 
            onClick={() => navigate('/dashboard')}
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            Go to Dashboard
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-500 mb-3">
            Need help? Contact our support team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <a 
              href="mailto:support@vitalmeds.com" 
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              support@vitalmeds.com
            </a>
            <span className="hidden sm:inline text-slate-300">|</span>
            <a 
              href="tel:+911234567890" 
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              +91 123 456 7890
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotFoundPage;
