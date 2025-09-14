"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ModernLoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const ModernLoadingScreen = ({
  onComplete,
  duration = 4000,
}: ModernLoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState<"start" | "loading" | "complete" | "exit">("start");
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    console.log('🚀 Modern Loading Screen is now active!');
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const phases = [
      { phase: "start", duration: 500 },
      { phase: "loading", duration: duration - 1000 },
      { phase: "complete", duration: 300 },
      { phase: "exit", duration: 700 }
    ];

    let currentPhaseIndex = 0;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const currentPhase = phases[currentPhaseIndex];
      
      if (currentPhase.phase === "loading") {
        const progressPercent = Math.min((elapsed / currentPhase.duration) * 100, 100);
        setProgress(progressPercent);
      }

      if (elapsed >= currentPhase.duration) {
        currentPhaseIndex++;
        if (currentPhaseIndex < phases.length) {
          setLoadingPhase(phases[currentPhaseIndex].phase as "start" | "loading" | "complete" | "exit");
          startTime = Date.now();
          requestAnimationFrame(animate);
        } else {
          // All phases complete
          if (onComplete) onComplete();
        }
      } else {
        requestAnimationFrame(animate);
      }
    };

    // Start with a small delay
    setTimeout(() => {
      setLoadingPhase("loading");
      startTime = Date.now();
      requestAnimationFrame(animate);
    }, 500);

  }, [duration, onComplete, isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div ref={containerRef} className={`modern-loading-screen phase-${loadingPhase}`}>
      {/* Animated Background with Morphing Shapes */}
      <div className="background-container">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="mesh-gradient"></div>
      </div>

      {/* Floating Geometric Elements */}
      <div className="geometric-elements">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className={`geo-element geo-${i + 1}`}>
            <div className="inner-shape"></div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        {/* Logo with Sophisticated Animation */}
        <div className="logo-section">
          <div className="logo-container">
            <div className="logo-backdrop"></div>
            <Image
              src="/images/TextCrafterLogo.png"
              alt="TextCrafter"
              width={280}
              height={120}
              priority
              className="main-logo"
              onError={(e) => {
                console.log('Logo failed to load, using fallback');
                (e.target as HTMLImageElement).src = '/images/logo.png';
              }}
            />
          </div>
        </div>

        {/* Animated Text */}
        <div className="text-section">
          <div className="main-title">
            {"Crafting Your Experience".split("").map((char, index) => (
              <span key={index} className="title-char" style={{ animationDelay: `${index * 0.05}s` }}>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
          <div className="subtitle">
            <span className="subtitle-text">Powered by AI Innovation</span>
            <div className="subtitle-underline"></div>
          </div>
        </div>

        {/* Modern Progress Indicator */}
        <div className="progress-section">
          <div className="progress-container">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }}>
                <div className="progress-head"></div>
              </div>
            </div>
            <div className="progress-metrics">
              <span className="progress-percent">{Math.floor(progress)}%</span>
              <div className="loading-status">
                <span className="status-text">Loading</span>
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Particle System */}
      <div className="particles-system">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className={`particle particle-${i}`}></div>
        ))}
      </div>

      <style jsx>{`
        .modern-loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 25%, #2d1b69 50%, #1a1a3e 75%, #0f0f23 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .phase-start {
          opacity: 0;
          animation: screenEntrance 0.8s ease-out forwards;
        }

        .phase-loading {
          opacity: 1;
        }

        .phase-complete {
          animation: completePulse 0.3s ease-out;
        }

        .phase-exit {
          animation: screenExit 0.7s ease-in-out forwards;
        }

        .background-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.7;
          animation: orbFloat 8s ease-in-out infinite;
        }

        .orb-1 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          top: -200px;
          left: -200px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          bottom: -150px;
          right: -150px;
          animation-delay: 2s;
        }

        .orb-3 {
          width: 250px;
          height: 250px;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 4s;
        }

        .mesh-gradient {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(120, 199, 255, 0.3) 0%, transparent 50%);
          animation: meshShift 10s ease-in-out infinite;
        }

        .geometric-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .geo-element {
          position: absolute;
          width: 60px;
          height: 60px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          animation: geoFloat 12s linear infinite;
        }

        .inner-shape {
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
          animation: innerRotate 8s linear infinite;
        }

        .geo-1 { top: 10%; left: 15%; border-radius: 50%; animation-delay: 0s; }
        .geo-2 { top: 20%; right: 20%; animation-delay: 1s; }
        .geo-3 { bottom: 30%; left: 10%; border-radius: 20px; animation-delay: 2s; }
        .geo-4 { bottom: 15%; right: 15%; border-radius: 50%; animation-delay: 3s; }
        .geo-5 { top: 60%; left: 5%; animation-delay: 4s; }
        .geo-6 { top: 40%; right: 5%; border-radius: 20px; animation-delay: 5s; }
        .geo-7 { bottom: 50%; left: 85%; border-radius: 50%; animation-delay: 6s; }
        .geo-8 { top: 80%; right: 80%; animation-delay: 7s; }

        .content-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 10;
          position: relative;
        }

        .logo-section {
          margin-bottom: 4rem;
          position: relative;
        }

        .logo-container {
          position: relative;
          display: inline-block;
        }

        .logo-backdrop {
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
          border-radius: 20px;
          animation: logoGlow 3s ease-in-out infinite;
        }

        .main-logo {
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
          animation: logoEntrance 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards,
                     logoFloat 4s ease-in-out infinite 1.5s;
          opacity: 0;
          transform: scale(0.5) rotateY(180deg);
        }

        .text-section {
          margin-bottom: 4rem;
          text-align: center;
        }

        .main-title {
          font-size: 3.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%, #ffffff 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 4s ease-in-out infinite;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .title-char {
          display: inline-block;
          opacity: 0;
          transform: translateY(50px) rotateX(90deg);
          animation: charReveal 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
          transform-origin: center bottom;
        }

        .subtitle {
          position: relative;
          display: inline-block;
        }

        .subtitle-text {
          font-size: 1.4rem;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 2px;
          text-transform: uppercase;
          opacity: 0;
          animation: subtitleFade 1s ease-out 1.5s forwards;
        }

        .subtitle-underline {
          position: absolute;
          bottom: -8px;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #667eea, #764ba2, #667eea, transparent);
          transform: translateX(-50%);
          animation: underlineExpand 2s ease-out 2s forwards;
        }

        .progress-section {
          width: 400px;
          max-width: 90vw;
        }

        .progress-container {
          position: relative;
        }

        .progress-track {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
          position: relative;
          backdrop-filter: blur(10px);
          box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          border-radius: 3px;
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          box-shadow: 0 0 20px rgba(102, 126, 234, 0.6);
        }

        .progress-head {
          position: absolute;
          right: -8px;
          top: -4px;
          width: 14px;
          height: 14px;
          background: linear-gradient(135deg, #ffffff, #f0f0f0);
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.8), inset 0 2px 4px rgba(0, 0, 0, 0.1);
          animation: headPulse 2s ease-in-out infinite;
        }

        .progress-metrics {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.5rem;
        }

        .progress-percent {
          font-size: 2.5rem;
          font-weight: 300;
          color: #ffffff;
          font-variant-numeric: tabular-nums;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }

        .loading-status {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .status-text {
          font-size: 1.1rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .loading-dots {
          display: flex;
          gap: 4px;
        }

        .loading-dots span {
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
          animation: dotPulse 1.5s ease-in-out infinite;
        }

        .loading-dots span:nth-child(1) { animation-delay: 0s; }
        .loading-dots span:nth-child(2) { animation-delay: 0.3s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.6s; }

        .particles-system {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.8), rgba(102, 126, 234, 0.6));
          border-radius: 50%;
          animation: particleFloat 8s linear infinite;
        }

        /* Individual particle positions and delays */
        .particle-0 { top: 10%; left: 5%; animation-delay: 0s; }
        .particle-1 { top: 20%; left: 15%; animation-delay: 0.5s; }
        .particle-2 { top: 30%; left: 25%; animation-delay: 1s; }
        .particle-3 { top: 40%; left: 35%; animation-delay: 1.5s; }
        .particle-4 { top: 50%; left: 45%; animation-delay: 2s; }
        .particle-5 { top: 60%; left: 55%; animation-delay: 2.5s; }
        .particle-6 { top: 70%; left: 65%; animation-delay: 3s; }
        .particle-7 { top: 80%; left: 75%; animation-delay: 3.5s; }
        .particle-8 { top: 90%; left: 85%; animation-delay: 4s; }
        .particle-9 { top: 15%; left: 95%; animation-delay: 4.5s; }
        .particle-10 { top: 25%; left: 10%; animation-delay: 5s; }
        .particle-11 { top: 35%; left: 20%; animation-delay: 5.5s; }
        .particle-12 { top: 45%; left: 30%; animation-delay: 6s; }
        .particle-13 { top: 55%; left: 40%; animation-delay: 6.5s; }
        .particle-14 { top: 65%; left: 50%; animation-delay: 7s; }
        .particle-15 { top: 75%; left: 60%; animation-delay: 7.5s; }
        .particle-16 { top: 85%; left: 70%; animation-delay: 8s; }
        .particle-17 { top: 95%; left: 80%; animation-delay: 8.5s; }
        .particle-18 { top: 5%; left: 90%; animation-delay: 9s; }
        .particle-19 { top: 12%; left: 8%; animation-delay: 9.5s; }

        /* Animations */
        @keyframes screenEntrance {
          0% {
            opacity: 0;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes screenExit {
          0% {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
          }
          100% {
            opacity: 0;
            transform: scale(0.9) rotateY(-10deg);
          }
        }

        @keyframes completePulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }

        @keyframes orbFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes meshShift {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.1) rotate(2deg);
          }
        }

        @keyframes geoFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) rotate(90deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-25px) rotate(270deg);
            opacity: 0.4;
          }
        }

        @keyframes innerRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes logoGlow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
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

        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.02);
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes charReveal {
          0% {
            opacity: 0;
            transform: translateY(50px) rotateX(90deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }

        @keyframes subtitleFade {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes underlineExpand {
          0% {
            width: 0;
          }
          100% {
            width: 120%;
          }
        }

        @keyframes headPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
          }
          50% {
            transform: scale(1.2);
            box-shadow: 0 0 25px rgba(255, 255, 255, 1);
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

        @keyframes particleFloat {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-100vh) translateX(20px) rotate(360deg);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .main-title {
            font-size: 2.5rem;
          }
          
          .subtitle-text {
            font-size: 1.1rem;
            letter-spacing: 1px;
          }
          
          .progress-section {
            width: 300px;
          }
          
          .progress-percent {
            font-size: 2rem;
          }
          
          .main-logo {
            width: 200px !important;
            height: 80px !important;
          }
        }

        @media (max-width: 480px) {
          .main-title {
            font-size: 2rem;
          }
          
          .subtitle-text {
            font-size: 1rem;
          }
          
          .progress-section {
            width: 250px;
          }
          
          .main-logo {
            width: 160px !important;
            height: 64px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ModernLoadingScreen;