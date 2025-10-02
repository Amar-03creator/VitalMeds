import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Building, 
  ShoppingCart, 
  Package,
  TrendingUp,
  Clock,
  Bell,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Plus
} from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.ownerName || user?.shopName}!
          </h1>
          <p className="text-muted-foreground">
            Manage your pharmaceutical operations from your personalized dashboard
          </p>
          
          {/* Status Badge */}
          <div className="mt-4">
            <Badge 
              variant={user?.status === 'Approved' ? 'default' : user?.status === 'Rejected' ? 'destructive' : 'secondary'}
              className="text-sm"
            >
              {user?.status === 'Pending Approval' && <Clock className="w-4 h-4 mr-1" />}
              {user?.status === 'Approved' && <CheckCircle className="w-4 h-4 mr-1" />}
              {user?.status === 'Rejected' && <AlertTriangle className="w-4 h-4 mr-1" />}
              Account Status: {user?.status}
            </Badge>
          </div>
        </div>

        {/* Status Message */}
        {user?.status === 'Pending Approval' && (
          <Card className="mb-8 border-amber-200 bg-amber-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">Account Under Review</h3>
                  <p className="text-amber-700 mb-3">
                    Your account is currently being reviewed by our admin team. You can browse products 
                    but cannot place orders until approval is complete.
                  </p>
                  <p className="text-sm text-amber-600">
                    Verification typically takes 24-48 hours. We'll notify you via email once your account is approved.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Inquiries</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <Package className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">₹0</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Notifications</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
                <Bell className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Browse Products */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2 text-blue-600" />
                Browse Products
              </CardTitle>
              <CardDescription>
                Explore our catalog of pharmaceutical products from trusted brands
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" variant="outline">
                View Catalog
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>

          {/* Create Inquiry */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2 text-green-600" />
                New Inquiry
              </CardTitle>
              <CardDescription>
                Submit a new inquiry for pharmaceutical products
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button 
                className="w-full" 
                disabled={user?.status !== 'Approved'}
                variant={user?.status === 'Approved' ? 'default' : 'outline'}
              >
                {user?.status === 'Approved' ? 'Create Inquiry' : 'Awaiting Approval'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>

          {/* My Orders */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2 text-purple-600" />
                My Orders
              </CardTitle>
              <CardDescription>
                View and track your order history and status
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" variant="outline">
                View Orders
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>

          {/* Account Settings */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="w-5 h-5 mr-2 text-indigo-600" />
                Account Settings
              </CardTitle>
              <CardDescription>
                Manage your business profile and verification documents
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Manage Account
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>

          {/* Support */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-orange-600" />
                Support
              </CardTitle>
              <CardDescription>
                Get help with orders, account issues, or general inquiries
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Contact Support
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>

          {/* Quick Reorder */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
                Quick Reorder
              </CardTitle>
              <CardDescription>
                Reorder frequently purchased items with one click
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button 
                className="w-full" 
                variant="outline"
                disabled={user?.status !== 'Approved'}
              >
                {user?.status === 'Approved' ? 'Quick Reorder' : 'Awaiting Approval'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest account activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-medium text-foreground">Account Created</p>
                  <p className="text-sm text-muted-foreground">
                    Welcome to VitalMEDS! Your account has been successfully created.
                  </p>
                </div>
              </div>
              
              {user?.status === 'Pending Approval' && (
                <div className="flex items-center space-x-4 p-4 bg-amber-50 rounded-lg">
                  <Clock className="w-6 h-6 text-amber-600" />
                  <div>
                    <p className="font-medium text-foreground">Verification in Progress</p>
                    <p className="text-sm text-muted-foreground">
                      Your documents are being reviewed by our admin team.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
