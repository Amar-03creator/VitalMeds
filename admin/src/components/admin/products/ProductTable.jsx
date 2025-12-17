import React from 'react';
import {
  Edit2,
  Eye,
  Calendar,
  Package,
  DollarSign
} from 'lucide-react';

export const ProductTable = ({ products, onEdit, onView, loading }) => {
  const getExpiryStatus = (expiryDate) => {
    if (!expiryDate) return { text: 'Unknown', color: 'text-gray-600' };
    
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const expiry = new Date(expiryDate);
    
    if (expiry < now) {
      return { text: 'Expired', color: 'text-red-600 font-semibold' };
    }
    if (expiry < thirtyDaysFromNow) {
      return { text: 'Near Expiry', color: 'text-yellow-600 font-semibold' };
    }
    return { text: '', color: 'text-gray-900' };
  };

  const getStockColor = (stock) => {
    if (stock === 0) return 'text-red-600 font-semibold';
    if (stock < 50) return 'text-orange-600 font-semibold';
    return 'text-gray-900';
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    try {
      return new Date(date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading products...</div>;
  }

  if (!products || products.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Product Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Batch Number</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Expiry Date</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Closing Stock</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Purchase Rate</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">MRP</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Selling Price</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            if (!product || !product._id) return null;
            
            const expiryStatus = getExpiryStatus(product.expiryDate);
            const stockColor = getStockColor(product.stock || 0);

            return (
              <tr key={product._id} className="border-b hover:bg-gray-50 transition">
                {/* Product Name */}
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-gray-900">{product.productName || 'N/A'}</p>
                    <p className="text-xs text-gray-500">{product.company || 'N/A'}</p>
                  </div>
                </td>

                {/* Batch Number */}
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                    {product.batchNumber || 'N/A'}
                  </span>
                </td>

                {/* Expiry Date */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className={`text-sm font-medium ${expiryStatus.color}`}>
                        {formatDate(product.expiryDate)}
                      </p>
                      {expiryStatus.text && (
                        <p className="text-xs text-gray-500">{expiryStatus.text}</p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Closing Stock */}
                <td className="px-4 py-3">
                  <p className={`text-sm font-medium ${stockColor}`}>
                    {product.stock || 0} units
                  </p>
                </td>

                {/* Purchase Rate */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">
                      ₹{(product.purchaseRate || 0).toFixed(2)}
                    </span>
                  </div>
                </td>

                {/* MRP */}
                <td className="px-4 py-3">
                  <p className="font-bold text-gray-900">
                    ₹{(product.mrp || 0).toFixed(2)}
                  </p>
                </td>

                {/* Selling Price */}
                <td className="px-4 py-3">
                  <div>
                    <p className="font-bold text-green-600">
                      ₹{(product.sellingPrice || product.mrp * 0.8).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">20% off MRP</p>
                  </div>
                </td>

                {/* Actions - View & Edit Only */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView && onView(product)}
                      className="p-2 hover:bg-blue-100 rounded transition text-blue-600"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onEdit && onEdit(product)}
                      className="p-2 hover:bg-green-100 rounded transition text-green-600"
                      title="Edit Product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
