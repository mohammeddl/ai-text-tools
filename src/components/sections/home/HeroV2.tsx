"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { textCrafterData } from "./textCrafterData";
import "./HeroV2.css";

gsap.registerPlugin(ScrollTrigger);


const HeroV2 = () => {
  const containerRef = useRef<HTMLElement>(null);
  const logoMaskRef = useRef<SVGPathElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const overlay = containerRef.current.querySelector(".overlay") as HTMLElement;
    const heroImgContainer = containerRef.current.querySelector(".hero-img-container") as HTMLElement;
    const heroImgLogo = containerRef.current.querySelector(".hero-img-logo") as HTMLElement;
    const heroImgCopy = containerRef.current.querySelector(".hero-img-copy") as HTMLElement;
    const fadeOverlay = containerRef.current.querySelector(".fade-overlay") as HTMLElement;
    const overlayCopy = containerRef.current.querySelector(".overlay-copy h1") as HTMLElement;
    
    // Initial Styles setup (replicating snippet)
    if (overlay) {
      overlay.style.width = "100vw";
      overlay.style.height = "100vh";
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.transform = "none";
    }

    const initialOverlayScale = 500;

    const updateLogoMask = () => {
      if (!logoContainerRef.current || !logoMaskRef.current) return;
      
      const logoDimensions = logoContainerRef.current.getBoundingClientRect();
      const logoBoundingBox = logoMaskRef.current.getBBox();

      if (logoBoundingBox.width === 0 || logoBoundingBox.height === 0) return;

      const horizontalScaleRatio = logoDimensions.width / logoBoundingBox.width;
      const verticalScaleRatio = logoDimensions.height / logoBoundingBox.height;
      const logoScaleFactor = Math.min(horizontalScaleRatio, verticalScaleRatio);

      const logoHorizontalPosition =
        logoDimensions.left +
        (logoDimensions.width - logoBoundingBox.width * logoScaleFactor) / 2 -
        logoBoundingBox.x * logoScaleFactor;
      const logoVerticalPosition =
        logoDimensions.top +
        (logoDimensions.height - logoBoundingBox.height * logoScaleFactor) / 2 -
        logoBoundingBox.y * logoScaleFactor;

      logoMaskRef.current.setAttribute(
        "transform",
        `translate(${logoHorizontalPosition}, ${logoVerticalPosition}) scale(${logoScaleFactor})`
      );
    };

    // Initial update
    updateLogoMask();

    // GSAP Setups
    gsap.set(overlay, {
      transformOrigin: "50% 50%",
      xPercent: 0,
      yPercent: 0,
      left: 0,
      top: 0,
      scale: initialOverlayScale,
    });

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 5}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const scrollProgress = self.progress;
        const fadeOpacity = 1 - scrollProgress * (1 / 0.15);

        if (scrollProgress <= 0.15) {
          gsap.set([heroImgLogo, heroImgCopy], {
            opacity: fadeOpacity,
          });
        } else {
          gsap.set([heroImgLogo, heroImgCopy], {
            opacity: 0,
          });
        }

        if (scrollProgress <= 0.85) {
          const normalizedProgress = scrollProgress * (1 / 0.85);
          const heroImgContainerScale = 1.5 - 0.5 * normalizedProgress;
          const overlayScale =
            initialOverlayScale *
            Math.pow(1 / initialOverlayScale, normalizedProgress);
          let fadeOverlayOpacity = 0;

          gsap.set(heroImgContainer, {
            scale: heroImgContainerScale,
          });

          gsap.set(overlay, {
            transformOrigin: "50% 25%",
            scale: overlayScale,
            force3D: true,
          });

          if (scrollProgress >= 0.25) {
            fadeOverlayOpacity = Math.min(
              1,
              (scrollProgress - 0.25) * (1 / 0.4)
            );
          }

          gsap.set(fadeOverlay, {
            opacity: fadeOverlayOpacity,
          });
        }

        if (scrollProgress >= 0.7 && scrollProgress <= 0.85) {
          const overlayCopyRevealProgress = (scrollProgress - 0.7) * (1 / 0.15);

          const gradientSpread = 100;
          const gradientBottomPosition = 240 - overlayCopyRevealProgress * 280;
          const gradientTopPosition = gradientBottomPosition - gradientSpread;
          const overlayCopyScale = 1.25 - 0.25 * overlayCopyRevealProgress;

          if (overlayCopy) {
            overlayCopy.style.background = `linear-gradient(to bottom, #111117 0%, #111117 ${gradientTopPosition}%, #e66461 ${gradientBottomPosition}%, #e66461 100%)`;
            overlayCopy.style.backgroundClip = "text";
            // webkit prefixes are often handled by autoprefixer or inline styles manually if needed
            overlayCopy.style.webkitBackgroundClip = "text"; 
            overlayCopy.style.webkitTextFillColor = "transparent";
          }

          gsap.set(overlayCopy, {
            scale: overlayCopyScale,
            opacity: overlayCopyRevealProgress,
          });
        } else if (scrollProgress < 0.7) {
          gsap.set(overlayCopy, {
            opacity: 0,
          });
        }
      },
    });

    // Resize listener to update mask
    const handleResize = () => {
      updateLogoMask();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      scrollTriggerInstance.kill();
    };

  }, { scope: containerRef });


  return (
    <>
      <section className="hero-v2" ref={containerRef}>
        <div className="hero-img-container">
          <img src="/images/gsap-images/images/hero-bg2.webp" alt="" />

          <div className="hero-img-logo">
            <img src="/images/test/logo2.png" alt="" />
          </div>

          {/* <img src="/images/test/hero-img-layer-2.png" alt="" /> */}

          <div className="hero-img-copy">
            <p>Scroll down to reveal</p>
          </div>
        </div>

        <div className="fade-overlay"></div>

        <div className="overlay">
          <svg width="100%" height="100%">
            <defs>
              <mask id="logoRevealMask">
                <rect width="100%" height="100%" fill="white" />
                <path id="logoMask" ref={logoMaskRef} d={textCrafterData} fill="black" fillRule="evenodd"></path>
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="#111117"
              mask="url(#logoRevealMask)"
            />
          </svg>
        </div>

        <div className="logo-container" ref={logoContainerRef}></div>

        <div className="overlay-copy">
          <h1>
            Animation <br />
            Experiment 452 <br />
            By Codegrid
          </h1>
        </div>
      </section>

      <section className="hero-v2-outro">
        <p>Build your empire. Rule your city.</p>
      </section>
    </>
  );
};

export default HeroV2;
