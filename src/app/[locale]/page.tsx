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
    <HeroV2/>
    {/* <Hero/> */}
    <FirstVideo/>
    <Jason/>
    <TeamCards />
    {/* <Info/> */}
    <Spotlight />
    <Footer/>
    </>
  )
}

export default Page