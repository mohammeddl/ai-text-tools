"use client";
import { useEffect, useState } from 'react';
import { useScreenSizeDetect } from '@/hooks/useMobileDetect';
import MobileComingSoon from '@/components/ui/MobileComingSoon';
import MobileToggle from '@/components/ui/MobileToggle';
import '@/styles/mobile-coming-soon.css';

interface MobileWrapperProps {
  children: React.ReactNode;
}

const MobileWrapper: React.FC<MobileWrapperProps> = ({ children }) => {
  const isMobile = useScreenSizeDetect(768); // Show coming soon for screens <= 768px
  const [showMobileView, setShowMobileView] = useState(false);
  const [forceDesktop, setForceDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    // Check if user has chosen to force desktop view on mobile
    const savedPreference = localStorage.getItem('showDesktopOnMobile');
    if (savedPreference === 'true') {
      setForceDesktop(true);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      setShowMobileView(isMobile && !forceDesktop);
    }
  }, [isMobile, forceDesktop, mounted]);

  // Show loading or placeholder during initial render to prevent hydration issues
  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Loading...</div>
      </div>
    );
  }

  // Show mobile coming soon page for mobile devices (unless forced to desktop)
  if (showMobileView) {
    return <MobileComingSoon />;
  }

  // Show normal desktop content for desktop devices or forced desktop on mobile
  return (
    <>
      {children}
      <MobileToggle />
    </>
  );
};

export default MobileWrapper;