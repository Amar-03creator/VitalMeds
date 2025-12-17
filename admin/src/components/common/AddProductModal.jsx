import React, { useState } from 'react';
import { X } from 'lucide-react';

export const AddProductModal = ({ isOpen, onClose, onAdd, loading }) => {
  const [formData, setFormData] = useState({
    productName: '',
    sku: '',
    hsn: '',
    batchNumber: '',
    company: '',
    category: '',
    composition: '',
    packSize: '',
    purchaseRate: '',
    mrp: '',
    stock: '',
    expiryDate: '',
    usageAndDosage: '',
    description: ''
  });

  const companies = ['Sun Pharma', 'Cipla', 'Dr. Reddy\'s', 'Lupin', 'Aurobindo', 'Torrent', 'Abbott', 'Novartis', 'GSK', 'Other'];
  
  const categories = [
    'Pain Relief', 'Antibiotics', 'Antihistamine', 'Gastro', 'Diabetes',
    'Cardiovascular', 'Respiratory', 'Dermatology', 'Vitamins & Supplements',
    'Antacids', 'Antipyretic', 'Anti-inflammatory', 'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      productName: '', sku: '', hsn: '', batchNumber: '', company: '', category: '',
      composition: '', packSize: '', purchaseRate: '', mrp: '', stock: '', expiryDate: '',
      usageAndDosage: '', description: ''
    });
  };

  // ✅ Calculate selling price
  const sellingPrice = formData.mrp ? (parseFloat(formData.mrp) * 0.8).toFixed(2) : '0.00';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input 
                type="text" 
                name="productName" 
                value={formData.productName} 
                onChange={handleChange} 
                placeholder="e.g., Pantoprazole 40mg" 
                className="w-full px-3 py-2 border rounded-md" 
                required 
              />
            </div>

            {/* SKU */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
              <input 
                type="text" 
                name="sku" 
                value={formData.sku} 
                onChange={handleChange} 
                placeholder="e.g., PANTO-40" 
                className="w-full px-3 py-2 border rounded-md" 
                required 
              />
            </div>

            {/* HSN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">HSN Code *</label>
              <input 
                type="text" 
                name="hsn" 
                value={formData.hsn} 
                onChange={handleChange} 
                placeholder="e.g., 300490" 
                maxLength="6" 
                className="w-full px-3 py-2 border rounded-md" 
                required 
              />
            </div>

            {/* Batch Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number *</label>
              <input 
                type="text" 
                name="batchNumber" 
                value={formData.batchNumber} 
                onChange={handleChange} 
                placeholder="e.g., AB123456" 
                className="w-full px-3 py-2 border rounded-md" 
                required 
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
              <select 
                name="company" 
                value={formData.company} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border rounded-md" 
                required
              >
                <option value="">Select Company</option>
                {companies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border rounded-md" 
                required
              >
                <option value="">Select Category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Composition */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Composition *</label>
              <input 
                type="text" 
                name="composition" 
                value={formData.composition} 
                onChange={handleChange} 
                placeholder="e.g., Pantoprazole 40mg" 
                className="w-full px-3 py-2 border rounded-md" 
                required 
              />
            </div>

            {/* Pack Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pack Size *</label>
              <input 
                type="text" 
                name="packSize" 
                value={formData.packSize} 
                onChange={handleChange} 
                placeholder="e.g., 10x10 Tablets" 
                className="w-full px-3 py-2 border rounded-md" 
                required 
              />
            </div>

            {/* Purchase Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Rate ₹ *</label>
              <input 
                type="number" 
                name="purchaseRate" 
                value={formData.purchaseRate} 
                onChange={handleChange} 
                placeholder="0.00" 
                step="0.01" 
                className="w-full px-3 py-2 border rounded-md" 
                required 
              />
            </div>

            {/* MRP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">MRP ₹ *</label>
              <input 
                type="number" 
                name="mrp" 
                value={formData.mrp} 
                onChange={handleChange} 
                placeholder="0.00" 
                step="0.01" 
                className="w-full px-3 py-2 border rounded-md" 
                required 
              />
            </div>

            {/* ✅ NEW: Selling Price (Auto-calculated) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Selling Price ₹
              </label>
              <div className="w-full px-3 py-2 bg-green-50 border border-green-300 rounded-md">
                <span className="text-green-700 font-bold text-lg">₹{sellingPrice}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Auto-calculated: MRP - 20%
              </p>
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
              <input 
                type="number" 
                name="stock" 
                value={formData.stock} 
                onChange={handleChange} 
                placeholder="0" 
                className="w-full px-3 py-2 border rounded-md" 
                required 
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
              <input 
                type="date" 
                name="expiryDate" 
                value={formData.expiryDate} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border rounded-md" 
                required 
              />
            </div>

            {/* Usage and Dosage */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Usage and Dosage</label>
              <textarea 
                name="usageAndDosage" 
                value={formData.usageAndDosage} 
                onChange={handleChange} 
                placeholder="e.g., Take 1 tablet daily before breakfast" 
                className="w-full px-3 py-2 border rounded-md" 
                rows="2" 
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Product description..." 
                className="w-full px-3 py-2 border rounded-md" 
                rows="2" 
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
