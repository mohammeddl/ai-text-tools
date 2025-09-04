export interface LoadingConfig {
  enabled: boolean;
  type: 'simple' | 'advanced';
  duration: number;
  minDuration: number;
  showOnlyOnFirstVisit: boolean;
}

export const loadingConfig: LoadingConfig = {
  enabled: true,
  type: 'advanced', // 'simple' or 'advanced'
  duration: 3500, // Duration in milliseconds
  minDuration: 2000, // Minimum loading time
  showOnlyOnFirstVisit: false // Set to true to show loading only on first visit
};

// Helper function to check if loading should be shown (client-side only)
export const shouldShowLoading = (): boolean => {
  // Only run on client side
  if (typeof window === 'undefined') return false;
  
  if (!loadingConfig.enabled) return false;
  
  if (loadingConfig.showOnlyOnFirstVisit) {
    try {
      const hasVisited = localStorage.getItem('hasVisited');
      if (hasVisited) return false;
      localStorage.setItem('hasVisited', 'true');
    } catch {
      // Handle cases where localStorage is not available
      console.warn('localStorage not available, showing loading screen');
    }
  }
  
  return true;
};