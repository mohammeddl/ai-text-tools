"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface InteractiveLoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const InteractiveLoadingScreen = ({
  onComplete,
  duration = 4000,
}: InteractiveLoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    console.log('🎯 Interactive 3D Loading Screen Active!');
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const startTime = Date.now();
    let animationFrame: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        setIsComplete(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 800);
      } else {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    // Small delay before starting
    setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, 500);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [duration, onComplete, isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div ref={containerRef} className={`interactive-loader-screen ${isComplete ? 'complete' : ''}`}>
      {/* Background */}
      <div className="background-gradient"></div>
      
      {/* Logo Section */}
      <div className="logo-section">
        <Image
          src="/images/TextCrafterLogo.png"
          alt="TextCrafter"
          width={200}
          height={80}
          priority
          className="brand-logo"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/logo.png';
          }}
        />
      </div>

      {/* 3D Interactive Loader Container */}
      <div className="loader-container">
        {/* Interactive Areas for 3D Effect */}
        {Array.from({ length: 36 }, (_, i) => (
          <div key={i} className="area"></div>
        ))}
        
        {/* Main 3D Loader */}
        <div className="loader">
          <p className="text">TEXTCRAFTER</p>
          
          {/* First Section */}
          <span style={{ '--i': Math.floor(progress * 1), '--d': 0 } as React.CSSProperties}></span>
          
          {/* First Groove */}
          <div className="groove">
            <span style={{ '--i': Math.floor(progress * 0.5), '--d': Math.floor(progress * 1) } as React.CSSProperties}></span>
            <span style={{ '--i': Math.floor(progress * 0.3), '--d': Math.floor(progress * 1.5) } as React.CSSProperties}></span>
            <span style={{ '--i': Math.floor(progress * 0.5), '--d': Math.floor(progress * 1.8) } as React.CSSProperties}></span>
          </div>
          
          {/* Second Section */}
          <span style={{ '--i': Math.floor(progress * 0.1), '--d': Math.floor(progress * 2.3) } as React.CSSProperties}></span>
          
          {/* Second Groove */}
          <div className="groove">
            <span style={{ '--i': Math.floor(progress * 1), '--d': Math.floor(progress * 2.4) } as React.CSSProperties}></span>
            <span style={{ '--i': Math.floor(progress * 0.15), '--d': Math.floor(progress * 3.4) } as React.CSSProperties}></span>
            <span style={{ '--i': Math.floor(progress * 1.4), '--d': Math.floor(progress * 3.55) } as React.CSSProperties}></span>
          </div>
          
          {/* Third Section */}
          <span style={{ '--i': Math.floor(progress * 0.6), '--d': Math.floor(progress * 4.95) } as React.CSSProperties}></span>
          
          {/* Third Groove */}
          <div className="groove">
            <span style={{ '--i': Math.floor(progress * 0.6), '--d': Math.floor(progress * 5.55) } as React.CSSProperties}></span>
            <span style={{ '--i': Math.floor(progress * 0.5), '--d': Math.floor(progress * 6.15) } as React.CSSProperties}></span>
            <span style={{ '--i': Math.floor(progress * 0.2), '--d': Math.floor(progress * 6.65) } as React.CSSProperties}></span>
          </div>
          
          {/* Final Section */}
          <span style={{ '--i': Math.floor(progress * 0.4), '--d': Math.floor(progress * 6.85) } as React.CSSProperties}></span>
        </div>
      </div>

      {/* Progress Info */}
      <div className="progress-info">
        <div className="progress-percentage">{Math.floor(progress)}%</div>
        <div className="loading-text">Loading AI Text Tools...</div>
      </div>

      <style jsx>{`
        .interactive-loader-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          transition: opacity 0.8s ease-out;
        }

        .interactive-loader-screen.complete {
          opacity: 0;
        }

        .background-gradient {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #667eea 50%, #764ba2 75%, #f093fb 100%);
          background-size: 400% 400%;
          animation: gradientShift 10s ease-in-out infinite;
        }

        .logo-section {
          position: relative;
          z-index: 10;
          margin-bottom: 3rem;
          opacity: 0;
          animation: logoFadeIn 1s ease-out 0.3s forwards;
        }

        .brand-logo {
          filter: brightness(1.2) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
        }

        /* Loader Container - Based on Uiverse Design */
        .loader-container {
          --color-primary: #667eea;
          --color-neutral: #fff;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          position: relative;
          width: 600px;
          height: 400px;
          max-width: 90vw;
          max-height: 60vh;
          z-index: 5;
        }

        .area {
          cursor: pointer;
        }

        /* 3D Hover Effects */
        .area:nth-of-type(1):hover ~ .loader { transform: rotateX(-20deg) rotateY(20deg); }
        .area:nth-of-type(2):hover ~ .loader { transform: rotateX(-20deg) rotateY(10deg); }
        .area:nth-of-type(3):hover ~ .loader { transform: rotateX(-20deg) rotateY(5deg); }
        .area:nth-of-type(4):hover ~ .loader { transform: rotateX(-20deg) rotateY(-5deg); }
        .area:nth-of-type(5):hover ~ .loader { transform: rotateX(-20deg) rotateY(-10deg); }
        .area:nth-of-type(6):hover ~ .loader { transform: rotateX(-20deg) rotateY(-20deg); }
        .area:nth-of-type(7):hover ~ .loader { transform: rotateX(-10deg) rotateY(20deg); }
        .area:nth-of-type(8):hover ~ .loader { transform: rotateX(-10deg) rotateY(10deg); }
        .area:nth-of-type(9):hover ~ .loader { transform: rotateX(-10deg) rotateY(5deg); }
        .area:nth-of-type(10):hover ~ .loader { transform: rotateX(-10deg) rotateY(-5deg); }
        .area:nth-of-type(11):hover ~ .loader { transform: rotateX(-10deg) rotateY(-10deg); }
        .area:nth-of-type(12):hover ~ .loader { transform: rotateX(-10deg) rotateY(-20deg); }
        .area:nth-of-type(13):hover ~ .loader { transform: rotateX(-5deg) rotateY(20deg); }
        .area:nth-of-type(14):hover ~ .loader { transform: rotateX(-5deg) rotateY(10deg); }
        .area:nth-of-type(15):hover ~ .loader { transform: rotateX(-5deg) rotateY(5deg); }
        .area:nth-of-type(16):hover ~ .loader { transform: rotateX(-5deg) rotateY(-5deg); }
        .area:nth-of-type(17):hover ~ .loader { transform: rotateX(-5deg) rotateY(-10deg); }
        .area:nth-of-type(18):hover ~ .loader { transform: rotateX(-5deg) rotateY(-20deg); }
        .area:nth-of-type(19):hover ~ .loader { transform: rotateX(5deg) rotateY(20deg); }
        .area:nth-of-type(20):hover ~ .loader { transform: rotateX(5deg) rotateY(10deg); }
        .area:nth-of-type(21):hover ~ .loader { transform: rotateX(5deg) rotateY(5deg); }
        .area:nth-of-type(22):hover ~ .loader { transform: rotateX(5deg) rotateY(-5deg); }
        .area:nth-of-type(23):hover ~ .loader { transform: rotateX(5deg) rotateY(-10deg); }
        .area:nth-of-type(24):hover ~ .loader { transform: rotateX(5deg) rotateY(-20deg); }
        .area:nth-of-type(25):hover ~ .loader { transform: rotateX(10deg) rotateY(20deg); }
        .area:nth-of-type(26):hover ~ .loader { transform: rotateX(10deg) rotateY(10deg); }
        .area:nth-of-type(27):hover ~ .loader { transform: rotateX(10deg) rotateY(5deg); }
        .area:nth-of-type(28):hover ~ .loader { transform: rotateX(10deg) rotateY(-5deg); }
        .area:nth-of-type(29):hover ~ .loader { transform: rotateX(10deg) rotateY(-10deg); }
        .area:nth-of-type(30):hover ~ .loader { transform: rotateX(10deg) rotateY(-20deg); }
        .area:nth-of-type(31):hover ~ .loader { transform: rotateX(20deg) rotateY(20deg); }
        .area:nth-of-type(32):hover ~ .loader { transform: rotateX(20deg) rotateY(10deg); }
        .area:nth-of-type(33):hover ~ .loader { transform: rotateX(20deg) rotateY(5deg); }
        .area:nth-of-type(34):hover ~ .loader { transform: rotateX(20deg) rotateY(-5deg); }
        .area:nth-of-type(35):hover ~ .loader { transform: rotateX(20deg) rotateY(-10deg); }
        .area:nth-of-type(36):hover ~ .loader { transform: rotateX(20deg) rotateY(-20deg); }

        .loader {
          display: flex;
          position: absolute;
          top: 50%;
          left: 50%;
          transform-style: preserve-3d;
          transition: all 0.15s linear;
          translate: -50% -50%;
          opacity: 0;
          animation: loaderFadeIn 1s ease-out 0.8s forwards;
        }

        .loader span {
          position: relative;
          height: 30px;
          background-color: var(--color-neutral);
          border-top: 0.2rem solid var(--color-primary);
          border-bottom: 0.2rem solid var(--color-primary);
        }

        .loader span::before {
          content: "";
          position: absolute;
          top: 0.2rem;
          width: 100%;
          height: calc(100% - 0.4rem);
          background-color: var(--color-primary);
          clip-path: inset(0 100% 0 0);
          animation: progress calc(var(--i) * 40ms) linear calc(var(--d) * 40ms) forwards;
        }

        /* Main segments */
        .loader > span:nth-of-type(1) {
          width: 100px;
          border-left: 0.2rem solid var(--color-primary);
          border-radius: 10px 0 0 10px;
        }

        .loader > span:nth-of-type(1)::before {
          left: 0.2rem;
          width: calc(100% - 0.2rem + 1px);
          border-radius: 5px 0 0 5px;
        }

        .loader > span:nth-of-type(2) {
          width: 10px;
        }

        .loader > span:nth-of-type(2)::before {
          left: -1px;
          width: calc(100% + 2px);
        }

        .loader > span:nth-of-type(3) {
          width: 50px;
          transform: translateZ(40px);
        }

        .loader > span:nth-of-type(3)::before {
          left: -1px;
          width: calc(100% + 2px);
        }

        .loader > span:nth-of-type(4) {
          width: 40px;
          border-right: 0.2rem solid var(--color-primary);
          border-radius: 0 10px 10px 0;
        }

        .loader > span:nth-of-type(4)::before {
          right: 0.2rem;
          width: calc(100% - 0.2rem + 1px);
          border-radius: 0 5px 5px 0;
        }

        .text {
          position: absolute;
          top: -60%;
          left: 10px;
          color: var(--color-primary);
          font-weight: 900;
          font-size: 0.9rem;
          letter-spacing: 2px;
          transform: translateZ(-20px);
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .groove {
          position: relative;
          transform-style: preserve-3d;
        }

        .groove > span {
          display: inline-block;
        }

        .groove > :first-child,
        .groove > :last-child {
          position: absolute;
        }

        /* First groove */
        .groove:nth-of-type(1) > :nth-child(1) {
          width: 50px;
          transform: rotateY(90deg);
          transform-origin: left;
        }

        .groove:nth-of-type(1) > :nth-child(2) {
          width: 30px;
          transform: translateZ(-50px);
        }

        .groove:nth-of-type(1) > :nth-child(3) {
          width: 50px;
          transform: rotateY(-90deg) translateX(-50px);
          transform-origin: left;
        }

        /* Second groove */
        .groove:nth-of-type(2) > :nth-child(1) {
          width: 100px;
          transform: rotateY(90deg);
          transform-origin: left;
        }

        .groove:nth-of-type(2) > :nth-child(2) {
          width: 15px;
          transform: translateZ(-100px);
        }

        .groove:nth-of-type(2) > :nth-child(3) {
          width: 140px;
          transform: rotateY(-90deg) translateX(-100px);
          transform-origin: left;
        }

        /* Third groove */
        .groove:nth-of-type(3) > :nth-child(1) {
          width: 60px;
          transform: rotateY(90deg) translateX(-40px);
          transform-origin: left;
        }

        .groove:nth-of-type(3) > :nth-child(2) {
          width: 30px;
          transform: translateZ(-20px);
        }

        .groove:nth-of-type(3) > :nth-child(3) {
          width: 20px;
          transform: rotateY(-90deg) translateX(-20px);
          transform-origin: left;
        }

        .progress-info {
          position: relative;
          z-index: 10;
          margin-top: 3rem;
          text-align: center;
          color: white;
          opacity: 0;
          animation: infoFadeIn 1s ease-out 1.2s forwards;
        }

        .progress-percentage {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .loading-text {
          font-size: 1.1rem;
          font-weight: 500;
          opacity: 0.9;
          letter-spacing: 1px;
        }

        /* Animations */
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes logoFadeIn {
          0% {
            opacity: 0;
            transform: translateY(-30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes loaderFadeIn {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes infoFadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progress {
          to {
            clip-path: inset(0 0 0 0);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .loader-container {
            width: 400px;
            height: 300px;
          }
          
          .brand-logo {
            width: 160px !important;
            height: 64px !important;
          }
          
          .loader > span:nth-of-type(1) { width: 80px; }
          .loader > span:nth-of-type(2) { width: 8px; }
          .loader > span:nth-of-type(3) { width: 40px; }
          .loader > span:nth-of-type(4) { width: 32px; }
          
          .groove:nth-of-type(1) > :nth-child(1) { width: 40px; }
          .groove:nth-of-type(1) > :nth-child(2) { width: 24px; }
          .groove:nth-of-type(1) > :nth-child(3) { width: 40px; }
          
          .groove:nth-of-type(2) > :nth-child(1) { width: 80px; }
          .groove:nth-of-type(2) > :nth-child(2) { width: 12px; }
          .groove:nth-of-type(2) > :nth-child(3) { width: 112px; }
          
          .groove:nth-of-type(3) > :nth-child(1) { width: 48px; }
          .groove:nth-of-type(3) > :nth-child(2) { width: 24px; }
          .groove:nth-of-type(3) > :nth-child(3) { width: 16px; }
          
          .text {
            font-size: 0.8rem;
            letter-spacing: 1px;
          }
          
          .progress-percentage {
            font-size: 1.5rem;
          }
          
          .loading-text {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .loader-container {
            width: 300px;
            height: 250px;
          }
          
          .brand-logo {
            width: 140px !important;
            height: 56px !important;
          }
          
          .loader > span:nth-of-type(1) { width: 60px; }
          .loader > span:nth-of-type(2) { width: 6px; }
          .loader > span:nth-of-type(3) { width: 30px; }
          .loader > span:nth-of-type(4) { width: 24px; }
        }
      `}</style>
    </div>
  );
};

export default InteractiveLoadingScreen;