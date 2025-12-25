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
      title: "Transform",
      image: "/images/process/process_001.jpeg",
      description:
        "Instantly convert text between uppercase, lowercase, title case, and more. Our powerful text transformation tools handle any formatting challenge with precision and speed.",
    },
    {
      index: "02",
      title: "Translate",
      image: "/images/process/process_002.jpeg",
      description:
        "Break language barriers with seamless translation across multiple languages. Connect with global audiences using our AI-powered translation engine.",
    },
    {
      index: "03",
      title: "Generate",
      image: "/images/process/process_003.jpeg",
      description:
        "Create QR codes, convert text to speech, and generate content effortlessly. Transform your words into shareable, accessible formats with one click.",
    },
    {
      index: "04",
      title: "Analyze",
      image: "/images/process/process_004.jpeg",
      description:
        "Get deep insights with word counting, text summarization, grammar checking, and regex testing. AI-powered analysis tools that understand your content.",
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
