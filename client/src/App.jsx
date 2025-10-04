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

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vitalmeds-ui-theme">
      <AuthProvider>
        <Router>
          {/* REMOVED bg-background and text-foreground from here */}
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Navbar />
                  <HomePage />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
