import gsap from "gsap"
import { useGSAP } from "@gsap/react"

const Jason = () => {
  useGSAP(() => {
    gsap.set('.jason', { marginTop: '-30vh' });

    gsap.timeline({
      scrollTrigger: {
        trigger: '.jason',
        start: 'top 90%',
        end: '10% center',
        scrub: 2,
      }
    }).to('.first-vd', { opacity: 0, duration: 1, ease: 'power1.inOut' });

    gsap.to('.jason .img-box', {
      scrollTrigger: {
        trigger: '.jason',
        start: 'top center',
        end: '80% center',
        scrub: 2
      }, y: -300, duration: 1, ease: 'power1.inOut'
    }, '<')
  }) 

  return (
    <section className="jason">
      <div className="max-w-lg jason-content">
        <h1>Text Crafter</h1>
        <h2>Our mission to simplify writing </h2>
        <p>Our platform is designed to be simple, fast, and accessible for everyone. Whether you need basic text transformations or advanced AI-powered features, we've got you covered.</p>

        <div className="jason-2">
          <img src="/images/gsap-images/images/jason-3-2.webp" />
        </div>
      </div>

      <div className="space-y-5 mt-96 img-box">
        <div className="jason-1">
          <img src="/images/gsap-images/images/jason-3-1.webp" />
        </div>
        <div className="jason-3">
          <img src="/images/gsap-images/images/jason-3-3.webp" />
        </div>
      </div>
    </section>
  )
}

export default Jason