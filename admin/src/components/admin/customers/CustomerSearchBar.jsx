import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const CustomerSearchBar = ({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  selectedStatus,
  setSelectedStatus,
  selectedBusinessType,
  setSelectedBusinessType,
  sortBy,
  setSortBy,
  cities,
  onReset,
  setPage
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="pl-10 h-9"
            />
          </div>

          {/* City Filter */}
          <Select 
            value={selectedCity} 
            onValueChange={(val) => {
              setSelectedCity(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city === 'all' ? 'All Cities' : city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select 
            value={selectedStatus} 
            onValueChange={(val) => {
              setSelectedStatus(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Credit Alert">Credit Alert</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>

          {/* Business Type Filter */}
          <Select 
            value={selectedBusinessType} 
            onValueChange={(val) => {
              setSelectedBusinessType(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Retail Pharmacy">Retail Pharmacy</SelectItem>
              <SelectItem value="Hospital">Hospital</SelectItem>
              <SelectItem value="Clinic">Clinic</SelectItem>
              <SelectItem value="Distributor">Distributor</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort By */}
          <Select 
            value={sortBy} 
            onValueChange={(val) => {
              setSortBy(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="due-high">Highest Due</SelectItem>
              <SelectItem value="due-low">Lowest Due</SelectItem>
              <SelectItem value="orders-high">Most Orders</SelectItem>
              <SelectItem value="orders-low">Least Orders</SelectItem>
              <SelectItem value="orders-month-high">Most Orders (Month)</SelectItem>
              <SelectItem value="orders-month-low">Least Orders (Month)</SelectItem>
              <SelectItem value="revenue-high">Highest Revenue</SelectItem>
              <SelectItem value="revenue-low">Lowest Revenue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reset Button */}
        <div className="mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="h-8"
          >
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerSearchBar;
