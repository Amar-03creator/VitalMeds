import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminNavbar from '@/components/common/AdminNavbar';
import Sidebar from '@/components/common/Sidebar';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AllProductsPage from '@/pages/admin/AllProductsPage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiryTime = payload.exp * 1000;

        if (Date.now() < expiryTime) {
          setIsAuthenticated(true);
        } else {
          console.warn('⏰ Admin token expired');
          localStorage.removeItem('authToken');
          localStorage.removeItem('adminName');
          localStorage.removeItem('adminEmail');
        }
      } catch (error) {
        console.error('❌ Token validation error:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('adminName');
        localStorage.removeItem('adminEmail');
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminEmail');
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const AdminLayout = ({ children }) => (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );

  return (
    <Router>
      <ThemeProvider defaultTheme="light" storageKey="vitalmeds-admin-theme">
        <Routes>
          {/* Login Route */}
          <Route
            path="/admin/login"
            element={
              isAuthenticated ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <AdminLoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
              )
            }
          />

          {/* Protected Admin Routes */}
          {isAuthenticated ? (
            <>
              <Route
                path="/admin/*"
                element={
                  <>
                    <AdminNavbar onLogout={handleLogout} />
                    <AdminLayout>
                      <Routes>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="products" element={<AllProductsPage />} />
                        <Route path="orders" element={<div className="p-8"><h1 className="text-2xl font-bold">All Orders</h1></div>} />
                        <Route path="customers" element={<div className="p-8"><h1 className="text-2xl font-bold">All Customers</h1></div>} />
                        <Route path="inquiries" element={<div className="p-8"><h1 className="text-2xl font-bold">Inquiries</h1></div>} />
                        <Route path="billing" element={<div className="p-8"><h1 className="text-2xl font-bold">Billing</h1></div>} />
                        <Route path="reports" element={<div className="p-8"><h1 className="text-2xl font-bold">Analytics / Reports</h1></div>} />
                        <Route path="payments" element={<div className="p-8"><h1 className="text-2xl font-bold">Payments</h1></div>} />
                        <Route path="inventory" element={<div className="p-8"><h1 className="text-2xl font-bold">Inventory</h1></div>} />
                        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                      </Routes>
                    </AdminLayout>
                  </>
                }
              />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/admin/login" replace />} />
          )}
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
