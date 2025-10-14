import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeProvider } from '@/contexts/ThemeProvider'
import { useTheme } from '@/contexts/useTheme'
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
      lightGradient: 'linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%)',
      darkGradient: 'linear-gradient(135deg, #9a3412 0%, #7c2d12 50%, #431407 100%)',
    },
    {
      type: 'bulk',
      title: 'Bulk Order Discounts',
      description: 'Special Rates for Orders Above ₹20,000',
      badge: 'Bulk Savings',
      cta: 'Send Inquiry Now',
      lightGradient: 'linear-gradient(135deg, #c084fc 0%, #a855f7 50%, #9333ea 100%)',
      darkGradient: 'linear-gradient(135deg, #6b21a8 0%, #581c87 50%, #3b0764 100%)',
    },
    {
      type: 'companies',
      title: 'Our Trusted Partners',
      description: 'Explore products from 4 verified pharmaceutical companies',
      badge: 'Company Gallery',
      cta: null,
      lightGradient: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)',
      darkGradient: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #1e293b 100%)',
      showCompanies: true,
    },
    {
      type: 'categories',
      title: 'Therapeutic Categories',
      description: 'Browse by specialized treatment areas',
      badge: 'Categories',
      cta: null,
      lightGradient: 'linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%)',
      darkGradient: 'linear-gradient(135deg, #15803d 0%, #166534 50%, #14532d 100%)',
      showCategories: true,
      categories: ['Cardiac Range', 'Diabetic Care', 'Pain Management'],
    },
    {
      type: 'ordering',
      title: 'Ordering Process',
      description: 'Simple 3-step process to place your order',
      badge: 'How To',
      cta: 'Learn Process',
      lightGradient: 'linear-gradient(135deg, #2dd4bf 0%, #14b8a6 50%, #0d9488 100%)',
      darkGradient: 'linear-gradient(135deg, #0f766e 0%, #115e59 50%, #134e4a 100%)',
    },
    {
      type: 'support',
      title: 'Customer Support',
      description: '8 AM to 9 PM Pharmacist Support Available',
      badge: 'Support',
      cta: 'Contact Support',
      lightGradient: 'linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #db2777 100%)',
      darkGradient: 'linear-gradient(135deg, #9f1239 0%, #881337 50%, #4c0519 100%)',
    },
    {
      type: 'credit',
      title: 'Credit Terms',
      description: 'Flexible Payment Options Available',
      badge: 'Payment',
      cta: 'Know More',
      lightGradient: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #7c3aed 100%)',
      darkGradient: 'linear-gradient(135deg, #6d28d9 0%, #5b21b6 50%, #4c1d95 100%)',
    },
    {
      type: 'notice',
      title: 'Important Notice',
      description: 'Updated delivery schedule for Diwali holidays - Oct 30-Nov 5',
      badge: 'Alert',
      cta: 'Read More',
      lightGradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
      darkGradient: 'linear-gradient(135deg, #b45309 0%, #92400e 50%, #78350f 100%)',
    },
  ];

  // Auto-play carousel - 4 seconds
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
              className="w-full flex-shrink-0 text-white relative"
              style={{
                background: isDark ? slide.darkGradient : slide.lightGradient,
              }}
            >
              <div className="p-8 lg:p-12">
                <div className="max-w-4xl mx-auto">
                  <Badge
                    variant="secondary"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      border: '1px solid',
                    }}
                    className="mb-4"
                  >
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
                        const [isHovered, setIsHovered] = React.useState(false);
                        return (
                          <div
                            key={company}
                            className="rounded-lg p-6 flex items-center justify-center cursor-pointer transition-all"
                            style={{
                              backgroundColor: isHovered
                                ? 'rgba(255, 255, 255, 0.3)'
                                : 'rgba(255, 255, 255, 0.2)',
                              backdropFilter: 'blur(10px)',
                            }}
                            onClick={() => handleCompanyClick(company - 1)}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                          >
                            <Building
                              className="w-12 h-12 transition-opacity"
                              style={{
                                color: '#ffffff',
                                opacity: isHovered ? 1 : 0.8,
                              }}
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
                        const [isHovered, setIsHovered] = React.useState(false);
                        return (
                          <div
                            key={idx}
                            className="rounded-lg p-4 text-center cursor-pointer transition-all"
                            style={{
                              backgroundColor: isHovered
                                ? 'rgba(255, 255, 255, 0.3)'
                                : 'rgba(255, 255, 255, 0.2)',
                              backdropFilter: 'blur(10px)',
                            }}
                            onClick={() => handleCategoryClick(category)}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                          >
                            <Grid3X3
                              className="w-8 h-8 mx-auto mb-2 transition-opacity"
                              style={{
                                color: '#ffffff',
                                opacity: isHovered ? 1 : 0.8,
                              }}
                            />
                            <p className="font-medium text-sm">{category}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* CTA Button */}
                  {slide.cta && (
                    <Button
                      variant="secondary"
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#111827',
                      }}
                      className="hover:bg-gray-100"
                    >
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
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
            }}
            className="hover:bg-white/30"
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
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
            }}
            className="hover:bg-white/30"
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
                index === currentSlide ? 'w-8 h-2' : 'w-2 h-2'
              }`}
              style={{
                backgroundColor:
                  index === currentSlide
                    ? '#ffffff'
                    : 'rgba(255, 255, 255, 0.5)',
              }}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CarouselSlider;