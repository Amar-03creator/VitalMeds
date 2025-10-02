import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  ShoppingCart, 
  Users, 
  Shield, 
  Truck, 
  HeartHandshake,
  ArrowRight,
  CheckCircle,
  Award,
  FileCheck,
  Star,
  Clock,
  UserCheck
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Navigation */}
      <header className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">VitalMEDS</h1>
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <Building className="w-4 h-4 mr-2" />
              B2B Pharmaceutical Platform
            </Badge>
            
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
              Welcome to{' '}
              <span className="text-primary">VitalMEDS</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Your premier destination for authentic pharmaceutical products. Direct access to 
              quality medicines from a trusted, verified distributor with complete transparency and reliability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register">
                <Button size="lg" className="px-8 py-3 text-lg">
                  <Users className="w-5 h-5 mr-2" />
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              
              <Link to="/login">
                <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted Companies Section - UPDATED */}
      <div className="max-w-7xl mx-auto px-4 py-16 bg-white/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Trusted Pharmaceutical Companies
          </h2>
          <p className="text-lg text-muted-foreground">
            We partner with 3-4 premium pharmaceutical companies to ensure quality and authenticity
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {/* Company placeholders - replace with actual logos */}
          <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Building className="w-8 h-8 text-blue-600" />
              </div>
              <p className="font-semibold text-sm text-muted-foreground">Company A</p>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <HeartHandshake className="w-8 h-8 text-green-600" />
              </div>
              <p className="font-semibold text-sm text-muted-foreground">Company B</p>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <p className="font-semibold text-sm text-muted-foreground">Company C</p>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <p className="font-semibold text-sm text-muted-foreground">Company D</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section - UPDATED */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-4">
              <Clock className="w-4 h-4 mr-2" />
              Our Story
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              About VitalMEDS
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                With over <strong className="text-foreground">25 years of experience</strong> in the pharmaceutical industry, 
                our journey began with deep involvement in healthcare operations, building meaningful relationships with 
                healthcare professionals and developing a comprehensive understanding of the critical needs of the medical community.
              </p>
              <p>
                In <strong className="text-foreground">2021</strong>, leveraging decades of industry expertise and trusted 
                relationships, we founded VitalMEDS to bridge the gap between pharmaceutical manufacturers 
                and healthcare establishments through a reliable, transparent distribution network.
              </p>
              <p>
                Today, we stand as a trusted distributor committed to ensuring authentic medicines reach 
                the right hands, with complete transparency, competitive pricing, and unwavering quality standards.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary mb-1">25+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary mb-1">2021</div>
                <div className="text-sm text-muted-foreground">Company Founded</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-white shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Industry Expertise</h3>
                  <p className="text-sm text-muted-foreground">
                    Deep understanding of pharmaceutical operations from 25+ years of industry experience
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Trusted Network</h3>
                  <p className="text-sm text-muted-foreground">
                    Built on decades of trust and authentic relationships with healthcare professionals
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Quality Commitment</h3>
                  <p className="text-sm text-muted-foreground">
                    Unwavering dedication to authentic medicines and transparent business practices
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Why Choose VitalMEDS?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built specifically for pharmaceutical businesses with features that matter most to your operations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
            <CardHeader>
              <Award className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>Trusted Distributor</CardTitle>
              <CardDescription>
                Direct partnership with a single, verified pharmaceutical distributor ensuring 
                authentic products and consistent quality standards.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
            <CardHeader>
              <Truck className="w-12 h-12 text-green-600 mb-4" />
              <CardTitle>Reliable Supply Chain</CardTitle>
              <CardDescription>
                Streamlined ordering process with direct inventory access and dependable 
                delivery schedules for your pharmaceutical needs.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
            <CardHeader>
              <FileCheck className="w-12 h-12 text-purple-600 mb-4" />
              <CardTitle>Complete Transparency</CardTitle>
              <CardDescription>
                Full verification system where both parties can verify each other's 
                GSTIN, Drug License, and other credentials for secure transactions.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Main Action Card - Client Portal */}
        <div className="max-w-2xl mx-auto">
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Client Portal</CardTitle>
                <ShoppingCart className="w-8 h-8 text-green-600" />
              </div>
              <CardDescription className="text-base">
                Browse our extensive medicine catalog, submit inquiries, and manage your orders.
              </CardDescription>
            </CardHeader>
            
            <div className="px-6 pb-4">
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Access to 3-4 premium pharmaceutical companies
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Submit inquiries and get instant quotes
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Track your order history and delivery status
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Verification via GSTIN + Drug License OR Aadhaar + PAN
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  View distributor's credentials for transparency
                </div>
              </div>
            </div>

            <CardFooter className="pt-0">
              <Link to="/login" className="w-full">
                <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                  <Users className="w-5 h-5 mr-2" />
                  Get Started Today
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-primary mb-2">VitalMEDS</h3>
              <p className="text-sm text-muted-foreground">
                Your trusted pharmaceutical distribution partner since 2021
              </p>
            </div>
            <div className="flex gap-6">
              <Link to="/login" className="text-sm text-muted-foreground hover:text-primary">
                Sign In
              </Link>
              <Link to="/register" className="text-sm text-muted-foreground hover:text-primary">
                Register
              </Link>
              <button className="text-sm text-muted-foreground hover:text-primary">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
