"use client";
import { useEffect, useState, ReactNode } from "react";
import dynamic from "next/dynamic";

// Dynamic imports to prevent hydration issues
const AdvancedLoadingScreen = dynamic(() => import("@/components/ui/AdvancedLoadingScreen"), {
  ssr: false
});

interface AppLoaderProps {
  children: ReactNode;
}

const AppLoader = ({ children }: AppLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Ensure we show content smoothly after loading
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Global Loading Screen */}
      {isLoading && (
        <AdvancedLoadingScreen 
          onComplete={handleLoadingComplete}
          duration={3500}
        />
      )}
      
      {/* App Content */}
      <div 
        style={{
          opacity: showContent ? 1 : 0,
          visibility: showContent ? 'visible' : 'hidden',
          transition: 'opacity 0.8s ease-in-out',
        }}
      >
        {children}
      </div>
    </>
  );
};

export default AppLoader;