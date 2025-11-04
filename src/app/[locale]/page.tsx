'use client'
import NavBar from '@/components/sections/home/NavBar'
import React from 'react'
import '../../../public/css/index.css'
import Hero from '@/components/sections/home/Hero'
import Jason from '@/components/sections/home/Jason'
import FirstVideo from '@/components/sections/home/FirstVideo'
import Info from '@/components/sections/home/Info'

function page() {
  return (
    <>
    <NavBar/>
    <Hero/>
    <FirstVideo/>
    <Jason/>
    <Info/>
    </>
  )
}

export default page