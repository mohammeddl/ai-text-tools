"use client";
import { useRef } from "react";
import styles from "./Footer.module.css";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!footerRef.current) return;
      
      const textElements = footerRef.current.querySelectorAll(`.${styles.footerText}`);

      textElements.forEach((element) => {
        const textContent = element.querySelector(`.${styles.footerTextContent}`);
        if (textContent) {
          gsap.set(textContent, {
            y: "100%",
          });
        }
      });

      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 80%",
        onEnter: () => {
          textElements.forEach((element, index) => {
            const textContent = element.querySelector(`.${styles.footerTextContent}`);
            if (textContent) {
              gsap.to(textContent, {
                y: "0%",
                duration: 0.8,
                delay: index * 0.1,
                ease: "power3.out",
              });
            }
          });
        },
      });
    },
    { scope: footerRef }
  );

  return (
    <div className={styles.footer} ref={footerRef}>
      <div className={styles.footerSocials}>
        <div className={styles.fsColLg}></div>
        <div className={styles.fsColSm}>
          <div className={styles.fsHeader}>
            <div className={styles.footerText}>
              <div className={styles.footerTextContent}>
                <p className={`${styles.sm} ${styles.caps}`}>( Socials )</p>
              </div>
            </div>
          </div>
          <div className={styles.footerSocial}>
            <a href="mailto:contact@codegrid.com">
              <div className={styles.footerText}>
                <div className={styles.footerTextContent}>
                  <h2>Email</h2>
                </div>
              </div>
            </a>
          </div>
          <div className={styles.footerSocial}>
            <a href="https://www.youtube.com/@codegrid">
              <div className={styles.footerText}>
                <div className={styles.footerTextContent}>
                  <h2>LinkedIn</h2>
                </div>
              </div>
            </a>
          </div>
          <div className={styles.footerSocial}>
            <a href="https://www.youtube.com/@codegrid">
              <div className={styles.footerText}>
                <div className={styles.footerTextContent}>
                  <h2>Behance</h2>
                </div>
              </div>
            </a>
          </div>
          <div className={styles.footerSocial}>
            <a href="https://www.youtube.com/@codegrid">
              <div className={styles.footerText}>
                <div className={styles.footerTextContent}>
                  <h2>Instagram</h2>
                </div>
              </div>
            </a>
          </div>
          <div className={styles.footerSocial}>
            <a href="https://vimeo.com/codegrid">
              <div className={styles.footerText}>
                <div className={styles.footerTextContent}>
                  <h2>Vimeo</h2>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerCopy}>
        <div className={styles.fcColLg}>
          <div className={styles.footerText}>
            <div className={styles.footerTextContent}>
              <p className={`${styles.sm} ${styles.caps}`}>Developed by Codegrid</p>
            </div>
          </div>
        </div>
        <div className={styles.fcColSm}>
          <div className={styles.footerText}>
            <div className={styles.footerTextContent}>
              <p className={`${styles.sm} ${styles.caps}`}>&copy; 2025 All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
