import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NewOrderButton = ({ isSearchExpanded }) => {
  const navigate = useNavigate();

  return (
    isSearchExpanded && (
      <Button
        className="hidden h-9 md:inline-flex bg-blue-600 hover:bg-blue-700"
        onClick={() => navigate('/products')}
      >
        <Plus className="mr-2 h-4 w-4" />
        New Order
      </Button>
    )
  );
};

export default NewOrderButton;
