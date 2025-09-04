"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamic imports to prevent hydration issues
const SimpleLoadingScreen = dynamic(() => import("@/components/ui/SimpleLoadingScreen"), {
  ssr: false
});
const AdvancedLoadingScreen = dynamic(() => import("@/components/ui/AdvancedLoadingScreen"), {
  ssr: false
});

const LoadingDemoPage = () => {
  const [activeDemo, setActiveDemo] = useState<'simple' | 'advanced' | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const startDemo = (type: 'simple' | 'advanced') => {
    setActiveDemo(type);
  };

  const handleLoadingComplete = () => {
    setActiveDemo(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ 
          textAlign: 'center', 
          color: '#333',
          marginBottom: '3rem',
          fontSize: '2.5rem',
          fontWeight: '700'
        }}>
          Loading Screen Demo
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Simple Loading Card */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>Simple Loading</h3>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              Clean and minimal loading screen with CSS animations
            </p>
            <button
              onClick={() => startDemo('simple')}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
            >
              Try Simple Loading
            </button>
          </div>

          {/* Advanced Loading Card */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>Advanced Loading</h3>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              Premium loading screen with morphing backgrounds and advanced animations
            </p>
            <button
              onClick={() => startDemo('advanced')}
              style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
            >
              Try Advanced Loading
            </button>
          </div>
        </div>

        {/* Features List */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#333', marginBottom: '1.5rem' }}>Loading Screen Features</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div>
              <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Simple Loading</h4>
              <ul style={{ color: '#666', lineHeight: '1.6' }}>
                <li>✨ Smooth CSS animations</li>
                <li>🎯 Lightweight and fast</li>
                <li>📱 Mobile responsive</li>
                <li>🎨 Customizable colors</li>
                <li>⚡ Progress tracking</li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#f093fb', marginBottom: '0.5rem' }}>Advanced Loading</h4>
              <ul style={{ color: '#666', lineHeight: '1.6' }}>
                <li>🌟 Morphing backgrounds</li>
                <li>✨ Advanced particle system</li>
                <li>🎭 Multiple animation phases</li>
                <li>📊 Circular progress indicator</li>
                <li>🏷️ Loading stage indicators</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Render active loading screen */}
      {isClient && activeDemo === 'simple' && (
        <SimpleLoadingScreen onComplete={handleLoadingComplete} duration={3000} />
      )}
      {isClient && activeDemo === 'advanced' && (
        <AdvancedLoadingScreen onComplete={handleLoadingComplete} duration={3500} />
      )}
    </div>
  );
};

export default LoadingDemoPage;