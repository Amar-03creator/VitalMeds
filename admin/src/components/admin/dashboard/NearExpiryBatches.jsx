import React from 'react';
import { Calendar, AlertTriangle } from 'lucide-react';

const NearExpiryBatches = () => {
  const expiringBatches = [
    { product: 'Paracetamol 500mg', batch: 'BTH2401', expiry: '2025-11-15', quantity: 450, daysLeft: 17 },
    { product: 'Azithromycin 250mg', batch: 'BTH2398', expiry: '2025-11-28', quantity: 280, daysLeft: 30 },
    { product: 'Ibuprofen 400mg', batch: 'BTH2405', expiry: '2025-12-05', quantity: 320, daysLeft: 37 },
    { product: 'Metformin 850mg', batch: 'BTH2412', expiry: '2025-12-20', quantity: 195, daysLeft: 52 },
    { product: 'Amoxicillin 500mg', batch: 'BTH2415', expiry: '2026-01-10', quantity: 380, daysLeft: 73 }
  ];

  const getStatusColor = (daysLeft) => {
    if (daysLeft <= 20) return 'red';
    if (daysLeft <= 40) return 'orange';
    return 'yellow';
  };

  const colorClasses = {
    red: 'bg-red-50 dark:bg-red-950 border-red-500 dark:border-red-600',
    orange: 'bg-orange-50 dark:bg-orange-950 border-orange-500 dark:border-orange-600',
    yellow: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-500 dark:border-yellow-600'
  };

  const iconColorClasses = {
    red: 'text-red-500 dark:text-red-400',
    orange: 'text-orange-500 dark:text-orange-400',
    yellow: 'text-yellow-500 dark:text-yellow-400'
  };

  return (
    <div className="bg-card rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Near Expiry Batches</h2>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">View All →</button>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {expiringBatches.map((batch, index) => {
          const statusColor = getStatusColor(batch.daysLeft);
          return (
            <div 
              key={index} 
              className={`p-4 rounded-lg border-l-4 ${colorClasses[statusColor]} transition-colors cursor-pointer hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-foreground">{batch.product}</p>
                    {batch.daysLeft <= 20 && (
                      <AlertTriangle className={iconColorClasses[statusColor]} size={16} />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Batch: {batch.batch} • Qty: {batch.quantity}
                  </p>
                  <div className="flex items-center gap-2">
                    <Calendar className={iconColorClasses[statusColor]} size={14} />
                    <p className="text-xs text-muted-foreground">
                      Expires: {batch.expiry} ({batch.daysLeft} days left)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NearExpiryBatches;
