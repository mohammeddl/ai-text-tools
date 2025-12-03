'use client'
import NavBar from '@/components/sections/home/NavBar'
import React from 'react'
import '../../../public/css/index.css'
import Hero from '@/components/sections/home/Hero'
import Jason from '@/components/sections/home/Jason'
import FirstVideo from '@/components/sections/home/FirstVideo'
import Info from '@/components/sections/home/Info'
import Preloader from '@/components/perloader/Preloader'
import Footer from '@/components/Footer/Footer'
import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Spotlight from '@/components/Spotlight/Spotlight'  
import TeamCards from '@/components/TeamCards/TeamCards'

function page() {

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
    {/* <NavBar/> */}
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

export default page