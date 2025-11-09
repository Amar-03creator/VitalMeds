import React from 'react';
import { ExternalLink } from 'lucide-react';

const RecentInquiries = () => {
  const inquiries = [
    { id: 1, store: 'Apollo Pharmacy', items: 'Paracetamol 500mg, Azithromycin 250mg', date: '2 hours ago', status: 'new' },
    { id: 2, store: 'MedPlus Store', items: 'Metformin 850mg, Insulin Glargine', date: '5 hours ago', status: 'new' },
    { id: 3, store: 'HealthCare Clinic', items: 'Amoxicillin 500mg', date: '1 day ago', status: 'pending' },
    { id: 4, store: 'City Hospital', items: 'Multiple Items (12)', date: '1 day ago', status: 'pending' },
    { id: 5, store: 'Wellness Pharmacy', items: 'Atorvastatin 10mg, Aspirin 75mg', date: '2 days ago', status: 'pending' }
  ];

  const handleOpen = (inquiryId) => {
    console.log('Opening inquiry:', inquiryId);
    // Add navigation or modal logic here
  };

  return (
    <div className="bg-card rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Recent Inquiries</h2>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">View All →</button>
      </div>
      <div className="space-y-3">
        {inquiries.map((inquiry) => (
          <div key={inquiry.id} className="p-4 bg-secondary rounded-xl hover:bg-accent transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-foreground">{inquiry.store}</p>
                  {inquiry.status === 'new' && (
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">{inquiry.items}</p>
                <p className="text-xs text-muted-foreground">{inquiry.date}</p>
              </div>
              <button
                onClick={() => handleOpen(inquiry.id)}
                className="flex items-center gap-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <ExternalLink size={14} />
                Open
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentInquiries;
