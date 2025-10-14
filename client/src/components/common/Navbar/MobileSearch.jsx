// src/components/common/Navbar/MobileSearch.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MobileSearch = () => {
  const navigate = useNavigate();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="md:hidden"
      onClick={() => navigate('/products')}
    >
      <Search className="h-5 w-5" />
    </Button>
  );
};

export default MobileSearch;