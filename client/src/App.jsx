import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

// Layout Components
import PublicLayout from '@/components/layouts/PublicLayout';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';

// Public Pages
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/client/LoginPage';
import RegisterPage from '@/pages/client/RegisterPage';

// Protected Pages
import HomePage from '@/pages/HomePage';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Public Routes (for non-authenticated users) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Protected Routes (for authenticated users) */}
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={
              <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">Products Catalog</h1>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            } />
            <Route path="/orders" element={
              <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">My Orders</h1>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            } />
          </Route>

          {/* Secret Admin Route */}
          <Route path="/vitalmeds-admin-portal-2025" element={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700">
              <div className="text-center p-8 bg-white rounded-xl shadow-2xl max-w-md">
                <h1 className="text-2xl font-bold text-foreground mb-4">VitalMEDS Admin Portal</h1>
                <p className="text-muted-foreground mb-6">Authorized Access Only</p>
                <Button className="w-full bg-slate-800 hover:bg-slate-900">
                  Admin Login
                </Button>
              </div>
            </div>
          } />

          {/* 404 Page */}
          <Route path="*" element={
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
              <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
                <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-foreground mb-2">Page Not Found</h2>
                <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist.</p>
                <Link to="/">
                  <Button className="w-full">Go Back Home</Button>
                </Link>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
