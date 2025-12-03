'use client'
import React from 'react'
import Copy from '@/components/sections/tools/Copy'

export default function page() {
  return (
    <div className='bg-white min-h-screen w-full p-10 space-y-20'>
      {/* Example 1: Single h1 with custom color */}
      <section>
        <Copy blockColor="#fe0100">
          <h1 className='text-4xl font-bold text-center text-black'>
            Framed in tungsten and shadows, every shot holds its own deliberate
            tension.
          </h1>
        </Copy>
      </section>

      {/* Example 2: Paragraph with default black color */}
      <section>
        <Copy>
          <p className='text-2xl text-center text-black max-w-3xl mx-auto'>
            This is cinematography in its raw form with practical lamps, soft
            falloff, and the presence of grain that fills each corner of the
            frame.
          </p>
        </Copy>
      </section>

      {/* Example 3: Multiple elements wrapped */}
      <section className='max-w-4xl mx-auto'>
        <Copy blockColor="#0066ff" stagger={0.2}>
          <h2 className='text-3xl font-bold text-black mb-4'>
            Still frames with bold contrast
          </h2>
          <p className='text-xl text-black'>
            Every room functions as a set and every posture becomes a
            composition. Light moves across furniture and faces, shaping scenes
            with a natural sense of depth.
          </p>
        </Copy>
      </section>

      {/* Example 4: Without scroll trigger (animates immediately) */}
      <section>
        <Copy blockColor="#00ff00" animateOnScroll={false} delay={0.5}>
          <h3 className='text-2xl font-bold text-center text-black'>
            Cinematography thrives in the details from the grain to the falloff
            to the glow.
          </h3>
        </Copy>
      </section>
    </div>
  )
}
