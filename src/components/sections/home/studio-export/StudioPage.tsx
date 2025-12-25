"use client";
import { useRef } from "react";
import styles from "./studio.module.css";

import Copy from "./components/Copy/Copy";
import BtnLink from "./components/BtnLink/BtnLink";
import WhoWeAre from "./components/WhoWeAre/WhoWeAre";
import ProcessCards from "./components/ProcessCards/ProcessCards";
import Footer from "./components/Footer/Footer";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const StudioPage: React.FC = () => {
  const studioRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!studioRef.current) return;

    const studioHeroH1 = studioRef.current.querySelector(`.${styles.studioHero} h1`);
    const studioHeroImgWrapper = studioRef.current.querySelector(
      `.${styles.studioHeroImgWrapper}`
    );
    const missionLinkWrapper = studioRef.current.querySelector(`.${styles.missionLink}`);

    if (studioHeroH1) {
      const split = SplitText.create(studioHeroH1, {
        type: "chars",
        charsClass: "char++",
      });

      split.chars.forEach((char: HTMLElement) => {
        const wrapper = document.createElement("span");
        wrapper.className = styles.charMask;
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "inline-block";
        char.parentNode?.insertBefore(wrapper, char);
        wrapper.appendChild(char);
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

    if (studioHeroImgWrapper) {
      gsap.set(studioHeroImgWrapper, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });

      gsap.to(studioHeroImgWrapper, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1,
        delay: 1,
        ease: "power3.out",
      });
    }

    if (missionLinkWrapper) {
      gsap.set(missionLinkWrapper, { y: 30, opacity: 0 });

      ScrollTrigger.create({
        trigger: missionLinkWrapper.closest(`.${styles.missionIntroCopy}`),
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(missionLinkWrapper, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 1.2,
            ease: "power3.out",
          });
        },
      });
    }
  });

  return (
    <>
      <div className={styles.studio} ref={studioRef}>
        <section className={styles.studioHero}>
          <h1 className={styles.caps}>Wu</h1>
        </section>

        <section className={styles.studioHeroImg}>
          <div className={styles.studioHeroImgWrapper}>
            <img src="/studio-assets/studio/hero.jpeg" alt="" />
          </div>
        </section>

        <section className={styles.studioHeader}>
          <div className={styles.studioHeaderCopy}>
            <Copy>
              <h2>
                At Wu Wei Studio, we approach every project with quiet focus.
                Through close collaboration and considered process, we build
                digital work that reflects both the needs of our clients and the
                values of our practice.
              </h2>
            </Copy>
          </div>
        </section>

        <WhoWeAre />

        <section className={styles.missionIntro}>
          <div className={styles.missionIntroColSm}></div>
          <div className={styles.missionIntroColLg}>
            <div className={styles.missionIntroCopy}>
              <Copy>
                <h3>
                  We are a digital studio dedicated to creating clear and
                  purposeful online experiences. Our work is rooted in
                  structure, guided by systems, and shaped through close
                  collaboration.
                </h3>
                <br />
                <h3>
                  With a focus on design and development, we build scalable
                  solutions that reflect quiet precision and long-term value.
                  Every project is an exercise in restraint, intention, and
                  technical care.
                </h3>
              </Copy>

              <div className={styles.missionLink}>
                <BtnLink route="/work" label="View Work" dark />
              </div>
            </div>
          </div>
        </section>

        <ProcessCards />

        <section className={styles.recognition}>
          <div className={styles.recognitionCopy}>
            <Copy>
              <p className={`${styles.sm} ${styles.caps}`}>(Recognition)</p>
              <br />
              <h2>
                Our work has been recognized by digital platforms and design
                communities for its clarity, consistency, and attention to
                detail. We focus on building systems that go beyond visuals
                experiences.
              </h2>
            </Copy>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default StudioPage;
