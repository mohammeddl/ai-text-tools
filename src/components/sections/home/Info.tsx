import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';


export default function Info() {

     useGSAP(() => {
        // register ScrollTrigger and set up animation that scales the mask from the top-left
        gsap.registerPlugin(ScrollTrigger);

        // ensure transform origin is top-left (applies to the wrapper div below)
        gsap.set('.mask', { transformOrigin: '0 0' });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#info',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        });

        // animate the wrapper div with class "mask"
        tl.to('.mask', { scale: 4, duration: 1, ease: 'power1.inOut' });
    })


    return (
        <>
        <section id="info" className="relative w-full overflow-hidden">

                <video src="/videos/residentEvil.mp4" className="object-cover w-full object-center" autoPlay muted loop ></video>
            
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* wrap Image in a div.mask so GSAP targets a stable element */}
                    <div
                        className="mask absolute inset-0 pointer-events-none"
                        style={{
                            // start with identity matrix so scaling is predictable
                            transform: 'matrix(1, 0, 0, 1, 0, 0)',
                            transformOrigin: '0 0',
                            mixBlendMode: 'screen',
                        }}
                    >
                        <Image
                            src="/images/gsap-images/images/mask-logo1.svg"
                            alt="mask"
                            fill
                            className="object-contain object-left-top"
                        />
                    </div>
            </div>

        </section>
        </>
    )
}