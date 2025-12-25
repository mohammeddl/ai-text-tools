"use client";
import styles from "./ProcessCards.module.css";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProcessCardData {
  index: string;
  title: string;
  image: string;
  description: string;
}

const ProcessCards: React.FC = () => {
  const processCardsData: ProcessCardData[] = [
    {
      index: "01",
      title: "Principles",
      image: "/images/process/process_001.jpeg",
      description:
        "We design with restraint and intention. Every decision is shaped by a set of values—clarity, structure, and calm execution.",
    },
    {
      index: "02",
      title: "Approach",
      image: "/images/process/process_002.jpeg",
      description:
        "Our process is iterative and deliberate. We prioritize simplicity over excess, and build systems that scale with clarity.",
    },
    {
      index: "03",
      title: "Practice",
      image: "/images/process/process_003.jpeg",
      description:
        "We work at the intersection of design and code. Every detail is shaped by consistency, rhythm, and quiet precision.",
    },
    {
      index: "04",
      title: "Vision",
      image: "/images/process/process_004.jpeg",
      description:
        "We believe the web should feel honest and effortless. Our aim is to create digital experiences that stand the test of time.",
    },
  ];

  useGSAP(() => {
    const processCards = document.querySelectorAll(`.${styles.processCard}`);

    processCards.forEach((card, index) => {
      if (index < processCards.length - 1) {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: processCards[processCards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
          id: `card-pin-${index}`,
        });
      }

      if (index < processCards.length - 1) {
        ScrollTrigger.create({
          trigger: processCards[index + 1],
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            const progress = self.progress;
            const scale = 1 - progress * 0.25;
            const rotation = (index % 2 === 0 ? 5 : -5) * progress;
            const afterOpacity = progress;

            gsap.set(card, {
              scale: scale,
              rotation: rotation,
              "--after-opacity": afterOpacity,
            });
          },
        });
      }
    });
  }, []);

  return (
    <section className={styles.processCardsWrapper}>
      <div className={styles.processCards}>
        {processCardsData.map((cardData, index) => (
          <div key={index} className={styles.processCard}>
            <div className={styles.processCardIndex}>
              <h1>{cardData.index}</h1>
            </div>
            <div className={styles.processCardContent}>
              <div className={styles.processCardContentWrapper}>
                <h1 className={styles.processCardHeader}>{cardData.title}</h1>

                <div className={styles.processCardImg}>
                  <img src={cardData.image} alt="" />
                </div>

                <div className={styles.processCardCopy}>
                  <div className={styles.processCardCopyTitle}>
                    <p className={styles.caps}>(About the state)</p>
                  </div>
                  <div className={styles.processCardCopyDescription}>
                    <p>{cardData.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessCards;
