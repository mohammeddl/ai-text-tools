"use client";

import { useGSAP } from "@gsap/react";
import React from "react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ShowCase() {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  useGSAP(() => {
    if (!isTablet) {
      // Show mask on scroll
      gsap.set('.case-mask', { opacity: 0 });
      gsap.set(".content", { opacity: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#showcase",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
        },
      });

      // When scrolling, the mask appears over the video
      tl.to(".mask", { opacity: 1, duration: 0.5 })
        .to(".mask img", { scale: 1.2, duration: 1 }, "<")
        .to(".content", { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    }
  }, [isTablet]);

  return (
    <section id='showcase' className='showcase-section'>
      <div className='media'>
        <video src='/videos/residentEvil.mp4' loop playsInline autoPlay muted />
        <div className='mask'>
          <img src='/images/big-hero-text-1 2.svg' alt='' />
        </div>
      </div>
        <div className='content'>
        <div className="wrapper">
            <h1>Experience the Future of Text Transformation</h1>
            <p>Join us on this exciting journey as we revolutionize the way you interact with text. Whether you&apos;re a student, professional, or creative, our platform is designed to make your life easier and more productive.</p>
            </div>
        </div>
    </section>
  );
}

export default ShowCase;
