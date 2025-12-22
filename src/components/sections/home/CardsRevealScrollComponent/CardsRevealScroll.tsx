"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import "./CardsRevealScroll.css";

gsap.registerPlugin(ScrollTrigger);

interface CardsRevealScrollProps {
  logoImage?: string;
  cardImages?: string[];
  headlineText?: string[];
  buttonText?: string;
  footerLink?: {
    href: string;
    text: string;
  };
}

export default function CardsRevealScroll({

  logoImage = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80", 
  cardImages = [
    "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80", 
    "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80", 
    "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=800&q=80", 
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80", 
    "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&q=80", 
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80", 
  ],
  headlineText = [
    "Transform your text with AI-powered tools.",
    "Simple, fast, and accessible for everyone.",
    "Unlock the power of smart writing.",
  ],
  buttonText = "Get PRO",
  footerLink = {
    href: "#",
    text: "Explore Text Tools",
  },
}: CardsRevealScrollProps) {
  useEffect(() => {
    const scrollTriggerSettings = {
      trigger: ".cards-reveal-main",
      start: "top 25%",
      toggleActions: "play reverse play reverse",
    };

    const leftXValues = [-800, -900, -400];
    const rightXValues = [800, 900, 400];
    const leftRotationValues = [-30, -20, -35];
    const rightRotationValues = [30, 20, 35];
    const yValues = [100, -150, -400];

    gsap.utils.toArray(".cards-reveal-row").forEach((row: any, index) => {
      const cardLeft = row.querySelector(".cards-reveal-card-left");
      const cardRight = row.querySelector(".cards-reveal-card-right");

      gsap.to(cardLeft, {
        x: leftXValues[index],
        scrollTrigger: {
          trigger: ".cards-reveal-main",
          start: "top center",
          end: "150% bottom",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            cardLeft.style.transform = `translateX(${
              progress * leftXValues[index]
            }px) translateY(${progress * yValues[index]}px) rotate(${
              progress * leftRotationValues[index]
            }deg)`;
            cardRight.style.transform = `translateX(${
              progress * rightXValues[index]
            }px) translateY(${progress * yValues[index]}px) rotate(${
              progress * rightRotationValues[index]
            }deg)`;
          },
        },
      });
    });

    gsap.to(".cards-reveal-logo", {
      scale: 1,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: scrollTriggerSettings,
    });

    gsap.to(".cards-reveal-line p", {
      y: 0,
      duration: 0.5,
      ease: "power1.out",
      stagger: 0.1,
      scrollTrigger: scrollTriggerSettings,
    });

    gsap.to(".cards-reveal-btn button", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power1.out",
      delay: 0.25,
      scrollTrigger: scrollTriggerSettings,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const generateRows = () => {
    const rows = [];
    for (let i = 1; i <= 3; i++) {
      rows.push(
        <div className="cards-reveal-row" key={i}>
          <div className="cards-reveal-card cards-reveal-card-left">
            <img
              src={cardImages[2 * i - 2]}
              alt=""
              width={100}
              height={100}
            />
          </div>
          <div className="cards-reveal-card cards-reveal-card-right">
            <img src={cardImages[2 * i - 1]} alt="" width={100} height={100} />
          </div>
        </div>
      );
    }
    return rows;
  };

  return (
    <ReactLenis root>
      
      

      <section className="cards-reveal-main">
        <div className="cards-reveal-main-content">
          <div className="cards-reveal-logo">
            <img src={logoImage} alt="" width={100} height={100} />
          </div>
          <div className="cards-reveal-copy">
            {headlineText.map((text, index) => (
              <div className="cards-reveal-line" key={index}>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="cards-reveal-btn">
            <button>{buttonText}</button>
          </div>
        </div>

        {generateRows()}
      </section>

      <section className="cards-reveal-footer">
        <a href={footerLink.href}>{footerLink.text}</a>
      </section>
    </ReactLenis>
  );
}
