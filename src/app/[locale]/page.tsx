'use client'
import NavBar from '@/components/sections/home/NavBar'
import React from 'react'
import '../../../public/css/index.css'
import Hero from '@/components/sections/home/Hero'
import Jason from '@/components/sections/home/Jason'
import FirstVideo from '@/components/sections/home/FirstVideo'
import Preloader from '@/components/Layout/Preloader/Preloader'
import Footer from '@/components/Layout/Footer/Footer'
import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Spotlight from '@/components/ui/Spotlight/Spotlight'  
import TeamCards from '@/components/ui/TeamCards/TeamCards'
import HeroV2 from '@/components/sections/home/HeroV2'
import StudioPage from '@/components/sections/home/studio-export/StudioPage'
import { ProcessCards, RecognitionSection, StudioHeader, StudioHero, WhoWeAre } from '@/components/sections/home/studio-export'

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
    <StudioHero/>
    <WhoWeAre/>
    <FirstVideo/>
    <Jason/>
    <TeamCards />
    <Spotlight />
    <ProcessCards/>
    <Footer/>

    </>
  )
}

export default Page