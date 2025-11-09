import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vitalmeds-admin-theme">
      <AdminDashboard />
    </ThemeProvider>
  );
}

export default App;
