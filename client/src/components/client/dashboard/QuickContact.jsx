import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, FileText } from 'lucide-react';

const QuickContact = () => {
  const contactOptions = [
    {
      icon: Phone,
      label: '+91 98765 43210',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      hoverBg: 'hover:bg-blue-100 dark:hover:bg-blue-900',
      borderColor: 'border-blue-200 dark:border-blue-800',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: MessageSquare,
      label: 'WhatsApp Support',
      bgColor: 'bg-green-50 dark:bg-green-950',
      hoverBg: 'hover:bg-green-100 dark:hover:bg-green-900',
      borderColor: 'border-green-200 dark:border-green-800',
      iconColor: 'text-green-600 dark:text-green-400',
    },
    {
      icon: FileText,
      label: 'Raise Support Ticket',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
      hoverBg: 'hover:bg-purple-100 dark:hover:bg-purple-900',
      borderColor: 'border-purple-200 dark:border-purple-800',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">
          Need Help?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {contactOptions.map((option, index) => {
          const Icon = option.icon;

          return (
            <Button
              key={index}
              variant="outline"
              className={`w-full justify-start transition-all text-gray-900 dark:text-white ${option.bgColor} ${option.hoverBg} ${option.borderColor}`}
            >
              <Icon className={`w-4 h-4 mr-2 ${option.iconColor}`} />
              {option.label}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default QuickContact;
