"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface MinimalLoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const MinimalLoadingScreen = ({
  onComplete,
  duration = 3000,
}: MinimalLoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    console.log('🟢 Minimal Green Loading Screen Active!');
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
        }, 600);
      } else {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    // Start after a short delay
    setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, 400);

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
    <div ref={containerRef} className={`minimal-loader ${isComplete ? 'complete' : ''}`}>
      {/* Background */}
      <div className="background"></div>
      
      {/* Animated Shapes */}
      <div className="shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Logo */}
        <div className="logo-container">
          <div className="logo-wrapper">
            <Image
              src="/images/TextCrafterLogo.png"
              alt="TextCrafter"
              width={240}
              height={96}
              priority
              className="logo"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/logo.png';
              }}
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            >
              <div className="progress-shine"></div>
            </div>
          </div>
          <div className="progress-text">{Math.floor(progress)}%</div>
        </div>

        {/* Loading Dots */}
        <div className="loading-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>

      <style jsx>{`
        .minimal-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .minimal-loader.complete {
          opacity: 0;
          transform: scale(1.05);
        }

        .background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
          background-size: 200% 200%;
          animation: backgroundFlow 8s ease-in-out infinite;
        }

        .shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .shape {
          position: absolute;
          background: #00ff66;
          opacity: 0.1;
          animation: shapeFloat 6s ease-in-out infinite;
        }

        .shape-1 {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
          animation-duration: 8s;
        }

        .shape-2 {
          width: 60px;
          height: 60px;
          border-radius: 30%;
          bottom: 30%;
          right: 15%;
          animation-delay: 2s;
          animation-duration: 10s;
        }

        .shape-3 {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          top: 60%;
          left: 80%;
          animation-delay: 4s;
          animation-duration: 12s;
        }

        .shape-4 {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          top: 10%;
          right: 25%;
          animation-delay: 1s;
          animation-duration: 9s;
        }

        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 10;
          position: relative;
        }

        .logo-container {
          margin-bottom: 4rem;
          position: relative;
        }

        .logo-wrapper {
          position: relative;
          padding: 2rem;
          background: rgba(0, 255, 102, 0.05);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(0, 255, 102, 0.2);
          transform: scale(0.8);
          opacity: 0;
          animation: logoEntrance 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.5s forwards;
          box-shadow: 
            0 0 30px rgba(0, 255, 102, 0.2),
            inset 0 0 30px rgba(0, 255, 102, 0.05);
        }

        .logo-wrapper::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #00ff66, transparent, #00ff66);
          border-radius: 22px;
          z-index: -1;
          animation: borderGlow 3s ease-in-out infinite;
        }

        .logo {
          filter: brightness(1.1) contrast(1.05);
          animation: logoFloat 4s ease-in-out infinite 1.5s;
        }

        .progress-section {
          width: 350px;
          max-width: 85vw;
          margin-bottom: 3rem;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 1.2s forwards;
        }

        .progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(0, 255, 102, 0.3);
          box-shadow: 
            0 0 10px rgba(0, 255, 102, 0.2),
            inset 0 0 10px rgba(0, 0, 0, 0.3);
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, 
            #00ff66 0%, 
            #00cc52 50%, 
            #00ff66 100%
          );
          border-radius: 3px;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          box-shadow: 0 0 15px rgba(0, 255, 102, 0.6);
        }

        .progress-shine {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.4) 50%, 
            transparent 100%
          );
          animation: shine 2s ease-in-out infinite;
        }

        .progress-text {
          text-align: center;
          margin-top: 1rem;
          color: #00ff66;
          font-size: 1.2rem;
          font-weight: 600;
          text-shadow: 0 0 10px rgba(0, 255, 102, 0.5);
          font-variant-numeric: tabular-nums;
        }

        .loading-dots {
          display: flex;
          gap: 12px;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 1.5s forwards;
        }

        .dot {
          width: 12px;
          height: 12px;
          background: #00ff66;
          border-radius: 50%;
          animation: dotPulse 1.5s ease-in-out infinite;
          box-shadow: 0 0 15px rgba(0, 255, 102, 0.6);
        }

        .dot:nth-child(1) { animation-delay: 0s; }
        .dot:nth-child(2) { animation-delay: 0.3s; }
        .dot:nth-child(3) { animation-delay: 0.6s; }

        /* Animations */
        @keyframes backgroundFlow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes shapeFloat {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(90deg);
          }
          50% {
            transform: translateY(-10px) translateX(-10px) rotate(180deg);
          }
          75% {
            transform: translateY(-30px) translateX(5px) rotate(270deg);
          }
        }

        @keyframes logoEntrance {
          0% {
            opacity: 0;
            transform: scale(0.5) rotateY(180deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
          }
        }

        @keyframes borderGlow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes dotPulse {
          0%, 70%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          35% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .logo-wrapper {
            padding: 1.5rem;
          }
          
          .logo {
            width: 200px !important;
            height: 80px !important;
          }
          
          .progress-section {
            width: 300px;
          }
          
          .progress-text {
            font-size: 1.1rem;
          }
          
          .shape {
            opacity: 0.05;
          }
        }

        @media (max-width: 480px) {
          .logo-wrapper {
            padding: 1rem;
          }
          
          .logo {
            width: 180px !important;
            height: 72px !important;
          }
          
          .progress-section {
            width: 260px;
          }
          
          .progress-text {
            font-size: 1rem;
          }
          
          .dot {
            width: 10px;
            height: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default MinimalLoadingScreen;