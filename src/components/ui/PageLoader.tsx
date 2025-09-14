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
const ModernLoadingScreen = dynamic(() => import("@/components/ui/ModernLoadingScreen"), {
  ssr: false
});
const StunningLoadingScreen = dynamic(() => import("@/components/ui/StunningLoadingScreen"), {
  ssr: false
});
const InteractiveLoadingScreen = dynamic(() => import("@/components/ui/InteractiveLoadingScreen"), {
  ssr: false
});
const MinimalLoadingScreen = dynamic(() => import("@/components/ui/MinimalLoadingScreen"), {
  ssr: false
});
const ElegantLoadingScreen = dynamic(() => import("@/components/ui/ElegantLoadingScreen"), {
  ssr: false
});
const AnimatedLoadingScreen = dynamic(() => import("@/components/ui/AnimatedLoadingScreen"), {
  ssr: false
});

interface PageLoaderProps {
  children: ReactNode;
  loadingType?: 'simple' | 'advanced' | 'modern' | 'stunning' | 'interactive' | 'minimal' | 'elegant' | 'animated';
  duration?: number;
  enabled?: boolean;
}

const PageLoader = ({ 
  children, 
  loadingType = 'animated', 
  duration = 4000,
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
        ) : loadingType === 'modern' ? (
          <ModernLoadingScreen 
            onComplete={handleLoadingComplete}
            duration={duration}
          />
        ) : loadingType === 'stunning' ? (
          <StunningLoadingScreen 
            onComplete={handleLoadingComplete}
            duration={duration}
          />
        ) : loadingType === 'interactive' ? (
          <InteractiveLoadingScreen 
            onComplete={handleLoadingComplete}
            duration={duration}
          />
        ) : loadingType === 'minimal' ? (
          <MinimalLoadingScreen 
            onComplete={handleLoadingComplete}
            duration={duration}
          />
        ) : loadingType === 'elegant' ? (
          <ElegantLoadingScreen 
            onComplete={handleLoadingComplete}
            duration={duration}
          />
        ) : loadingType === 'animated' ? (
          <AnimatedLoadingScreen 
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