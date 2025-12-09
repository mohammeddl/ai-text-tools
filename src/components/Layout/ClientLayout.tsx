"use client";
import { useEffect, useState, useRef, RefObject } from "react";
import { ReactLenis } from "lenis/react";
import Menu from "./Menu/Menu";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pageRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollSettings = isMobile
    ? {
        duration: 0.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: true,
        touchMultiplier: 1.5,
        infinite: false,
        lerp: 0.09,
        wheelMultiplier: 1,
        orientation: "vertical",
        smoothWheel: true,
        syncTouch: true,
      }
    : {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
        lerp: 0.1,
        wheelMultiplier: 1,
        orientation: "vertical" as const,
        smoothWheel: true,
        syncTouch: true,
      };

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <ReactLenis root options={scrollSettings as any}>
      <Menu pageRef={pageRef as RefObject<HTMLElement>} />

      <div className="page" ref={pageRef}>
        {children}
      </div>
    </ReactLenis>
  );
}
