"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const text = textRef.current;
    const progressBar = progressBarRef.current;
    const progressFill = progressFillRef.current;
    const particles = particlesRef.current;

    if (!container || !logo || !text || !progressBar || !progressFill || !particles) return;

    // Create timeline
    const tl = gsap.timeline();

    // Initial states
    gsap.set(logo, { scale: 0, rotation: -180, opacity: 0 });
    gsap.set(text, { y: 50, opacity: 0 });
    gsap.set(progressBar, { scaleX: 0, opacity: 0 });
    gsap.set(progressFill, { width: "0%" });

    // Create particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'loading-particle';
      particles.appendChild(particle);
      
      gsap.set(particle, {
        position: 'absolute',
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #667eea, #764ba2)',
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        opacity: 0
      });
    }

    // Animation sequence
    tl
      // Logo entrance with bounce
      .to(logo, {
        scale: 1.2,
        rotation: 0,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.7)"
      })
      .to(logo, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      }, "-=0.3")
      
      // Text slide up
      .to(text, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5")
      
      // Progress bar entrance
      .to(progressBar, {
        scaleX: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3")
      
      // Particles animation
      .to(particles.children, {
        opacity: 0.8,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out"
      }, "-=0.4")
      .to(particles.children, {
        y: -20,
        rotation: 360,
        duration: 2,
        repeat: -1,
        stagger: 0.1,
        ease: "none"
      }, "-=0.5");

    // Progress animation
    const progressAnimation = gsap.to(progressFill, {
      width: "100%",
      duration: 3,
      ease: "power2.inOut",
      onUpdate: () => {
        const currentProgress = Math.round(progressAnimation.progress() * 100);
        setProgress(currentProgress);
      },
      onComplete: () => {
        // Exit animation
        const exitTl = gsap.timeline({
          onComplete: () => {
            if (onComplete) onComplete();
          }
        });

        exitTl
          .to(progressBar, {
            scaleX: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in"
          })
          .to(particles.children, {
            opacity: 0,
            scale: 0,
            duration: 0.3,
            stagger: 0.02,
            ease: "power2.in"
          }, "-=0.2")
          .to(text, {
            y: -30,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in"
          }, "-=0.2")
          .to(logo, {
            scale: 0.8,
            rotation: 180,
            opacity: 0,
            duration: 0.8,
            ease: "back.in(1.7)"
          }, "-=0.3")
          .to(container, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut"
          }, "-=0.4");
      }
    });

    // Logo floating animation
    gsap.to(logo, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: 1.5
    });

    // Text glow animation
    gsap.to(text, {
      textShadow: "0 0 20px rgba(102, 126, 234, 0.8)",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: 2
    });

  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="loading-screen"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #667eea 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        overflow: 'hidden'
      }}
    >
      {/* Animated background pattern */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)',
          animation: 'backgroundMove 10s ease-in-out infinite'
        }}
      />

      {/* Particles container */}
      <div ref={particlesRef} style={{ position: 'absolute', width: '100%', height: '100%' }} />

      {/* Logo container */}
      <div 
        ref={logoRef}
        style={{
          position: 'relative',
          marginBottom: '2rem',
          filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))'
        }}
      >
        <Image
          src="/images/TextCrafterLogoWhite.png"
          alt="TextCrafter Logo"
          width={200}
          height={80}
          priority
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '200px',
            maxHeight: '80px'
          }}
        />
      </div>

      {/* Loading text */}
      <div
        ref={textRef}
        style={{
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '3rem',
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        Loading Amazing Tools...
      </div>

      {/* Progress bar container */}
      <div
        ref={progressBarRef}
        style={{
          width: '300px',
          height: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <div
          ref={progressFillRef}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
            borderRadius: '2px',
            transition: 'width 0.3s ease'
          }}
        />
      </div>

      {/* Progress percentage */}
      <div
        style={{
          color: 'white',
          fontSize: '1rem',
          fontWeight: '500',
          marginTop: '1rem',
          opacity: 0.9
        }}
      >
        {progress}%
      </div>

      <style jsx>{`
        @keyframes backgroundMove {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-2%) translateY(-1%); }
          50% { transform: translateX(2%) translateY(-2%); }
          75% { transform: translateX(-1%) translateY(2%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;