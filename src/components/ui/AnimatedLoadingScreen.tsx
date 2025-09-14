"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface AnimatedLoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const AnimatedLoadingScreen = ({
  onComplete,
  duration = 4000,
}: AnimatedLoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Initializing TextCrafter...",
    "Loading AI Engine...",
    "Preparing Tools...",
    "Ready to Create!"
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const startTime = Date.now();
    let animationFrame: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      // Update step based on progress
      const stepIndex = Math.floor((newProgress / 100) * (steps.length - 1));
      setCurrentStep(stepIndex);

      if (newProgress >= 100) {
        setIsComplete(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 800);
      } else {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, 500);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [duration, onComplete, isClient, steps.length]);

  if (!isClient) return null;

  return (
    <div className={`animated-loader ${isComplete ? 'complete' : ''}`}>
      {/* Background Elements */}
      <div className="background">
        <div className="bg-pattern"></div>
        <div className="floating-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
          <div className="orb orb-4"></div>
          <div className="orb orb-5"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-container">
            <div className="logo-glow"></div>
            <Image
              src="/images/TextCrafterLogo.png"
              alt="TextCrafter"
              width={280}
              height={112}
              priority
              className="logo"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/logo.png';
              }}
            />
          </div>
          <div className="pulse-rings">
            <div className="pulse-ring ring-1"></div>
            <div className="pulse-ring ring-2"></div>
            <div className="pulse-ring ring-3"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="loading-section">
          <div className="step-text" key={currentStep}>
            {steps[currentStep]}
          </div>
          
          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-track">
              <div 
                className="progress-bar"
                style={{ width: `${progress}%` }}
              >
                <div className="progress-glow"></div>
              </div>
            </div>
            <div className="progress-info">
              <span className="progress-percentage">{Math.floor(progress)}%</span>
            </div>
          </div>

          {/* Loading Dots */}
          <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animated-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #000000 50%, #0a0a0a 75%, #000000 100%);
          background-size: 400% 400%;
          animation: backgroundShift 8s ease-in-out infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1), 
                      transform 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animated-loader.complete {
          opacity: 0;
          transform: scale(0.95);
        }

        .background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .bg-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 120%;
          height: 120%;
          background: 
            radial-gradient(circle at 20% 20%, rgba(0, 255, 102, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(0, 255, 102, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(0, 255, 102, 0.05) 0%, transparent 50%);
          animation: patternRotate 20s linear infinite;
        }

        .floating-orbs {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 255, 102, 0.4) 0%, rgba(0, 255, 102, 0.1) 50%, transparent 100%);
          animation: orbFloat 6s ease-in-out infinite;
        }

        .orb-1 {
          width: 80px;
          height: 80px;
          top: 10%;
          left: 15%;
          animation-delay: 0s;
          animation-duration: 8s;
        }

        .orb-2 {
          width: 120px;
          height: 120px;
          top: 70%;
          right: 10%;
          animation-delay: 2s;
          animation-duration: 10s;
        }

        .orb-3 {
          width: 60px;
          height: 60px;
          top: 20%;
          right: 25%;
          animation-delay: 4s;
          animation-duration: 7s;
        }

        .orb-4 {
          width: 100px;
          height: 100px;
          bottom: 15%;
          left: 20%;
          animation-delay: 1s;
          animation-duration: 9s;
        }

        .orb-5 {
          width: 40px;
          height: 40px;
          top: 60%;
          left: 70%;
          animation-delay: 3s;
          animation-duration: 6s;
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

        .logo-container {
          position: relative;
          padding: 2.5rem;
          background: transparent;
          border-radius: 30px;
          transform: scale(0.5);
          opacity: 0;
          animation: logoAppear 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.5s forwards;
        }

        .logo-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 150%;
          height: 150%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(0, 255, 102, 0.2) 0%, transparent 70%);
          animation: glowPulse 3s ease-in-out infinite;
        }

        .logo {
          position: relative;
          z-index: 5;
          filter: brightness(1.1) drop-shadow(0 0 20px rgba(0, 255, 102, 0.5));
          animation: logoBreath 4s ease-in-out infinite 2s;
        }

        .pulse-rings {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .pulse-ring {
          position: absolute;
          border: 2px solid rgba(0, 255, 102, 0.3);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: pulseRing 3s ease-out infinite;
        }

        .ring-1 {
          width: 200px;
          height: 200px;
          animation-delay: 0s;
        }

        .ring-2 {
          width: 250px;
          height: 250px;
          animation-delay: 1s;
        }

        .ring-3 {
          width: 300px;
          height: 300px;
          animation-delay: 2s;
        }

        .loading-section {
          width: 450px;
          max-width: 90vw;
          text-align: center;
        }

        .step-text {
          color: #00ff66;
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 3rem;
          min-height: 2rem;
          text-shadow: 0 0 15px rgba(0, 255, 102, 0.6);
          animation: textFadeIn 0.8s ease-out;
        }

        .progress-container {
          margin-bottom: 3rem;
          opacity: 0;
          animation: fadeInUp 1s ease-out 1s forwards;
        }

        .progress-track {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
          position: relative;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, 
            #00ff66 0%, 
            #00ff88 25%,
            #00ff66 50%,
            #00ff88 75%,
            #00ff66 100%
          );
          background-size: 200% 100%;
          border-radius: 3px;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          animation: progressShine 2s linear infinite;
        }

        .progress-glow {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(90deg, transparent, #00ff66, transparent);
          border-radius: 5px;
          filter: blur(4px);
          opacity: 0.7;
        }

        .progress-info {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }

        .progress-percentage {
          color: #00ff66;
          font-size: 1.6rem;
          font-weight: 700;
          text-shadow: 0 0 15px rgba(0, 255, 102, 0.6);
          font-variant-numeric: tabular-nums;
        }

        .loading-dots {
          display: flex;
          justify-content: center;
          gap: 12px;
          opacity: 0;
          animation: fadeInUp 1s ease-out 1.5s forwards;
        }

        .dot {
          width: 12px;
          height: 12px;
          background: #00ff66;
          border-radius: 50%;
          animation: dotWave 1.5s ease-in-out infinite;
          box-shadow: 0 0 15px rgba(0, 255, 102, 0.6);
        }

        .dot:nth-child(1) { animation-delay: 0s; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        .dot:nth-child(4) { animation-delay: 0.6s; }

        /* Animations */
        @keyframes backgroundShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes patternRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes orbFloat {
          0%, 100% { 
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.4;
          }
          25% { 
            transform: translateY(-20px) translateX(10px) scale(1.1);
            opacity: 0.7;
          }
          50% { 
            transform: translateY(-10px) translateX(-15px) scale(0.9);
            opacity: 0.5;
          }
          75% { 
            transform: translateY(-25px) translateX(5px) scale(1.05);
            opacity: 0.6;
          }
        }

        @keyframes logoAppear {
          0% {
            opacity: 0;
            transform: scale(0.3) rotateY(180deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
          }
        }

        @keyframes logoBreath {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }

        @keyframes glowPulse {
          0%, 100% { 
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% { 
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        @keyframes pulseRing {
          0% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5);
          }
        }

        @keyframes textFadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
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

        @keyframes progressShine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes dotWave {
          0%, 60%, 100% {
            transform: scale(1);
            opacity: 0.7;
          }
          30% {
            transform: scale(1.4);
            opacity: 1;
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .logo-container {
            padding: 2rem;
          }
          
          .logo {
            width: 240px !important;
            height: 96px !important;
          }
          
          .loading-section {
            width: 350px;
          }
          
          .step-text {
            font-size: 1.2rem;
          }
          
          .progress-percentage {
            font-size: 1.4rem;
          }

          .orb {
            opacity: 0.6;
          }
        }

        @media (max-width: 480px) {
          .logo-container {
            padding: 1.5rem;
          }
          
          .logo {
            width: 200px !important;
            height: 80px !important;
          }
          
          .loading-section {
            width: 300px;
          }
          
          .step-text {
            font-size: 1.1rem;
          }
          
          .progress-percentage {
            font-size: 1.3rem;
          }

          .orb {
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedLoadingScreen;