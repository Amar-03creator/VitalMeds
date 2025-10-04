import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeProvider';
import { Phone, MessageSquare, FileText } from 'lucide-react';

const QuickContact = () => {
  const { theme } = useTheme();

  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const contactOptions = [
    {
      icon: Phone,
      label: '+91 98765 43210',
      lightBg: '#eff6ff',
      darkBg: '#1e3a8a',
      lightBorder: '#bfdbfe',
      darkBorder: '#1e40af',
      lightHoverBg: '#dbeafe',
      darkHoverBg: '#1e40af',
      lightIconColor: '#2563eb',
      darkIconColor: '#60a5fa',
    },
    {
      icon: MessageSquare,
      label: 'WhatsApp Support',
      lightBg: '#f0fdf4',
      darkBg: '#064e3b',
      lightBorder: '#bbf7d0',
      darkBorder: '#065f46',
      lightHoverBg: '#dcfce7',
      darkHoverBg: '#065f46',
      lightIconColor: '#16a34a',
      darkIconColor: '#4ade80',
    },
    {
      icon: FileText,
      label: 'Raise Support Ticket',
      lightBg: '#faf5ff',
      darkBg: '#581c87',
      lightBorder: '#e9d5ff',
      darkBorder: '#6b21a8',
      lightHoverBg: '#f3e8ff',
      darkHoverBg: '#6b21a8',
      lightIconColor: '#9333ea',
      darkIconColor: '#c084fc',
    },
  ];

  return (
    <Card
      className="shadow-lg"
      style={{
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        borderColor: isDark ? '#374151' : '#e5e7eb',
      }}
    >
      <CardHeader>
        <CardTitle style={{ color: isDark ? '#f9fafb' : '#111827' }}>
          Need Help?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {contactOptions.map((option, index) => {
          const Icon = option.icon;
          const [isHovered, setIsHovered] = React.useState(false);

          return (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start transition-all"
              style={{
                backgroundColor: isHovered
                  ? isDark
                    ? option.darkHoverBg
                    : option.lightHoverBg
                  : isDark
                  ? option.darkBg
                  : option.lightBg,
                borderColor: isDark ? option.darkBorder : option.lightBorder,
                color: isDark ? '#f9fafb' : '#111827',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Icon
                className="w-4 h-4 mr-2"
                style={{
                  color: isDark ? option.darkIconColor : option.lightIconColor,
                }}
              />
              {option.label}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default QuickContact;