"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useMaskSettings } from '../../../../public/constants';
import ComingSoon from "./ComingSoon"

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { initialMaskPos, initialMaskSize, maskPos, maskSize } = useMaskSettings();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    gsap.set('.mask-wrapper', {
      maskPosition: initialMaskPos,
      maskSize: initialMaskSize,
    });

    gsap.set('.mask-logo', { marginTop: '-100vh', opacity: 0 });

    gsap.set('.entrance-message', { marginTop: '0vh' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        scrub: 2.5,
        end: '+=200%',
        pin: true,
      }
    })

    tl
      .to('.fade-out', { opacity: 0, ease: 'power1.inOut' })
      .to('.scale-out', { scale: 1, ease: 'power1.inOut' })
      .to('.mask-wrapper', { maskSize, ease: 'power1.inOut' }, '<')
      .to('.mask-wrapper', { opacity: 0 })
      .to('.overlay-logo', { opacity: 1, onComplete: () => {
        gsap.to('.overlay-logo', { opacity: 0 });
      } }, '<')
      .to('.entrance-message', { duration: 1, ease: 'power1.inOut', maskImage: 'radial-gradient(circle at 50% 0vh, black 50%, transparent 100%)' }, '<')
  });

  return (
    <section className="hero-section">
      <div className="size-full mask-wrapper">
        <img src="/images/gsap-images/images/hero-bg2.webp" alt="background" className="scale-out" />
        <img src="/images/gsap-images/images/hero-text1.webp" alt="hero-logo" className="title-logo fade-out" />
        {/* <img  src="/images/gsap-images/images/watch-trailer.png" alt="trailer" className="trailer-logo fade-out" /> */}
        {/* <div className="play-img fade-out">
          <img src="/images/gsap-images/images/play.png" alt="play" className="w-7 ml-1" />
        </div> */}
      </div>

      <div>
        <img src="/images/gsap-images/images/big-hero-text-1 2.svg" alt="logo" className="size-full object-cover mask-logo" />
      </div>

      {/* Animated Scroll Indicator */}
      <div 
        className="scroll-indicator-wrapper"
        style={{
          opacity: showScrollIndicator ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          pointerEvents: showScrollIndicator ? 'auto' : 'none'
        }}
      >
        <div className="scroll-mouse-icon">
          <div className="scroll-wheel"></div>
        </div>
        <p className="scroll-text">Scroll</p>
      </div>

      <ComingSoon />
    </section>
  )
}

export default Hero