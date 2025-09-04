"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface AdvancedLoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const AdvancedLoadingScreen = ({ onComplete, duration = 3500 }: AdvancedLoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState<'entering' | 'loading' | 'exiting'>('entering');
  const [isClient, setIsClient] = useState(false);
  const [particleConfig, setParticleConfig] = useState<Array<{
    left: string;
    top: string;
    delay: string;
    duration: string;
    size: string;
  }>>([]);

  // Ensure client-side only rendering
  useEffect(() => {
    setIsClient(true);
    // Generate particle configurations only on client
    const configs = Array.from({ length: 25 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${i * 0.2}s`,
      duration: `${3 + Math.random() * 4}s`,
      size: `${2 + Math.random() * 4}px`
    }));
    setParticleConfig(configs);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    let animationFrame: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      // Smooth easing for progress
      const easedProgress = easeOutCubic(newProgress / 100) * 100;
      setProgress(easedProgress);

      if (newProgress < 100) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setLoadingPhase('exiting');
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 1000);
      }
    };

    // Start loading after entrance animation
    setTimeout(() => {
      setLoadingPhase('loading');
      animationFrame = requestAnimationFrame(animate);
    }, 800);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [duration, onComplete]);

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  return (
    <div 
      ref={containerRef}
      className={`advanced-loading-screen phase-${loadingPhase}`}
    >
      {/* Dynamic background with morphing shapes */}
      <div className="morphing-background">
        <div className="morph-shape morph-1"></div>
        <div className="morph-shape morph-2"></div>
        <div className="morph-shape morph-3"></div>
        <div className="morph-shape morph-4"></div>
      </div>

      {/* Floating particles system */}
      <div className="particles-system">
        {isClient && particleConfig.map((particle, i) => (
          <div 
            key={i} 
            className="advanced-particle"
            style={{
              '--delay': particle.delay,
              '--duration': particle.duration,
              '--size': particle.size,
              left: particle.left,
              top: particle.top
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="loading-main-content">
        {/* Logo with advanced animations */}
        <div className="advanced-logo-container">
          <div className="logo-glow-ring"></div>
          <div className="logo-wrapper">
            <Image
              src="/images/TextCrafterLogoWhite.png"
              alt="TextCrafter Logo"
              width={220}
              height={88}
              priority
              className="advanced-logo"
            />
          </div>
          <div className="logo-pulse-ring"></div>
        </div>

        {/* Animated loading text with typewriter effect */}
        <div className="advanced-loading-text">
          <span className="typewriter">
            {loadingPhase === 'loading' ? 'Crafting Amazing Tools' : 'Welcome to TextCrafter'}
          </span>
          <div className="cursor-blink">|</div>
        </div>

        {/* Advanced progress system */}
        <div className="advanced-progress-container">
          <div className="progress-ring">
            <svg className="progress-circle" width="120" height="120">
              <circle
                className="progress-circle-bg"
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="3"
              />
              <circle
                className="progress-circle-fill"
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                style={{
                  strokeDasharray: `${2 * Math.PI * 50}`,
                  strokeDashoffset: `${2 * Math.PI * 50 * (1 - progress / 100)}`,
                  transform: 'rotate(-90deg)',
                  transformOrigin: '60px 60px'
                }}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="50%" stopColor="#764ba2" />
                  <stop offset="100%" stopColor="#f093fb" />
                </linearGradient>
              </defs>
            </svg>
            <div className="progress-percentage">
              <span className="progress-number">{Math.round(progress)}</span>
              <span className="progress-symbol">%</span>
            </div>
          </div>

          {/* Linear progress bar as backup */}
          <div className="linear-progress">
            <div 
              className="linear-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Loading stages indicator */}
        <div className="loading-stages">
          <div className={`stage ${progress > 20 ? 'completed' : progress > 0 ? 'active' : ''}`}>
            Initializing
          </div>
          <div className={`stage ${progress > 60 ? 'completed' : progress > 20 ? 'active' : ''}`}>
            Loading Assets
          </div>
          <div className={`stage ${progress > 90 ? 'completed' : progress > 60 ? 'active' : ''}`}>
            Finalizing
          </div>
        </div>
      </div>

      <style jsx>{`
        .advanced-loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #0f0c29 0%, #24243e 50%, #313862 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .phase-entering {
          animation: screenEnter 0.8s ease-out;
        }

        .phase-exiting {
          animation: screenExit 1s ease-in-out forwards;
        }

        .morphing-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .morph-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.3;
        }

        .morph-1 {
          width: 300px;
          height: 300px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          top: -150px;
          left: -150px;
          animation: morphFloat1 8s ease-in-out infinite;
        }

        .morph-2 {
          width: 200px;
          height: 200px;
          background: linear-gradient(45deg, #f093fb, #f5576c);
          top: 20%;
          right: -100px;
          animation: morphFloat2 6s ease-in-out infinite;
        }

        .morph-3 {
          width: 250px;
          height: 250px;
          background: linear-gradient(45deg, #4facfe, #00f2fe);
          bottom: -125px;
          left: 50%;
          animation: morphFloat3 10s ease-in-out infinite;
        }

        .morph-4 {
          width: 180px;
          height: 180px;
          background: linear-gradient(45deg, #43e97b, #38f9d7);
          top: 60%;
          left: 10%;
          animation: morphFloat4 7s ease-in-out infinite;
        }

        .particles-system {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .advanced-particle {
          position: absolute;
          width: var(--size);
          height: var(--size);
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-radius: 50%;
          animation: advancedParticleFloat var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
        }

        .loading-main-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 10;
          text-align: center;
        }

        .advanced-logo-container {
          position: relative;
          margin-bottom: 3rem;
          animation: logoScale 0.8s ease-out 0.3s both;
        }

        .logo-glow-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 280px;
          height: 120px;
          border: 2px solid transparent;
          border-radius: 50px;
          background: linear-gradient(45deg, #667eea, #764ba2, #f093fb) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          animation: ringPulse 2s ease-in-out infinite;
        }

        .logo-wrapper {
          position: relative;
          filter: drop-shadow(0 15px 40px rgba(0, 0, 0, 0.4));
        }

        .advanced-logo {
          width: auto;
          height: auto;
          max-width: 220px;
          max-height: 88px;
          animation: logoFloat 3s ease-in-out infinite 1s;
        }

        .logo-pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 130px;
          border: 1px solid rgba(102, 126, 234, 0.3);
          border-radius: 65px;
          animation: pulseRing 3s ease-out infinite;
        }

        .advanced-loading-text {
          display: flex;
          align-items: center;
          margin-bottom: 3rem;
          animation: textFadeIn 0.8s ease-out 0.6s both;
        }

        .typewriter {
          color: white;
          font-size: 1.8rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          animation: textGlow 2s ease-in-out infinite alternate;
        }

        .cursor-blink {
          color: #667eea;
          font-size: 1.8rem;
          font-weight: 300;
          margin-left: 4px;
          animation: blink 1s step-end infinite;
        }

        .advanced-progress-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
          animation: progressFadeIn 0.8s ease-out 0.9s both;
        }

        .progress-ring {
          position: relative;
          margin-bottom: 2rem;
        }

        .progress-circle {
          transform: rotate(-90deg);
          filter: drop-shadow(0 0 10px rgba(102, 126, 234, 0.5));
        }

        .progress-circle-fill {
          transition: stroke-dashoffset 0.3s ease;
        }

        .progress-percentage {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: baseline;
        }

        .progress-number {
          color: white;
          font-size: 2rem;
          font-weight: 700;
          line-height: 1;
        }

        .progress-symbol {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.2rem;
          font-weight: 400;
          margin-left: 2px;
        }

        .linear-progress {
          width: 280px;
          height: 3px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 1.5px;
          overflow: hidden;
        }

        .linear-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
          border-radius: 1.5px;
          transition: width 0.3s ease;
          position: relative;
        }

        .linear-progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
          animation: progressShimmer 1.5s ease-in-out infinite;
        }

        .loading-stages {
          display: flex;
          gap: 2rem;
          animation: stagesFadeIn 0.8s ease-out 1.2s both;
        }

        .stage {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.9rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          position: relative;
        }

        .stage.active {
          color: #667eea;
          text-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
        }

        .stage.completed {
          color: #43e97b;
          text-shadow: 0 0 10px rgba(67, 233, 123, 0.5);
        }

        .stage.completed::after {
          content: '✓';
          position: absolute;
          right: -15px;
          top: 0;
        }

        /* Animations */
        @keyframes screenEnter {
          from {
            opacity: 0;
            transform: scale(1.1);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes screenExit {
          to {
            opacity: 0;
            transform: scale(0.95);
          }
        }

        @keyframes morphFloat1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, -30px) rotate(90deg); }
          50% { transform: translate(-10px, -20px) rotate(180deg); }
          75% { transform: translate(-30px, 10px) rotate(270deg); }
        }

        @keyframes morphFloat2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-25px, 20px) rotate(120deg); }
          66% { transform: translate(15px, -25px) rotate(240deg); }
        }

        @keyframes morphFloat3 {
          0%, 100% { transform: translate(-50%, 0) rotate(0deg); }
          50% { transform: translate(-50%, -20px) rotate(180deg); }
        }

        @keyframes morphFloat4 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(25px, -15px) rotate(180deg); }
        }

        @keyframes advancedParticleFloat {
          0%, 100% {
            opacity: 0;
            transform: translateY(0) scale(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-30px) scale(1);
          }
        }

        @keyframes logoScale {
          from {
            opacity: 0;
            transform: scale(0.3) rotate(-180deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes ringPulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
        }

        @keyframes pulseRing {
          0% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0; transform: translate(-50%, -50%) scale(1.3); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
        }

        @keyframes textFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes textGlow {
          from { text-shadow: 0 0 5px rgba(102, 126, 234, 0.5); }
          to { text-shadow: 0 0 20px rgba(102, 126, 234, 0.9), 0 0 30px rgba(102, 126, 234, 0.5); }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes progressFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progressShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes stagesFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .advanced-logo {
            max-width: 180px;
            max-height: 72px;
          }
          
          .typewriter {
            font-size: 1.4rem;
          }
          
          .loading-stages {
            gap: 1rem;
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .linear-progress {
            width: 240px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdvancedLoadingScreen;