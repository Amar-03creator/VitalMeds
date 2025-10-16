// src/components/client/dashboard/CarouselSlider.jsx
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/useTheme';
import {
  ChevronLeft,
  ChevronRight,
  Building,
  Grid3X3,
  Send,
  Zap,
  ArrowRight,
} from 'lucide-react';

const CarouselSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme } = useTheme();

  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const carouselSlides = [
    {
      type: 'instant-payment',
      title: 'Special Discount on Instant Payment',
      description: 'Get up to 10% extra discount on immediate payments',
      badge: 'Limited Offer',
      cta: 'View All Products',
      gradientLight: 'from-orange-400 via-orange-500 to-orange-600',
      gradientDark: 'from-orange-900 via-orange-950 to-orange-950',
    },
    {
      type: 'bulk',
      title: 'Bulk Order Discounts',
      description: 'Special Rates for Orders Above ₹20,000',
      badge: 'Bulk Savings',
      cta: 'Send Inquiry Now',
      gradientLight: 'from-purple-400 via-purple-500 to-purple-600',
      gradientDark: 'from-purple-900 via-purple-950 to-purple-950',
    },
    {
      type: 'companies',
      title: 'Our Trusted Partners',
      description: 'Explore products from 4 verified pharmaceutical companies',
      badge: 'Company Gallery',
      cta: null,
      gradientLight: 'from-blue-400 via-blue-500 to-blue-600',
      gradientDark: 'from-blue-900 via-blue-950 to-gray-900',
      showCompanies: true,
    },
    {
      type: 'categories',
      title: 'Therapeutic Categories',
      description: 'Browse by specialized treatment areas',
      badge: 'Categories',
      cta: null,
      gradientLight: 'from-green-400 via-green-500 to-green-600',
      gradientDark: 'from-green-900 via-green-950 to-green-950',
      showCategories: true,
      categories: ['Cardiac Range', 'Diabetic Care', 'Pain Management'],
    },
    {
      type: 'ordering',
      title: 'Ordering Process',
      description: 'Simple 3-step process to place your order',
      badge: 'How To',
      cta: 'Learn Process',
      gradientLight: 'from-teal-400 via-teal-500 to-teal-600',
      gradientDark: 'from-teal-900 via-teal-950 to-teal-950',
    },
    {
      type: 'support',
      title: 'Customer Support',
      description: '8 AM to 9 PM Pharmacist Support Available',
      badge: 'Support',
      cta: 'Contact Support',
      gradientLight: 'from-pink-400 via-pink-500 to-pink-600',
      gradientDark: 'from-pink-900 via-pink-950 to-pink-950',
    },
    {
      type: 'credit',
      title: 'Credit Terms',
      description: 'Flexible Payment Options Available',
      badge: 'Payment',
      cta: 'Know More',
      gradientLight: 'from-violet-400 via-violet-500 to-violet-600',
      gradientDark: 'from-violet-900 via-violet-950 to-violet-950',
    },
    {
      type: 'notice',
      title: 'Important Notice',
      description: 'Updated delivery schedule for Diwali holidays - Oct 30-Nov 5',
      badge: 'Alert',
      cta: 'Read More',
      gradientLight: 'from-yellow-400 via-yellow-500 to-yellow-600',
      gradientDark: 'from-yellow-900 via-yellow-950 to-yellow-950',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselSlides.length]);

  const handleCompanyClick = (companyIndex) => {
    console.log(`Navigate to company ${companyIndex + 1} products`);
  };

  const handleCategoryClick = (category) => {
    console.log(`Navigate to ${category} products`);
  };

  return (
    <Card className="overflow-hidden shadow-lg">
      <div className="relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselSlides.map((slide, index) => (
            <div
              key={index}
              className={`w-full flex-shrink-0 text-white bg-gradient-to-r ${
                isDark ? slide.gradientDark : slide.gradientLight
              }`}
            >
              <div className="p-8 lg:p-12">
                <div className="max-w-4xl mx-auto">
                  <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/25">
                    {slide.badge}
                  </Badge>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-3">
                    {slide.title}
                  </h3>
                  <p className="text-lg opacity-90 mb-6">{slide.description}</p>

                  {/* Company Grid */}
                  {slide.showCompanies && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {[1, 2, 3, 4].map((company) => {
                        const [isHovered, setIsHovered] = useState(false);
                        return (
                          <div
                            key={company}
                            className={`rounded-lg p-6 flex items-center justify-center cursor-pointer transition-all backdrop-blur ${
                              isHovered ? 'bg-white/30' : 'bg-white/20'
                            }`}
                            onClick={() => handleCompanyClick(company - 1)}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                          >
                            <Building
                              className={`w-12 h-12 text-white transition-opacity ${
                                isHovered ? 'opacity-100' : 'opacity-80'
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Categories */}
                  {slide.showCategories && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {slide.categories.map((category, idx) => {
                        const [isHovered, setIsHovered] = useState(false);
                        return (
                          <div
                            key={idx}
                            className={`rounded-lg p-4 text-center cursor-pointer transition-all backdrop-blur ${
                              isHovered ? 'bg-white/30' : 'bg-white/20'
                            }`}
                            onClick={() => handleCategoryClick(category)}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                          >
                            <Grid3X3
                              className={`w-8 h-8 mx-auto mb-2 text-white transition-opacity ${
                                isHovered ? 'opacity-100' : 'opacity-80'
                              }`}
                            />
                            <p className="font-medium text-sm">{category}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* CTA Button */}
                  {slide.cta && (
                    <Button className="bg-white text-gray-900 hover:bg-gray-100">
                      {slide.type === 'bulk' && (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      {slide.type === 'instant-payment' && (
                        <Zap className="w-4 h-4 mr-2" />
                      )}
                      {slide.cta}
                      {!['bulk', 'instant-payment'].includes(slide.type) && (
                        <ArrowRight className="w-4 h-4 ml-2" />
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="absolute inset-y-0 left-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setCurrentSlide(
                (prev) =>
                  (prev - 1 + carouselSlides.length) % carouselSlides.length
              )
            }
            className="bg-white/20 text-white hover:bg-white/30"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </div>
        <div className="absolute inset-y-0 right-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
            }
            className="bg-white/20 text-white hover:bg-white/30"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all ${
                index === currentSlide
                  ? 'w-8 h-2 bg-white'
                  : 'w-2 h-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CarouselSlider;