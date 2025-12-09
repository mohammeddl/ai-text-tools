'use client'
import NavBar from '@/components/sections/home/NavBar'
import React from 'react'
import '../../../public/css/index.css'
import Hero from '@/components/sections/home/Hero'
import Jason from '@/components/sections/home/Jason'
import FirstVideo from '@/components/sections/home/FirstVideo'
import Preloader from '@/components/layout/Preloader/Preloader'
import Footer from '@/components/layout/Footer/Footer'
import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Spotlight from '@/components/ui/Spotlight/Spotlight'  
import TeamCards from '@/components/ui/TeamCards/TeamCards'

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