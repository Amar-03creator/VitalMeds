import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

const InquiryPage = () => {
  return (
    <div className="container mx-auto p-6">
      <Card className="p-8 max-w-4xl mx-auto">
        <div className="text-center">
          <Send className="w-16 h-16 mx-auto mb-4 text-purple-500" />
          <h1 className="text-3xl font-bold mb-4">Send Inquiry</h1>
          <p className="text-muted-foreground mb-6">
            This page is under construction. Soon you'll be able to send bulk order inquiries here.
          </p>
          <Button onClick={() => window.history.back()}>
            Go Back to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default InquiryPage;
