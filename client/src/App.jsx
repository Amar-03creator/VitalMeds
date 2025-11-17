import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import Navbar from '@/components/common/Navbar';

// Pages
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/client/LoginPage';
import RegisterPage from '@/pages/client/RegisterPage';
import HomePage from '@/pages/HomePage';
import ProductsPage from '@/pages/client/ProductsPage';
import NotFoundPage from '@/pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vitalmeds-ui-theme">
      <AuthProvider>
        <Router>
          <div className="min-h-screen">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Navbar />
                  <HomePage />
                </ProtectedRoute>
              } />
              
              <Route path="/products" element={
                <ProtectedRoute>
                  <Navbar />
                  <ProductsPage />
                </ProtectedRoute>
              } />

              {/* Placeholder routes for under-construction pages */}
              <Route path="/orders" element={
                <ProtectedRoute>
                  <NotFoundPage />
                </ProtectedRoute>
              } />

              <Route path="/profile" element={
                <ProtectedRoute>
                  <NotFoundPage />
                </ProtectedRoute>
              } />

              <Route path="/messages" element={
                <ProtectedRoute>
                  <NotFoundPage />
                </ProtectedRoute>
              } />

              <Route path="/notifications" element={
                <ProtectedRoute>
                  <NotFoundPage />
                </ProtectedRoute>
              } />
              
              {/* Catch-all 404 Route - MUST BE LAST */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
