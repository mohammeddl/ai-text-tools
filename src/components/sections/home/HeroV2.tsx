"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { textCrafterData } from "./textCrafterData";
import "./HeroV2.css";
import StudioPage from "./studio-export/StudioPage";

gsap.registerPlugin(ScrollTrigger);


const HeroV2 = () => {




  return (
    <>
      <section className="hero-v2">
        
      </section>

      <section className="">
        <p>Build your empire. Rule your city.</p>
      </section>
    </>
  );
};

export default HeroV2;
