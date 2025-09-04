"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface SimpleLoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const SimpleLoadingScreen = ({ onComplete, duration = 3000 }: SimpleLoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [particlePositions, setParticlePositions] = useState<Array<{left: string, duration: string}>>([]);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Ensure client-side only rendering
  useEffect(() => {
    setIsClient(true);
    // Generate particle positions only on client
    const positions = Array.from({ length: 15 }, () => ({
      left: `${Math.random() * 100}%`,
      duration: `${2 + Math.random() * 2}s`
    }));
    setParticlePositions(positions);
  }, []);

  useEffect(() => {
    // Progress animation
    const startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        
        // Exit animation
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
        }, 500);
      }
    }, 16); // ~60fps

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`loading-screen ${progress >= 100 ? 'fade-out' : ''}`}>
      {/* Animated background */}
      <div className="loading-background">
        <div className="bg-pattern"></div>
        <div className="bg-pattern"></div>
        <div className="bg-pattern"></div>
      </div>

      {/* Particles */}
      <div className="particles">
        {isClient && particlePositions.map((particle, i) => (
          <div key={i} className="particle" style={{ 
            animationDelay: `${i * 0.1}s`,
            left: particle.left,
            animationDuration: particle.duration
          }} />
        ))}
      </div>

      {/* Main content */}
      <div className="loading-content">
        {/* Logo */}
        <div className="logo-container">
          <Image
            src="/images/TextCrafterLogoWhite.png"
            alt="TextCrafter Logo"
            width={200}
            height={80}
            priority
            className="loading-logo"
          />
        </div>

        {/* Loading text */}
        <div className="loading-text">
          <span>Loading Amazing Tools</span>
          <div className="dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="progress-text">{Math.round(progress)}%</div>
        </div>
      </div>

      <style jsx>{`
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #667eea 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: hidden;
          transition: opacity 0.5s ease-out;
        }

        .loading-screen.fade-out {
          opacity: 0;
        }

        .loading-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .bg-pattern {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          animation: float 6s ease-in-out infinite;
        }

        .bg-pattern:nth-child(1) {
          width: 200px;
          height: 200px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .bg-pattern:nth-child(2) {
          width: 150px;
          height: 150px;
          top: 60%;
          right: 20%;
          animation-delay: 2s;
        }

        .bg-pattern:nth-child(3) {
          width: 100px;
          height: 100px;
          bottom: 20%;
          left: 50%;
          animation-delay: 4s;
        }

        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-radius: 50%;
          animation: particleFloat 3s ease-in-out infinite;
        }

        .loading-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          z-index: 10;
        }

        .logo-container {
          margin-bottom: 2rem;
          animation: logoEntrance 1s ease-out, logoFloat 3s ease-in-out infinite 1s;
          filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
        }

        .loading-logo {
          width: auto;
          height: auto;
          max-width: 200px;
          max-height: 80px;
        }

        .loading-text {
          color: white;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 3rem;
          font-family: system-ui, -apple-system, sans-serif;
          display: flex;
          align-items: center;
          animation: textGlow 2s ease-in-out infinite alternate;
        }

        .dots {
          margin-left: 0.5rem;
        }

        .dots span {
          animation: dotBounce 1.4s ease-in-out infinite;
        }

        .dots span:nth-child(1) { animation-delay: 0s; }
        .dots span:nth-child(2) { animation-delay: 0.2s; }
        .dots span:nth-child(3) { animation-delay: 0.4s; }

        .progress-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 300px;
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
          border-radius: 2px;
          transition: width 0.3s ease;
          position: relative;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: shimmer 1.5s ease-in-out infinite;
        }

        .progress-text {
          color: white;
          font-size: 1rem;
          font-weight: 500;
          opacity: 0.9;
        }

        @keyframes logoEntrance {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(-180deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes textGlow {
          0% {
            text-shadow: 0 0 5px rgba(102, 126, 234, 0.5);
          }
          100% {
            text-shadow: 0 0 20px rgba(102, 126, 234, 0.8);
          }
        }

        @keyframes dotBounce {
          0%, 20% {
            opacity: 0.3;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-10px);
          }
          80%, 100% {
            opacity: 0.3;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(10px, -10px) rotate(120deg);
          }
          66% {
            transform: translate(-5px, 5px) rotate(240deg);
          }
        }

        @keyframes particleFloat {
          0%, 100% {
            opacity: 0;
            transform: translateY(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @media (max-width: 768px) {
          .loading-text {
            font-size: 1.2rem;
          }
          .progress-container {
            width: 250px;
          }
          .loading-logo {
            max-width: 150px;
            max-height: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default SimpleLoadingScreen;