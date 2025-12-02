'use client'
import React from 'react'
import Copy from '@/components/sections/tools/Copy'

export default function page() {
  return (
    <>
      <div className=' bg-white h-screen w-full'>
        <Copy blockColor="#fe0100">
          <h1 className='text-4xl font-bold text-center text-black'>
            Framed in tungsten and shadows, every shot holds its own deliberate
            tension.
          </h1>
        </Copy>


  <Copy >
          <p className='text-2xl font-bold text-center text-black'>
            Framed in tungsten and shadows, every shot holds its own deliberate
            tension.
          </p>
        </Copy>

      </div>
      
    </>
  )
}
