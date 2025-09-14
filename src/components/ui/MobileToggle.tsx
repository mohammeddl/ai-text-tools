"use client";
import { useState, useEffect } from 'react';

const MobileToggle = () => {
  const [showDesktop, setShowDesktop] = useState(false);

  useEffect(() => {
    const savedPreference = localStorage.getItem('showDesktopOnMobile');
    if (savedPreference === 'true') {
      setShowDesktop(true);
    }
  }, []);

  const toggleDesktop = () => {
    const newValue = !showDesktop;
    setShowDesktop(newValue);
    localStorage.setItem('showDesktopOnMobile', newValue.toString());
    window.location.reload(); // Reload to apply changes
  };

  if (typeof window === 'undefined') return null;

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 10000,
        display: window.innerWidth <= 768 ? 'block' : 'none'
      }}
    >
      <button
        onClick={toggleDesktop}
        style={{
          padding: '10px 15px',
          backgroundColor: showDesktop ? '#ef4444' : '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '12px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        }}
      >
        {showDesktop ? 'Show Coming Soon' : 'Try Desktop Version'}
      </button>
    </div>
  );
};

export default MobileToggle;