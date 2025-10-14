// src/components/common/Navbar/Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/dashboard" className="flex flex-col items-start shrink-0">
      <div className="text-2xl font-bold text-primary">VitalMEDS</div>
      <div className="text-xs text-green-600 dark:text-green-400 font-medium -mt-1 whitespace-nowrap">
        ✓ Verified Distributor
      </div>
    </Link>
  );
};

export default Logo;