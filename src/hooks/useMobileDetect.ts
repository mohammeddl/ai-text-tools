"use client";
import { useState, useEffect } from 'react';

interface MobileDetectResult {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  userAgent: string;
}

export const useMobileDetect = (): MobileDetectResult => {
  const [mobileDetect, setMobileDetect] = useState<MobileDetectResult>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    userAgent: ''
  });

  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as unknown as { opera: string }).opera || '';
      
      
      // Tablet detection patterns
      const tabletPattern = /iPad|Android(?!.*Mobile)|Tablet|PlayBook|Silk/i;
      
      // More specific mobile patterns
      const mobileSpecific = /Mobile|iP(hone|od)|Android.*Mobile|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i;
      
      // Check screen size as additional criteria
      const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      
      // Determine if it's a mobile device
      const isMobileUA = mobileSpecific.test(userAgent);
      const isMobileScreen = screenWidth <= 768; // Mobile screen size threshold
      const isMobile = isMobileUA || isMobileScreen;
      
      // Determine if it's a tablet
      const isTabletUA = tabletPattern.test(userAgent) && !mobileSpecific.test(userAgent);
      const isTabletScreen = screenWidth > 768 && screenWidth <= 1024;
      const isTablet = isTabletUA || (isTabletScreen && !isMobile);
      
      // Desktop is everything else
      const isDesktop = !isMobile && !isTablet;
      
      setMobileDetect({
        isMobile,
        isTablet,
        isDesktop,
        userAgent
      });
    };

    // Initial detection
    detectDevice();

    // Listen for resize events to re-detect on screen size changes
    const handleResize = () => {
      detectDevice();
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return mobileDetect;
};

// Alternative hook that forces mobile detection based on screen size only
export const useScreenSizeDetect = (mobileBreakpoint: number = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      setIsMobile(width <= mobileBreakpoint);
    };

    // Initial check
    checkScreenSize();

    // Listen for resize events
    const handleResize = () => {
      checkScreenSize();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileBreakpoint]);

  return isMobile;
};