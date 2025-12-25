"use client";
import styles from "./MissionSection.module.css";
import Copy from "../Copy/Copy";
import BtnLink from "../BtnLink/BtnLink";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface MissionSectionProps {
  paragraphs: string[];
  buttonLabel?: string;
  buttonRoute?: string;
}

const MissionSection: React.FC<MissionSectionProps> = ({ 
  paragraphs,
  buttonLabel = "View Work",
  buttonRoute = "/work"
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const missionLinkWrapper = sectionRef.current.querySelector(`.${styles.missionLink}`);

    if (missionLinkWrapper) {
      gsap.set(missionLinkWrapper, { y: 30, opacity: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current.querySelector(`.${styles.missionIntroCopy}`),
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
    <section className={styles.missionIntro} ref={sectionRef}>
      <div className={styles.missionIntroColSm}></div>
      <div className={styles.missionIntroColLg}>
        <div className={styles.missionIntroCopy}>
          <Copy>
            {paragraphs.map((text, index) => (
              <h3 key={index}>{text}</h3>
            ))}
          </Copy>

          <div className={styles.missionLink}>
            <BtnLink route={buttonRoute} label={buttonLabel} dark />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
