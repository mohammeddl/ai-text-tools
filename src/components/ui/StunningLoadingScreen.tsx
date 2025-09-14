"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface StunningLoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const StunningLoadingScreen = ({
  onComplete,
  duration = 3500,
}: StunningLoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [showLogo, setShowLogo] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    console.log('✨ New Stunning Loading Screen Active!');
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const loadingTexts = [
      "Initializing AI Engine...",
      "Loading Text Processing Tools...",
      "Preparing User Interface...",
      "Almost Ready...",
      "Welcome to TextCrafter!"
    ];

    let progressInterval: NodeJS.Timeout;
    let currentTextIndex = 0;

    // Show logo first
    setTimeout(() => setShowLogo(true), 300);
    
    // Show progress bar
    setTimeout(() => setShowProgress(true), 800);

    // Start progress animation
    setTimeout(() => {
      const startTime = Date.now();
      
      progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / (duration - 800)) * 100, 100);
        setProgress(newProgress);

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setIsExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600);
        }
      }, 16);
    }, 1000);

    // Text cycling animation
    const textInterval: NodeJS.Timeout = setInterval(() => {
      setCurrentText(loadingTexts[currentTextIndex]);
      currentTextIndex = (currentTextIndex + 1) % loadingTexts.length;
    }, 700);

    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (textInterval) clearInterval(textInterval);
    };
  }, [duration, onComplete, isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div ref={containerRef} className={`stunning-loader ${isExiting ? 'exiting' : ''}`}>
      {/* Animated Background */}
      <div className="background-animation">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className={`float-element element-${i + 1}`}>
            <div className="element-inner"></div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="content-center">
        {/* Logo Section */}
        <div className={`logo-wrapper ${showLogo ? 'show' : ''}`}>
          <div className="logo-glow"></div>
          <div className="logo-container">
            <Image
              src="/images/TextCrafterLogo.png"
              alt="TextCrafter"
              width={220}
              height={88}
              priority
              className="main-logo"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/logo.png';
              }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <div className="loading-text-container">
          <div className="loading-text" key={currentText}>
            {currentText}
          </div>
        </div>

        {/* Progress Section */}
        <div className={`progress-wrapper ${showProgress ? 'show' : ''}`}>
          <div className="progress-container">
            <div className="progress-bg">
              <div className="progress-line" style={{ width: `${progress}%` }}>
                <div className="progress-glow"></div>
              </div>
            </div>
            <div className="progress-percentage">{Math.floor(progress)}%</div>
          </div>
        </div>
      </div>

      {/* Bottom Elements */}
      <div className="bottom-section">
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <style jsx>{`
        .stunning-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          background-size: 400% 400%;
          animation: gradientShift 8s ease-in-out infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          opacity: 1;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stunning-loader.exiting {
          opacity: 0;
          transform: scale(0.95);
        }

        .background-animation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .wave {
          position: absolute;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          border-radius: 45%;
          animation: waveRotate 20s linear infinite;
        }

        .wave-1 {
          top: -50%;
          left: -50%;
          animation-duration: 20s;
          animation-delay: 0s;
        }

        .wave-2 {
          bottom: -50%;
          right: -50%;
          animation-duration: 25s;
          animation-delay: -5s;
          animation-direction: reverse;
        }

        .wave-3 {
          top: -25%;
          left: 25%;
          animation-duration: 30s;
          animation-delay: -10s;
          opacity: 0.5;
        }

        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .float-element {
          position: absolute;
          width: 20px;
          height: 20px;
          animation: floatUp 8s linear infinite;
        }

        .element-inner {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        /* Position floating elements */
        .element-1 { top: 90%; left: 10%; animation-delay: 0s; }
        .element-2 { top: 95%; left: 20%; animation-delay: 1s; }
        .element-3 { top: 85%; left: 30%; animation-delay: 2s; }
        .element-4 { top: 92%; left: 40%; animation-delay: 3s; }
        .element-5 { top: 88%; left: 50%; animation-delay: 4s; }
        .element-6 { top: 94%; left: 60%; animation-delay: 5s; }
        .element-7 { top: 87%; left: 70%; animation-delay: 6s; }
        .element-8 { top: 91%; left: 80%; animation-delay: 7s; }
        .element-9 { top: 93%; left: 90%; animation-delay: 0.5s; }
        .element-10 { top: 89%; left: 15%; animation-delay: 1.5s; }
        .element-11 { top: 96%; left: 35%; animation-delay: 2.5s; }
        .element-12 { top: 86%; left: 75%; animation-delay: 3.5s; }

        .content-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 10;
          position: relative;
        }

        .logo-wrapper {
          position: relative;
          margin-bottom: 3rem;
          opacity: 0;
          transform: translateY(30px) scale(0.8);
          transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .logo-wrapper.show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .logo-glow {
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          animation: logoGlow 3s ease-in-out infinite;
          filter: blur(20px);
        }

        .logo-container {
          position: relative;
          z-index: 2;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
        }

        .main-logo {
          filter: brightness(1.2) contrast(1.1);
          animation: logoFloat 4s ease-in-out infinite;
        }

        .loading-text-container {
          margin-bottom: 3rem;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-text {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.3rem;
          font-weight: 500;
          text-align: center;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          animation: textFade 0.7s ease-in-out;
          letter-spacing: 1px;
        }

        .progress-wrapper {
          width: 400px;
          max-width: 90vw;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }

        .progress-wrapper.show {
          opacity: 1;
          transform: translateY(0);
        }

        .progress-container {
          position: relative;
        }

        .progress-bg {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          overflow: hidden;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .progress-line {
          height: 100%;
          background: linear-gradient(90deg, 
            rgba(255, 255, 255, 0.8) 0%, 
            rgba(255, 255, 255, 1) 50%, 
            rgba(255, 255, 255, 0.8) 100%
          );
          border-radius: 4px;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }

        .progress-glow {
          position: absolute;
          top: -2px;
          right: -4px;
          width: 12px;
          height: 12px;
          background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, transparent 70%);
          border-radius: 50%;
          animation: progressGlow 1.5s ease-in-out infinite;
        }

        .progress-percentage {
          position: absolute;
          top: -35px;
          right: 0;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
          font-weight: 600;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          font-variant-numeric: tabular-nums;
        }

        .bottom-section {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
        }

        .loading-dots {
          display: flex;
          gap: 8px;
        }

        .loading-dots span {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: dotBounce 1.4s ease-in-out infinite;
        }

        .loading-dots span:nth-child(1) { animation-delay: 0s; }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

        /* Animations */
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes waveRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes floatUp {
          0% {
            opacity: 0;
            transform: translateY(0) rotate(0deg);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-100vh) rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        @keyframes logoGlow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes textFade {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progressGlow {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        @keyframes dotBounce {
          0%, 60%, 100% {
            opacity: 0.4;
            transform: translateY(0) scale(1);
          }
          30% {
            opacity: 1;
            transform: translateY(-10px) scale(1.2);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .logo-container {
            padding: 1.5rem;
          }
          
          .main-logo {
            width: 180px !important;
            height: 72px !important;
          }
          
          .loading-text {
            font-size: 1.1rem;
          }
          
          .progress-wrapper {
            width: 320px;
          }
          
          .progress-percentage {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .logo-container {
            padding: 1rem;
          }
          
          .main-logo {
            width: 160px !important;
            height: 64px !important;
          }
          
          .loading-text {
            font-size: 1rem;
          }
          
          .progress-wrapper {
            width: 280px;
          }
          
          .loading-dots span {
            width: 10px;
            height: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default StunningLoadingScreen;