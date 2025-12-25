"use client";
import { useRef } from "react";
import styles from "./StudioHero.module.css";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

interface StudioHeroProps {
  title?: string;
  heroImage?: string;
}

const StudioHero: React.FC<StudioHeroProps> = ({ 
  title = "TC",
  heroImage = "/images/studio/hero.jpg"
}) => {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;

    const heroH1 = heroRef.current.querySelector(`.${styles.studioHero} h1`);
    const heroImgWrapper = heroRef.current.querySelector(`.${styles.studioHeroImgWrapper}`);

    if (heroH1) {
      const split = SplitText.create(heroH1, {
        type: "chars",
        charsClass: "char++",
      });

      split.chars.forEach((char) => {
        const charEl = char as HTMLElement;
        const wrapper = document.createElement("span");
        wrapper.className = styles.charMask;
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "inline-block";
        charEl.parentNode?.insertBefore(wrapper, charEl);
        wrapper.appendChild(charEl);
      });

      gsap.set(split.chars, { y: "100%" });

      gsap.to(split.chars, {
        y: "0%",
        duration: 0.8,
        stagger: 0.2,
        delay: 0.85,
        ease: "power3.out",
      });
    }

    if (heroImgWrapper) {
      gsap.set(heroImgWrapper, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });

      gsap.to(heroImgWrapper, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1,
        delay: 1,
        ease: "power3.out",
      });
    }
  });

  return (
    <div className={styles.studioHeroContainer} ref={heroRef}>
      <section className={styles.studioHero}>
        <h1 className={styles.caps}>{title}</h1>
      </section>

      <section className={styles.studioHeroImg}>
        <div className={styles.studioHeroImgWrapper}>
          <img src={heroImage} alt="" />
        </div>
      </section>
    </div>
  );
};

export default StudioHero;
