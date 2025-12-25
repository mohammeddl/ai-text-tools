import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from "react"

const FirstVideo = () => {
  const videoRef = useRef(null);

  useGSAP(() => {
    gsap.set('.first-vd-wrapper', { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.first-vd-wrapper',
        start: 'top top',
        end: '+=200% top',
        scrub: true,
        pin: true,
      }
    })

    tl.to('.hero-section', { delay: 0.5, opacity: 0, ease: 'power1.inOut' });
    tl.to('.first-vd-wrapper', { opacity: 1, duration: 2, ease: 'power1.inOut' });

    if (videoRef.current) {
      (videoRef.current as HTMLVideoElement).onloadedmetadata = () => {
        if (!videoRef.current) return;
        tl.to(videoRef.current, { currentTime: (videoRef.current as HTMLVideoElement).duration, duration: 4, ease: 'power1.inOut' }, '<');
      }
    }
  }, []);

  return (
    <section className="first-vd-wrapper">
      <div className="h-dvh">
        <video 
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/bg-video.mp4"
          className="first-vd"
        />
      </div>
    </section>
  )
}

export default FirstVideo