"use client";
import styles from "./WhoWeAre.module.css";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhoWeAre: React.FC = () => {
  useGSAP(() => {
    const whoweareScroll = document.querySelector(`.${styles.whoweareScroll}`) as HTMLElement;
    if (!whoweareScroll) return;
    
    const containerWidth = whoweareScroll.offsetWidth;
    const viewportWidth = window.innerWidth;

    const maxTranslateX = containerWidth - viewportWidth;
    const targetProgress = 1;
    const maxTranslateAtTarget = maxTranslateX / targetProgress;

    const images = [
      { id: `.${styles.whoweareImg1}`, endTranslateX: -800 },
      { id: `.${styles.whoweareImg2}`, endTranslateX: -1200 },
      { id: `.${styles.whoweareImg3}`, endTranslateX: -600 },
      { id: `.${styles.whoweareImg4}`, endTranslateX: -1000 },
      { id: `.${styles.whoweareImg5}`, endTranslateX: -900 },
    ];

    ScrollTrigger.create({
      trigger: `.${styles.whoweare}`,
      start: "top bottom",
      end: `bottom+=${window.innerHeight * 2} top`,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const clipPathValue = Math.min(progress * 100, 100);

        gsap.set(`.${styles.whoweareContainer}`, {
          clipPath: `circle(${clipPathValue}% at 50% 50%)`,
        });
      },
      onComplete: () => {
        gsap.set(`.${styles.whoweareContainer}`, {
          clipPath: `circle(100% at 50% 50%)`,
        });
      },
    });

    ScrollTrigger.create({
      trigger: `.${styles.whoweare}`,
      start: "top top",
      end: `+=${window.innerHeight * 6}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      anticipatePin: 0.5,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;

        let opacity, scale, translateX;

        if (progress <= 0.3) {
          const fadeProgress = progress / 0.3;
          opacity = fadeProgress;
          scale = 0.85 + 0.15 * fadeProgress;
          translateX = 0;
        } else {
          opacity = 1;
          scale = 1;
          const adjustedProgress = (progress - 0.3) / (1 - 0.3);
          translateX = -Math.min(
            adjustedProgress * maxTranslateAtTarget,
            maxTranslateX
          );
        }

        gsap.set(whoweareScroll, {
          opacity: opacity,
          scale: scale,
          x: translateX,
        });
      },
    });

    images.forEach((img) => {
      ScrollTrigger.create({
        trigger: `.${styles.whoweare}`,
        start: "top top",
        end: `+=${window.innerHeight * 6}`,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress >= 0.3) {
            const adjustedProgress = (progress - 0.3) / (1 - 0.3);
            gsap.set(img.id, {
              x: `${img.endTranslateX * adjustedProgress}px`,
            });
          }
        },
      });
    });
  }, []);

  return (
    <section className={styles.whoweare}>
      <div className={styles.whoweareContainer}>
        <div className={styles.whoweareScroll}>
          <div className={styles.whoweareHeader}>
            <h1>Who we are</h1>
          </div>

          <div className={`${styles.whoweareImg} ${styles.whoweareImg1}`}>
            <img src="/studio-assets/who-we-are/team-1.jpg" alt="" />
          </div>
          <div className={`${styles.whoweareImg} ${styles.whoweareImg2}`}>
            <img src="/studio-assets/who-we-are/team-2.jpg" alt="" />
          </div>
          <div className={`${styles.whoweareImg} ${styles.whoweareImg3}`}>
            <img src="/studio-assets/who-we-are/team-3.jpg" alt="" />
          </div>
          <div className={`${styles.whoweareImg} ${styles.whoweareImg4}`}>
            <img src="/studio-assets/who-we-are/team-4.jpg" alt="" />
          </div>
          <div className={`${styles.whoweareImg} ${styles.whoweareImg5}`}>
            <img src="/studio-assets/who-we-are/team-5.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
