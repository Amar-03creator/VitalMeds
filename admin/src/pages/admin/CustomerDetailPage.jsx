import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, CreditCard, Package, Calendar, Building2, FileText, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import api from '@/services/api';

const CustomerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomerDetails();
  }, [id]);

  const fetchCustomerDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/customers/${id}`);
      setCustomer(response.data.data);
      
      // TODO: Fetch customer orders
      // const ordersResponse = await api.get(`/admin/orders?customerId=${id}`);
      // setOrders(ordersResponse.data.data);
      
      console.log('✅ Customer details fetched');
    } catch (error) {
      console.error('❌ Error fetching customer:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-6">
        <p className="text-red-600">Customer not found</p>
      </div>
    );
  }

  const creditUsagePercent = ((customer.outstandingAmount / customer.creditLimit) * 100).toFixed(1);

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/customers')}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{customer.establishmentName}</h1>
            <p className="text-muted-foreground mt-1">Customer ID: {customer._id}</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Edit Customer
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
              {customer.totalOrders}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
            <p className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">
              {formatCurrency(customer.totalRevenue)}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Revenue This Month</p>
            <p className="text-xl font-bold text-purple-600 dark:text-purple-400 mt-1">
              {formatCurrency(customer.revenueThisMonth)}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Outstanding</p>
            <p className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-1">
              {formatCurrency(customer.outstandingAmount)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Customer Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardContent className="p-5">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Phone size={20} className="text-blue-600" />
                Contact Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Contact Person</p>
                  <p className="font-semibold">{customer.contactName}</p>
                  <p className="text-xs text-muted-foreground">{customer.designation}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-400" />
                  <p className="text-sm">{customer.phoneNumber}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  <p className="text-sm break-all">{customer.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardContent className="p-5">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-green-600" />
                Address
              </h3>
              <p className="text-sm">
                {customer.address.street}<br />
                {customer.address.city}, {customer.address.state}<br />
                {customer.address.pincode}<br />
                {customer.address.country}
              </p>
            </CardContent>
          </Card>

          {/* Business Info */}
          <Card>
            <CardContent className="p-5">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Building2 size={20} className="text-purple-600" />
                Business Information
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Business Type</p>
                  <p className="font-semibold">{customer.businessType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">GSTIN</p>
                  <p className="font-semibold">{customer.gstin || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Drug License</p>
                  <p className="font-semibold">{customer.drugLicenseNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Orders & Bills */}
        <div className="lg:col-span-2 space-y-6">
          {/* Credit Status */}
          <Card>
            <CardContent className="p-5">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <CreditCard size={20} className="text-amber-600" />
                Credit Status
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Credit Limit</p>
                    <p className="text-xl font-bold">{formatCurrency(customer.creditLimit)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Outstanding</p>
                    <p className="text-xl font-bold text-amber-600">
                      {formatCurrency(customer.outstandingAmount)}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Credit Usage</span>
                    <span className="font-semibold">{creditUsagePercent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        creditUsagePercent > 90 ? 'bg-red-500' :
                        creditUsagePercent > 70 ? 'bg-amber-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(creditUsagePercent, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order History */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Package size={20} className="text-blue-600" />
                  Order History
                </h3>
                <button className="text-sm text-blue-600 hover:underline">
                  View All Orders
                </button>
              </div>
              
              {/* TODO: Replace with actual orders data */}
              <div className="text-center py-8 text-muted-foreground">
                <Package size={48} className="mx-auto mb-2 opacity-50" />
                <p>No orders to display</p>
                <p className="text-sm">Orders will appear here once placed</p>
              </div>
            </CardContent>
          </Card>

          {/* Bills/Invoices */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <FileText size={20} className="text-green-600" />
                  Recent Bills & Invoices
                </h3>
                <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2">
                  <Download size={16} />
                  Download All
                </button>
              </div>
              
              {/* TODO: Replace with actual bills data */}
              <div className="text-center py-8 text-muted-foreground">
                <FileText size={48} className="mx-auto mb-2 opacity-50" />
                <p>No invoices to display</p>
                <p className="text-sm">Invoices will appear here once generated</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailPage;
