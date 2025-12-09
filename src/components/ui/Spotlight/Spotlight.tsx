"use client";
import "./Spotlight.css";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Spotlight: React.FC = () => {
  const spotlightRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scrollTriggerInstances: ScrollTrigger[] = [];

      const initSpotlight = () => {
        new SplitType(".marquee-text-item h1", { types: "chars" });

        document
          .querySelectorAll<HTMLElement>(".marquee-container")
          .forEach((container, index) => {
            const marquee = container.querySelector<HTMLElement>(".marquee");
            const chars = container.querySelectorAll<HTMLElement>(".char");

            const marqueeTrigger = gsap.to(marquee, {
              x: index % 2 === 0 ? "5%" : "-15%",
              scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "150% top",
                scrub: true,
              },
              force3D: true,
            });

            const charsTrigger = gsap.fromTo(
              chars,
              { fontWeight: 100 },
              {
                fontWeight: 900,
                duration: 1,
                ease: "none",
                stagger: {
                  each: 0.35,
                  from: index % 2 === 0 ? "end" : "start",
                  ease: "linear",
                },
                scrollTrigger: {
                  trigger: container,
                  start: "50% bottom",
                  end: "top top",
                  scrub: true,
                },
              }
            );

            if (marqueeTrigger.scrollTrigger) {
              scrollTriggerInstances.push(marqueeTrigger.scrollTrigger);
            }
            if (charsTrigger.scrollTrigger) {
              scrollTriggerInstances.push(charsTrigger.scrollTrigger);
            }
          });

        ScrollTrigger.refresh();
      };

      const waitForOtherTriggers = () => {
        const existingTriggers = ScrollTrigger.getAll();
        const hasPinnedTrigger = existingTriggers.some(
          (trigger) => trigger.vars && trigger.vars.pin
        );

        if (hasPinnedTrigger || existingTriggers.length > 0) {
          setTimeout(initSpotlight, 300);
        } else {
          initSpotlight();
        }
      };

      setTimeout(waitForOtherTriggers, 100);

      return () => {
        scrollTriggerInstances.forEach((trigger) => trigger.kill());
      };
    },
    { scope: spotlightRef }
  );

  return (
    <section className="spotlight bg-black!" ref={spotlightRef}>
      <div className="marquees">
        <div className="marquee-container" id="marquee-1">
          <div className="marquee">
            <div className="marquee-img-item">
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop&q=80" alt="Typography Design" />
            </div>
            <div className="marquee-img-item marquee-text-item">
              <h1>Transform</h1>
            </div>
            <div className="marquee-img-item">
              <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop&q=80" alt="Text Technology" />
            </div>
            <div className="marquee-img-item">
              <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop&q=80" alt="AI Abstract" />
            </div>
            <div className="marquee-img-item">
              <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop&q=80" alt="Digital Art" />
            </div>
          </div>
        </div>

        <div className="marquee-container" id="marquee-2">
          <div className="marquee">
            <div className="marquee-img-item">
              <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop&q=80" alt="Global Technology" />
            </div>
            <div className="marquee-img-item">
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80" alt="World Connection" />
            </div>
            <div className="marquee-img-item">
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80" alt="Language Abstract" />
            </div>
            <div className="marquee-img-item marquee-text-item">
              <h1>Translate</h1>
            </div>
            <div className="marquee-img-item">
              <img src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop&q=80" alt="Communication" />
            </div>
          </div>
        </div>

        <div className="marquee-container" id="marquee-3">
          <div className="marquee">
            <div className="marquee-img-item">
              <img src="https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&h=600&fit=crop&q=80" alt="QR Code Tech" />
            </div>
            <div className="marquee-img-item marquee-text-item">
              <h1>Generate</h1>
            </div>
            <div className="marquee-img-item">
              <img src="https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=600&fit=crop&q=80" alt="Digital Code" />
            </div>
            <div className="marquee-img-item">
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&q=80" alt="Tech Innovation" />
            </div>
            <div className="marquee-img-item">
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&q=80" alt="Technology Abstract" />
            </div>
          </div>
        </div>

        <div className="marquee-container" id="marquee-4">
          <div className="marquee">
            <div className="marquee-img-item">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80" alt="Data Analytics" />
            </div>
            <div className="marquee-img-item">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80" alt="Statistics Dashboard" />
            </div>
            <div className="marquee-img-item">
              <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop&q=80" alt="Text Analysis" />
            </div>
            <div className="marquee-img-item marquee-text-item">
              <h1>Analyze</h1>
            </div>
            <div className="marquee-img-item">
              <img src="https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=600&fit=crop&q=80" alt="Colorful Data" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Spotlight;
