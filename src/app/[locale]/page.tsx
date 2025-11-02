'use client'
import NavBar from '@/components/sections/home/NavBar'
import React from 'react'
import '../../../public/css/index.css'
import Hero from '@/components/sections/home/Hero'
import Jason from '@/components/sections/home/Jason'

function page() {
  return (
    <>
    <NavBar/>
    <Hero/>
    <Jason/>
    </>
  )
}

export default page