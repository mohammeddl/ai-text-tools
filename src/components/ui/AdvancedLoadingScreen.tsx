"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface AdvancedLoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const AdvancedLoadingScreen = ({
  onComplete,
  duration = 3500,
}: AdvancedLoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState<
    "entering" | "loading" | "exiting"
  >("entering");
  const [isClient, setIsClient] = useState(false);
  const [textRevealed, setTextRevealed] = useState(false);

  // Ensure client-side only rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    let animationFrame: number;

    // Start text reveal animation
    setTimeout(() => {
      setTextRevealed(true);
    }, 600);

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      // Smooth easing for progress
      const easedProgress = easeOutCubic(newProgress / 100) * 100;
      setProgress(easedProgress);

      if (newProgress < 100) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setLoadingPhase("exiting");
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 1000);
      }
    };

    // Start loading after entrance animation
    setTimeout(() => {
      setLoadingPhase("loading");
      animationFrame = requestAnimationFrame(animate);
    }, 1200);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [duration, onComplete]);

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  if (!isClient) {
    return null; // Prevent SSR hydration issues
  }

  return (
    <div
      ref={containerRef}
      className={`neoleaf-loading-screen phase-${loadingPhase}`}>
      {/* Dynamic background with animated gradient */}
      <div className='animated-background'></div>

      {/* Subtle particles overlay */}
      <div className='particles-container'>
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className='particle'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className='content-container'>
        {/* Logo with enhanced reveal */}
        <div className='logo-section'>
          <div className='logo-mask'>
            <Image
              src='/images/TextCrafterLogoWhite.png'
              alt='TextCrafter Logo'
              width={240}
              height={96}
              priority
              className='main-logo'
            />
          </div>
        </div>

        {/* Enhanced text reveal animation */}
        <div className='text-reveal-container'>
          <div className='main-text-wrapper'>
            <div className={`main-text ${textRevealed ? "revealed" : ""}`}>
              {"TextCrafter".split("").map((char, index) => (
                <span
                  key={index}
                  className='reveal-char'
                  style={
                    {
                      animationDelay: `${0.8 + index * 0.08}s`,
                      "--char-index": index,
                    } as React.CSSProperties
                  }>
                  {char}
                </span>
              ))}
            </div>
            <div className='text-underline'></div>
          </div>

          <div className='loading-indicator'>
            <span className='loading-text'>loading</span>
            <div className='dots-container'>
              <span className='dot dot-1'>.</span>
              <span className='dot dot-2'>.</span>
              <span className='dot dot-3'>.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicator with enhanced styling */}
      <div className='progress-section'>
        <div className='progress-percentage'>
          <span className='percentage-number'>{Math.round(progress)}</span>
          <span className='percentage-symbol'>%</span>
        </div>

        <div className='progress-bar-container'>
          <div className='progress-bar'>
            <div className='progress-fill' style={{ width: `${progress}%` }} />
            <div className='progress-glow' style={{ left: `${progress}%` }} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .neoleaf-loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #000000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: hidden;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
        }

        .animated-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(30, 30, 30, 0.8) 0%,
            rgba(0, 0, 0, 1) 70%
          );
          animation: backgroundPulse 6s ease-in-out infinite alternate;
        }

        .particles-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: particleFloat 6s ease-in-out infinite;
        }

        .content-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10;
          position: relative;
        }

        .phase-entering {
          opacity: 0;
          animation: screenFadeIn 0.8s ease-out forwards;
        }

        .phase-exiting {
          animation: screenFadeOut 1s ease-in-out forwards;
        }

        .logo-section {
          margin-bottom: 3rem;
          position: relative;
        }

        .logo-mask {
          overflow: hidden;
          position: relative;
        }

        .main-logo {
          opacity: 0;
          transform: translateY(50px) scale(0.8);
          animation: logoReveal 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s
            forwards;
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.1));
        }

        .text-reveal-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .main-text-wrapper {
          position: relative;
          margin-bottom: 2rem;
        }

        .main-text {
          display: flex;
          font-size: 4rem;
          font-weight: 100;
          letter-spacing: 12px;
          text-transform: uppercase;
          color: #ffffff;
          position: relative;
        }

        .reveal-char {
          display: inline-block;
          opacity: 0;
          transform: translateY(100px) rotateX(90deg);
          animation: charDramaticReveal 0.8s
            cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          transform-origin: bottom center;
          position: relative;
        }

        .reveal-char::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            #000 50%,
            transparent 100%
          );
          opacity: 1;
          animation: charMaskSlide 0.6s ease-out
            calc(var(--char-index) * 0.08s + 1.2s) forwards;
        }

        .text-underline {
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #ffffff, transparent);
          animation: underlineExpand 1.5s ease-out 2s forwards;
        }

        .loading-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          opacity: 0;
          animation: indicatorFadeIn 0.8s ease-out 2.2s forwards;
        }

        .loading-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.1rem;
          font-weight: 200;
          letter-spacing: 4px;
          text-transform: lowercase;
        }

        .dots-container {
          display: flex;
          gap: 2px;
        }

        .dot {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1.1rem;
          animation: dotPulse 1.5s ease-in-out infinite;
        }

        .dot-1 {
          animation-delay: 0s;
        }
        .dot-2 {
          animation-delay: 0.3s;
        }
        .dot-3 {
          animation-delay: 0.6s;
        }

        .progress-section {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 2rem 3rem;
          z-index: 10;
        }

        .progress-percentage {
          display: flex;
          align-items: baseline;
          margin-bottom: 1rem;
          opacity: 0;
          animation: progressFadeIn 0.8s ease-out 1.5s forwards;
        }

        .percentage-number {
          font-size: 2.5rem;
          font-weight: 100;
          color: #ffffff;
          line-height: 1;
        }

        .percentage-symbol {
          font-size: 1.2rem;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.7);
          margin-left: 0.2rem;
        }

        .progress-bar-container {
          width: 100%;
          position: relative;
        }

        .progress-bar {
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.15);
          position: relative;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #ffffff;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .progress-glow {
          position: absolute;
          top: -2px;
          width: 4px;
          height: 5px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.8) 0%,
            transparent 70%
          );
          transform: translateX(-50%);
          transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Animations */
        @keyframes screenFadeIn {
          from {
            opacity: 0;
            transform: scale(1.05);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes screenFadeOut {
          to {
            opacity: 0;
            transform: scale(0.95);
          }
        }

        @keyframes backgroundPulse {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.02);
          }
        }

        @keyframes particleFloat {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
        }

        @keyframes logoReveal {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes charDramaticReveal {
          0% {
            opacity: 0;
            transform: translateY(100px) rotateX(90deg);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-10px) rotateX(0deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }

        @keyframes charMaskSlide {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes underlineExpand {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes indicatorFadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dotPulse {
          0%,
          60%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          30% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes progressFadeIn {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .main-logo {
            width: 180px;
            height: 72px;
          }

          .main-text {
            font-size: 2.8rem;
            letter-spacing: 8px;
          }

          .loading-text {
            font-size: 1rem;
            letter-spacing: 3px;
          }

          .percentage-number {
            font-size: 2rem;
          }

          .progress-section {
            padding: 1.5rem 2rem;
          }
        }

        @media (max-width: 480px) {
          .main-text {
            font-size: 2.2rem;
            letter-spacing: 6px;
          }

          .logo-section {
            margin-bottom: 2rem;
          }

          .main-logo {
            width: 160px;
            height: 64px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdvancedLoadingScreen;
