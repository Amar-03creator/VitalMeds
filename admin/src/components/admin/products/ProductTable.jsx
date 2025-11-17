import React, { useState } from 'react';
import {
  Edit2,
  Eye,
  AlertCircle,
  Calendar,
  Package,
  DollarSign,
  AlertTriangle
} from 'lucide-react';

export const ProductTable = ({ products, onEdit, onView, onDelete, loading }) => {
  const [deleteWarning, setDeleteWarning] = useState(null);

  const getExpiryStatus = (expiryDate) => {
    if (!expiryDate) return { text: 'Unknown', color: 'bg-gray-100 text-gray-800', icon: '❓' };
    
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const expiry = new Date(expiryDate);
    
    if (expiry < now) {
      return { text: 'Expired', color: 'bg-red-100 text-red-800', icon: '🔴' };
    }
    if (expiry < thirtyDaysFromNow) {
      return { text: 'Near Expiry', color: 'bg-yellow-100 text-yellow-800', icon: '🟡' };
    }
    return { text: 'Valid', color: 'bg-green-100 text-green-800', icon: '🟢' };
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (stock < 50) return { text: 'Low Stock', color: 'bg-orange-100 text-orange-800' };
    return { text: 'In Stock', color: 'bg-green-100 text-green-800' };
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

  const calculateMargin = (mrp, purchaseRate) => {
    if (!mrp || !purchaseRate || purchaseRate === 0) return '0';
    return ((mrp - purchaseRate) / purchaseRate * 100).toFixed(2);
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
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Batch</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Expiry Date</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Purchase Rate</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">MRP</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            if (!product || !product._id) return null;
            
            const expiryStatus = getExpiryStatus(product.expiryDate);
            const stockStatus = getStockStatus(product.stock || 0);
            const margin = calculateMargin(product.mrp, product.purchaseRate);

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
                      <p className="text-sm font-medium">{formatDate(product.expiryDate)}</p>
                      <span className={`text-xs px-2 py-1 rounded ${expiryStatus.color}`}>
                        {expiryStatus.icon} {expiryStatus.text}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Stock */}
                <td className="px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.stock || 0} units</p>
                    <span className={`text-xs px-2 py-1 rounded ${stockStatus.color}`}>
                      {stockStatus.text}
                    </span>
                  </div>
                </td>

                {/* Purchase Rate */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">₹{(product.purchaseRate || 0).toFixed(2)}</span>
                  </div>
                </td>

                {/* MRP */}
                <td className="px-4 py-3">
                  <div>
                    <p className="font-bold text-gray-900">₹{(product.mrp || 0).toFixed(2)}</p>
                    <p className="text-xs text-green-600 font-medium">{margin}% margin</p>
                  </div>
                </td>

                {/* Status Badge */}
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${expiryStatus.color}`}>
                    {expiryStatus.icon} {expiryStatus.text}
                  </span>
                </td>

                {/* Actions */}
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

                    {deleteWarning === product._id ? (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm">
                          <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                            <h3 className="text-lg font-bold text-gray-900">Confirm Deletion</h3>
                          </div>
                          
                          <p className="text-gray-600 mb-4">
                            Are you sure you want to delete <strong>{product.productName}</strong> (Batch: {product.batchNumber})?
                          </p>
                          
                          <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
                            <p className="text-xs text-red-700">
                              ⚠️ This action cannot be undone. The product will be permanently deleted from the database.
                            </p>
                          </div>

                          <div className="flex gap-3">
                            <button
                              onClick={() => setDeleteWarning(null)}
                              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium hover:bg-gray-300 transition"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                onDelete && onDelete(product._id);
                                setDeleteWarning(null);
                              }}
                              className="flex-1 px-4 py-2 bg-red-600 text-white rounded font-medium hover:bg-red-700 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteWarning(product._id)}
                        className="p-2 hover:bg-red-100 rounded transition text-red-600"
                        title="Delete Product"
                      >
                        <AlertCircle className="w-4 h-4" />
                      </button>
                    )}
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
