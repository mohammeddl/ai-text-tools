"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ElegantLoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const ElegantLoadingScreen = ({
  onComplete,
  duration = 3500,
}: ElegantLoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    "Initializing...",
    "Loading Components...",
    "Setting up AI Tools...",
    "Almost Ready...",
    "Welcome!"
  ];

  useEffect(() => {
    setIsClient(true);
    console.log('✨ Elegant Loading Screen Active!');
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const startTime = Date.now();
    let animationFrame: number;
    const stepInterval: NodeJS.Timeout = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 600);

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        setCurrentStep(steps.length - 1);
        setIsComplete(true);
        clearInterval(stepInterval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 800);
      } else {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    // Start after a brief delay
    setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, 300);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (stepInterval) clearInterval(stepInterval);
    };
  }, [duration, onComplete, isClient, steps.length]);

  if (!isClient) {
    return null;
  }

  return (
    <div ref={containerRef} className={`elegant-loader ${isComplete ? 'complete' : ''}`}>
      {/* Animated Background */}
      <div className="background">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
        <div className="bg-grid"></div>
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-rings">
            <div className="ring ring-1"></div>
            <div className="ring ring-2"></div>
            <div className="ring ring-3"></div>
          </div>
          <div className="logo-container">
            <Image
              src="/images/TextCrafterLogo.png"
              alt="TextCrafter"
              width={220}
              height={88}
              priority
              className="logo"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/logo.png';
              }}
            />
          </div>
        </div>

        {/* Progress Section */}
        <div className="progress-section">
          <div className="step-text">{steps[currentStep]}</div>
          
          <div className="progress-container">
            <div className="progress-track">
              <div 
                className="progress-bar"
                style={{ width: `${progress}%` }}
              >
                <div className="progress-pulse"></div>
              </div>
            </div>
            <div className="progress-labels">
              <span className="progress-percent">{Math.floor(progress)}%</span>
              <div className="progress-steps">
                {steps.map((_, index) => (
                  <div 
                    key={index}
                    className={`step-dot ${index <= Math.floor((progress / 100) * (steps.length - 1)) ? 'active' : ''}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="loading-animation">
          <div className="spinner">
            <div className="spinner-segment"></div>
            <div className="spinner-segment"></div>
            <div className="spinner-segment"></div>
            <div className="spinner-segment"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .elegant-loader {
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
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .elegant-loader.complete {
          opacity: 0;
          transform: scale(1.1);
        }

        .background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%);
        }

        .bg-circle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 255, 102, 0.15) 0%, transparent 70%);
          animation: circleFloat 8s ease-in-out infinite;
        }

        .circle-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .circle-2 {
          width: 200px;
          height: 200px;
          bottom: 20%;
          right: 15%;
          animation-delay: 3s;
        }

        .circle-3 {
          width: 150px;
          height: 150px;
          top: 50%;
          left: 80%;
          animation-delay: 6s;
        }

        .bg-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(0, 255, 102, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 102, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 10;
          position: relative;
        }

        .logo-section {
          position: relative;
          margin-bottom: 4rem;
        }

        .logo-rings {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .ring {
          position: absolute;
          border: 2px solid transparent;
          border-top: 2px solid #00ff66;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: ringRotate 3s linear infinite;
        }

        .ring-1 {
          width: 120px;
          height: 120px;
          animation-delay: 0s;
          opacity: 0.8;
        }

        .ring-2 {
          width: 140px;
          height: 140px;
          animation-delay: 0.5s;
          animation-direction: reverse;
          opacity: 0.6;
        }

        .ring-3 {
          width: 160px;
          height: 160px;
          animation-delay: 1s;
          opacity: 0.4;
        }

        .logo-container {
          position: relative;
          z-index: 5;
          padding: 2rem;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 25px;
          border: 1px solid rgba(0, 255, 102, 0.3);
          box-shadow: 
            0 0 30px rgba(0, 255, 102, 0.2),
            inset 0 0 30px rgba(0, 0, 0, 0.5);
          transform: scale(0.8);
          opacity: 0;
          animation: logoEntrance 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.5s forwards;
        }

        .logo {
          filter: brightness(1.1) contrast(1.1);
          animation: logoBreath 4s ease-in-out infinite 2s;
        }

        .progress-section {
          width: 400px;
          max-width: 90vw;
          margin-bottom: 3rem;
          opacity: 0;
          animation: fadeInUp 1s ease-out 1s forwards;
        }

        .step-text {
          text-align: center;
          color: #00ff66;
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 2rem;
          min-height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-shadow: 0 0 10px rgba(0, 255, 102, 0.5);
          animation: textPulse 0.6s ease-in-out;
        }

        .progress-container {
          position: relative;
        }

        .progress-track {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid rgba(0, 255, 102, 0.2);
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, 
            #00ff66 0%, 
            #00cc52 25%,
            #00ff88 50%,
            #00cc52 75%,
            #00ff66 100%
          );
          background-size: 200% 100%;
          border-radius: 4px;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          box-shadow: 0 0 15px rgba(0, 255, 102, 0.6);
          animation: progressShine 2s ease-in-out infinite;
        }

        .progress-pulse {
          position: absolute;
          top: 0;
          right: 0;
          width: 4px;
          height: 100%;
          background: rgba(255, 255, 255, 0.8);
          animation: pulse 1s ease-in-out infinite;
        }

        .progress-labels {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.5rem;
        }

        .progress-percent {
          color: #00ff66;
          font-size: 1.3rem;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(0, 255, 102, 0.5);
          font-variant-numeric: tabular-nums;
        }

        .progress-steps {
          display: flex;
          gap: 8px;
        }

        .step-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .step-dot.active {
          background: #00ff66;
          box-shadow: 0 0 10px rgba(0, 255, 102, 0.6);
          transform: scale(1.2);
        }

        .loading-animation {
          opacity: 0;
          animation: fadeInUp 1s ease-out 1.5s forwards;
        }

        .spinner {
          width: 60px;
          height: 60px;
          position: relative;
          animation: spinnerRotate 2s linear infinite;
        }

        .spinner-segment {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 3px solid transparent;
          border-top: 3px solid #00ff66;
          border-radius: 50%;
          animation: segmentRotate 1.5s ease-in-out infinite;
        }

        .spinner-segment:nth-child(1) { animation-delay: 0s; opacity: 1; }
        .spinner-segment:nth-child(2) { animation-delay: 0.15s; opacity: 0.8; }
        .spinner-segment:nth-child(3) { animation-delay: 0.3s; opacity: 0.6; }
        .spinner-segment:nth-child(4) { animation-delay: 0.45s; opacity: 0.4; }

        /* Animations */
        @keyframes circleFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @keyframes ringRotate {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
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

        @keyframes logoBreath {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
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

        @keyframes textPulse {
          0% {
            opacity: 0.7;
            transform: scale(0.98);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes progressShine {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes spinnerRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes segmentRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .logo-container {
            padding: 1.5rem;
          }
          
          .logo {
            width: 180px !important;
            height: 72px !important;
          }
          
          .ring-1 { width: 100px; height: 100px; }
          .ring-2 { width: 120px; height: 120px; }
          .ring-3 { width: 140px; height: 140px; }
          
          .progress-section {
            width: 320px;
          }
          
          .step-text {
            font-size: 1rem;
          }
          
          .progress-percent {
            font-size: 1.2rem;
          }
          
          .spinner {
            width: 50px;
            height: 50px;
          }
        }

        @media (max-width: 480px) {
          .logo-container {
            padding: 1rem;
          }
          
          .logo {
            width: 160px !important;
            height: 64px !important;
          }
          
          .progress-section {
            width: 280px;
          }
          
          .step-text {
            font-size: 0.95rem;
          }
          
          .bg-circle {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default ElegantLoadingScreen;