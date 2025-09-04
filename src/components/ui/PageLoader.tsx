"use client";
import { useEffect, useState, ReactNode } from "react";
import dynamic from "next/dynamic";

// Dynamic imports to prevent hydration issues
const SimpleLoadingScreen = dynamic(() => import("@/components/ui/SimpleLoadingScreen"), {
  ssr: false
});
const AdvancedLoadingScreen = dynamic(() => import("@/components/ui/AdvancedLoadingScreen"), {
  ssr: false
});

interface PageLoaderProps {
  children: ReactNode;
  loadingType?: 'simple' | 'advanced';
  duration?: number;
  enabled?: boolean;
}

const PageLoader = ({ 
  children, 
  loadingType = 'advanced', 
  duration = 3500,
  enabled = true 
}: PageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(enabled);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Small delay to ensure smooth transition
    if (!isLoading && enabled) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 200);
      return () => clearTimeout(timer);
    } else if (!enabled) {
      setShowContent(true);
    }
  }, [isLoading, enabled]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // If loading is disabled, show content immediately
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        loadingType === 'simple' ? (
          <SimpleLoadingScreen 
            onComplete={handleLoadingComplete}
            duration={duration}
          />
        ) : (
          <AdvancedLoadingScreen 
            onComplete={handleLoadingComplete}
            duration={duration}
          />
        )
      )}
      
      {/* Page Content */}
      <div 
        style={{
          opacity: showContent ? 1 : 0,
          visibility: showContent ? 'visible' : 'hidden',
          transition: 'opacity 0.8s ease-in-out',
          position: isLoading ? 'absolute' : 'static',
          top: isLoading ? 0 : 'auto',
          left: isLoading ? 0 : 'auto',
          width: isLoading ? '100%' : 'auto',
          zIndex: isLoading ? -1 : 'auto'
        }}
      >
        {children}
      </div>
    </>
  );
};

export default PageLoader;