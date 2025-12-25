'use client'
import React from 'react'
import '../../../public/css/index.css'
import MissionSection from '@/components/sections/home/MissionSection'
import HeroVideo from '@/components/sections/home/HeroVideo'
import Preloader from '@/components/Layout/Preloader/Preloader'
import Footer from '@/components/Layout/Footer/Footer'
import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Spotlight from '@/components/ui/Spotlight/Spotlight'  
import TeamCards from '@/components/ui/TeamCards/TeamCards'
import { Hero, About, Features } from '@/components/sections/home/landing'

function Page() {

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });

    const onLoad = () => ScrollTrigger.refresh(true);
    window.addEventListener("load", onLoad, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", onLoad);
    };
  }, []);
  
  return (
    <>  
      <Preloader/>
      <Hero/>
      <About/>
      <HeroVideo/>
      <MissionSection/>
      <TeamCards />
      <Spotlight />
      <Features/>
      <Footer/>
    </>
  )
}

export default Page