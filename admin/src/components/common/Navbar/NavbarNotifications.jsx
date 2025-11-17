import React, { useState } from 'react';
import { Check, XCircle } from 'lucide-react';

const NavbarNotifications = () => {
  const [pendingApprovals] = useState([
    { id: 1, name: 'Apollo Pharmacy', email: 'apollo@example.com', time: '5 mins ago' },
    { id: 2, name: 'MedPlus Store', email: 'medplus@example.com', time: '18 mins ago' },
  ]);

  const handleApprove = (id) => console.log('Approved:', id);
  const handleReject = (id) => console.log('Rejected:', id);

  return (
    <div className="absolute right-0 mt-2 w-80 md:w-96 bg-card rounded-lg shadow-lg border border-border z-50 max-h-[500px] overflow-hidden">
      <div className="p-3 border-b border-border bg-secondary/50">
        <h3 className="font-bold text-foreground text-sm">Pending Approvals</h3>
      </div>
      {pendingApprovals.length === 0 ? (
        <div className="p-6 text-center text-muted-foreground">
          <p className="text-xs">No pending approvals</p>
        </div>
      ) : (
        <div className="overflow-y-auto max-h-[420px]">
          {pendingApprovals.map((approval) => (
            <div key={approval.id} className="p-3 hover:bg-secondary/50 border-b border-border">
              <p className="font-semibold text-foreground text-xs">{approval.name}</p>
              <p className="text-xs text-muted-foreground">{approval.email}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleApprove(approval.id)}
                  className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                >
                  <Check size={14} />
                  Accept
                </button>
                <button
                  onClick={() => handleReject(approval.id)}
                  className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                >
                  <XCircle size={14} />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavbarNotifications;
