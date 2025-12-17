import React, { useState, useEffect } from 'react';
import { CustomerStats } from '@/components/admin/customers/CustomerStats';
import { CustomerSearchBar } from '@/components/admin/customers/CustomerSearchBar';
import { CustomerTable } from '@/components/admin/customers/CustomerTable';
import { CustomerPagination } from '@/components/admin/customers/CustomerPagination';
import api from '@/services/api';

const AllCustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeCustomers: 0,
    totalRevenue: 0,
    totalOutstanding: 0
  });

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedBusinessType, setSelectedBusinessType] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Dropdowns
  const [cities, setCities] = useState([]);

  // Fetch customers
  useEffect(() => {
    fetchCustomers();
  }, [searchQuery, selectedCity, selectedStatus, selectedBusinessType, sortBy, page]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const params = {
        search: searchQuery,
        city: selectedCity,
        status: selectedStatus,
        businessType: selectedBusinessType,
        sortBy,
        page,
        limit: 25
      };

      const response = await api.get('/admin/customers', { params });

      setCustomers(response.data.data);
      setStats(response.data.stats);
      setCities(response.data.filters.cities);
      setTotal(response.data.pagination.total);
      setTotalPages(response.data.pagination.pages);

      console.log('✅ Customers fetched:', response.data.data.length);
    } catch (error) {
      console.error('❌ Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCity('all');
    setSelectedStatus('all');
    setSelectedBusinessType('all');
    setSortBy('name-asc');
    setPage(1);
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">All Customers</h1>
        <p className="text-muted-foreground mt-1">
          Manage your pharmacy clients and track their activity
        </p>
      </div>

      {/* Stats */}
      <CustomerStats stats={stats} />

      {/* Search & Filters */}
      <CustomerSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedBusinessType={selectedBusinessType}
        setSelectedBusinessType={setSelectedBusinessType}
        sortBy={sortBy}
        setSortBy={setSortBy}
        cities={cities}
        onReset={handleReset}
        setPage={setPage}
      />

      {/* Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading customers...</p>
        </div>
      ) : (
        <>
          <CustomerTable
            customers={customers}
            onRefresh={fetchCustomers}
          />

          <CustomerPagination
            page={page}
            totalPages={totalPages}
            total={total}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default AllCustomersPage;
