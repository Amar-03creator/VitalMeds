import React from 'react';
import { TrendingUp } from 'lucide-react';

const TopProducts = () => {
  const topProducts = [
    { name: 'Paracetamol 500mg', revenue: 125000, units: 2400 },
    { name: 'Azithromycin 500mg', revenue: 98000, units: 1800 },
    { name: 'Amoxicillin 250mg', revenue: 87000, units: 1500 },
    { name: 'Metformin 500mg', revenue: 76000, units: 1200 },
    { name: 'Ibuprofen 400mg', revenue: 65000, units: 1000 }
  ];

  return (
    <div className="bg-card rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Top 5 Products</h2>
        <TrendingUp className="text-green-500" size={24} />
      </div>
      <div className="space-y-4">
        {topProducts.map((product, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                  index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-500' :
                  index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-700' :
                  index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-500' :
                  'bg-gradient-to-br from-blue-400 to-blue-500'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{product.units} units</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">₹{(product.revenue / 1000).toFixed(0)}k</p>
              </div>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all"
                style={{ width: `${(product.revenue / topProducts[0].revenue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
