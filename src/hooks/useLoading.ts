"use client";
import { useState, useEffect } from 'react';

interface UseLoadingOptions {
  minDuration?: number;
  maxDuration?: number;
  autoStart?: boolean;
}

export const useLoading = (options: UseLoadingOptions = {}) => {
  const {
    minDuration = 2000,
    maxDuration = 4000,
    autoStart = true
  } = options;

  const [isLoading, setIsLoading] = useState(autoStart);
  const [progress, setProgress] = useState(0);

  const startLoading = () => {
    setIsLoading(true);
    setProgress(0);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isLoading) return;

    const startTime = Date.now();
    const duration = Math.min(minDuration + Math.random() * (maxDuration - minDuration), maxDuration);

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 500); // Small delay for smooth transition
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [isLoading, minDuration, maxDuration]);

  return {
    isLoading,
    progress: Math.round(progress),
    startLoading,
    stopLoading
  };
};