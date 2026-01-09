// src/components/client/dashboard/CarousalSlider.jsx

import React, { useState, useEffect } from "react";
import api from '@/services/api' // Centralized API instance (handles base URL + auth token automatically)
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/contexts/useTheme";
import { useNavigate } from "react-router-dom"; // For programmatic navigation
import {
  ChevronLeft,
  ChevronRight,
  Building,
  Grid3X3,
} from 'lucide-react';

const CarousalSlider = () => {
  
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  
  // Track which slide is currently visible (0 = first slide)
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Track if user is hovering (pauses auto-slide)
  const [isHovered, setIsHovered] = useState(false);
  
  // Store companies fetched from backend API
  const [companies, setCompanies] = useState([]);
  
  // Store categories fetched from backend API
  const [categories, setCategories] = useState([]);
  
  // Track loading state (true while fetching data)
  const [loading, setLoading] = useState(true);

  // ============================================
  // HOOKS & UTILITIES
  // ============================================
  
  const navigate = useNavigate(); // Function to navigate to different routes
  const { theme } = useTheme(); // Get current theme (light/dark/system)

  // Check if dark mode is active
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia("(prefers-color-scheme: dark)").matches);

  // ============================================
  // SLIDE CONFIGURATION
  // ============================================
  
  // Array of slide objects - each slide has its own content and style
  const carousalSlides = [
    {
      type: 'instant-payment', // Unique identifier for this slide
      title: 'Special Discount on Instant Payment',
      description: 'Get up to 10% extra discount on immediate payments',
      badge: 'Limited Offer',
      cta: 'View All Products', // Call-to-action button text
      gradientLight: 'from-orange-400 via-orange-500 to-orange-600', // Light mode gradient
      gradientDark: 'from-orange-900 via-orange-950 to-orange-950', // Dark mode gradient
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
      description: 'Explore products from verified pharmaceutical companies',
      badge: 'Company Gallery',
      cta: null, // No button for this slide
      gradientLight: 'from-blue-400 via-blue-500 to-blue-600',
      gradientDark: 'from-blue-900 via-blue-950 to-gray-900',
      showCompanies: true, // Flag: show company grid on this slide
    },
    {
      type: 'categories',
      title: 'Therapeutic Categories',
      description: 'Browse by specialized treatment areas',
      badge: 'Categories',
      cta: null,
      gradientLight: 'from-green-400 via-green-500 to-green-600',
      gradientDark: 'from-green-900 via-green-950 to-green-950',
      showCategories: true, // Flag: show category grid on this slide
    },
    {
      type: 'ordering',
      title: 'Ordering Process',
      description: 'Simple 3-step process to place your order',
      badge: 'How To Order',
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
      description: 'Updated delivery schedule for upcoming holidays',
      badge: 'Alert',
      cta: 'Read More',
      gradientLight: 'from-yellow-400 via-yellow-500 to-yellow-600',
      gradientDark: 'from-yellow-900 via-yellow-950 to-yellow-950',
    },
  ];

  // ============================================
  // AUTO-SLIDE EFFECT (with hover pause)
  // ============================================
  
  useEffect(() => {
    // Only run auto-slide if user is NOT hovering
    if (!isHovered) {
      // Create a timer that runs every 4 seconds
      const timer = setInterval(() => {
        // Move to next slide (wraps back to 0 after last slide)
        setCurrentSlide((prev) => (prev + 1) % carousalSlides.length);
      }, 4000);

      // Cleanup: Clear the timer when component unmounts or when dependencies change
      // This prevents memory leaks
      return () => clearInterval(timer);
    }
  }, [carousalSlides.length, isHovered]); // Re-run effect if slide count or hover state changes

  // ============================================
  // FETCH COMPANIES & CATEGORIES FROM API
  // ============================================
  
  useEffect(() => {
    // Define async function inside useEffect (can't make useEffect itself async)
    const fetchData = async () => {
      try {
        // Start loading state
        setLoading(true);

        // API call using our centralized api instance
        // - No need to add base URL (handled by api.js)
        // - No need to add auth token (handled by interceptor)
        // - No need to call .json() (axios does it automatically)
        const response = await api.get('/products/filters/metadata');

        // Check if API returned success
        if (response.data.success) {
          // Extract and save companies array
          setCompanies(response.data.data.companies);
          
          // Extract and save categories array
          setCategories(response.data.data.categories);
        }
      } catch (e) {
        // Error handling with detailed logging
        console.error('❌ Error fetching filters:', e.message);
        console.error('❌ Status code:', e.response?.status); // HTTP status (401, 404, 500, etc.)
        console.error('❌ Server message:', e.response?.data); // Server's error response
      } finally {
        // Always stop loading, whether success or error
        setLoading(false);
      }
    }
    
    // Call the async function
    fetchData();
  }, []); // Empty dependency array = run only once on component mount

  // ============================================
  // HANDLE CTA BUTTON CLICKS
  // ============================================
  
  const handleCtaClick = (slideType) => {
    // Navigate to different routes based on slide type
    if (slideType === 'instant-payment') {
      navigate('/products');
    } else if (slideType === 'bulk') {
      navigate('/inquiry');
    } else if (slideType === 'ordering') {
      navigate('/orderingGuide');
    } else if (slideType === 'credit') {
      navigate('/creditTerms');
    }
    // Add more routes as needed
  };

  // ============================================
  // RENDER COMPONENT
  // ============================================

  return (
    <Card 
      className="overflow-hidden shadow-lg" 
      onMouseEnter={() => setIsHovered(true)}  // Pause auto-slide when mouse enters
      onMouseLeave={() => setIsHovered(false)} // Resume auto-slide when mouse leaves
    >
      <div className="relative">
        {/* Slide Container - moves left/right using transform */}
        <div 
          className="flex transition-transform duration-500 ease-in-out" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          // Example: currentSlide=0 → translateX(0%), currentSlide=1 → translateX(-100%)
        >
          {
            // Loop through each slide and render it
            carousalSlides.map((slide, index) => (
              <div 
                key={index} 
                className={`w-full flex-shrink-0 text-white bg-gradient-to-r ${isDark ? slide.gradientDark : slide.gradientLight}`}
                // Each slide takes full width (w-full) and doesn't shrink (flex-shrink-0)
              >
                <div className="p-4 lg:p-6 h-full">
                  <div className="max-w-4xl mx-auto flex flex-col h-full">
                    
                    {/* Slide Badge */}
                    <Badge className="mb-2 max-w-fit bg-white/20 text-white border-white/30 hover:bg-white/25">
                      {slide.badge}
                    </Badge>
                    
                    {/* Slide Title */}
                    <h2 className="text-xl lg:text-2xl font-bold mb-1">{slide.title}</h2>
                    
                    {/* Slide Description */}
                    <p className="text-lg opacity-90 mb-3">{slide.description}</p>

                    {/* ==================== COMPANIES GRID ==================== */}
                    {/* Only show if: 1) slide has showCompanies flag, AND 2) companies data exists */}
                    {slide.showCompanies && companies.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {companies.map((companyName) => (
                          // Each company card - clickable, navigates to filtered products page
                          <div 
                            key={companyName} // Use company name as unique key
                            className="rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all backdrop-blur bg-white/20 hover:bg-white/30" 
                            onClick={() => navigate(`/products?company=${companyName}`)}
                            // Navigate with query parameter to filter by company
                          >
                            <Building className="w-12 h-12 text-white mb-2" />
                            <p className="font-medium text-xs text-center">{companyName}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ==================== CATEGORIES GRID ==================== */}
                    {/* Only show if: 1) slide has showCategories flag, AND 2) categories data exists */}
                    {slide.showCategories && categories.length > 0 && (
                      <div className="grid grid-cols-4 md:grid-cols-10 gap-2 mb-2">
                        {categories.map((categoryName) => (
                          // Each category card - clickable, navigates to filtered products page
                          <div 
                            key={categoryName} // Use category name as unique key
                            className="rounded-lg p-2 flex flex-col items-center justify-evenly cursor-pointer transition-all backdrop-blur bg-white/20 hover:bg-white/30" 
                            onClick={() => navigate(`/products?category=${categoryName}`)}
                            // Navigate with query parameter to filter by category
                          >
                            <Grid3X3 className="w-8 h-8 text-white mb-2" />
                            <p className="font-semibold text-xs break-all md:break-normal p-0 text-center">{categoryName}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ==================== CTA BUTTON ==================== */}
                    {/* Only show button if slide has a cta property */}
                    {slide.cta && (
                      <Button 
                        className="bg-white mt-auto text-gray-900 hover:bg-gray-100" 
                        onClick={() => handleCtaClick(slide.type)}
                      >
                        {slide.cta}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        {/* ==================== NAVIGATION ARROWS ==================== */}
        
        {/* Left Arrow - Go to Previous Slide */}
        <div className="absolute inset-y-0 left-4 flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCurrentSlide((prev) => (prev - 1 + carousalSlides.length) % carousalSlides.length)}
            // Example: If currentSlide=0, go to last slide (7)
            // Formula: (0 - 1 + 8) % 8 = 7
            className="bg-white/20 text-white hover:bg-white/30"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </div>

        {/* Right Arrow - Go to Next Slide */}
        <div className="absolute inset-y-0 right-4 flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % carousalSlides.length)}
            // Example: If currentSlide=7 (last), go to slide 0 (first)
            // Formula: (7 + 1) % 8 = 0
            className="bg-white/20 text-white hover:bg-white/30"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default CarousalSlider;
