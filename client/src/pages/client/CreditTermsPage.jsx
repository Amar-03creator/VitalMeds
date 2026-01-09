import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

const CreditTermsPage = () => {
  return (
    <div className="container mx-auto p-6">
      <Card className="p-8 max-w-4xl mx-auto">
        <div className="text-center">
          <CreditCard className="w-16 h-16 mx-auto mb-4 text-violet-500" />
          <h1 className="text-3xl font-bold mb-4">Credit Terms & Payment Options</h1>
          <p className="text-muted-foreground mb-6">
            This page is under construction. Soon you'll find detailed information about our flexible payment options.
          </p>
          <div className="text-left max-w-2xl mx-auto mb-6">
            <h3 className="font-semibold mb-2">Coming Soon:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Credit limit information</li>
              <li>Payment terms (Net 30, Net 60)</li>
              <li>Early payment discounts</li>
              <li>Accepted payment methods</li>
            </ul>
          </div>
          <Button onClick={() => window.history.back()}>
            Go Back to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CreditTermsPage;
