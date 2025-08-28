"use client";
import FxotaryLayout from "@/layout/FxotaryLayout";
import Image from "next/image";
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations();

  return (
    <FxotaryLayout errorPage={false}>

      {/*===============================
  ABOUT DETAILS START
    ===============================*/}
      <section className='about_us pt_120 xs_pt_70 pb_120 xs_pb_70'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6 col-md-12'>
              <div className='about_text'>
                <div className='section_heading'>
                  <h5 data-text-animation=''>{t("about.ourStory")}</h5>
                  <h2
                    data-text-animation=''
                    data-split='word'
                    data-duration={1}>
                    Revolutionizing Text Processing with AI Innovation
                  </h2>
                </div>
                <p className='mb-4'>
                  At AI Text Tools, we believe in the power of artificial intelligence to transform how people work with text. Our journey began with a simple vision: to make advanced text processing accessible to everyone, regardless of technical expertise.
                </p>
                <p className='mb-4'>
                  Founded by passionate developers and AI enthusiasts, we&apos;ve created a comprehensive platform that combines cutting-edge machine learning algorithms with intuitive user interfaces. Our tools are designed to save time, enhance productivity, and unlock creative potential.
                </p>

              </div>
            </div>
            <div className='col-lg-6 col-md-12'>
              <div className='about_img_1'>
                <div className='img'>
                  <div data-animation='img-blur'>
                    <Image
                      src='/images/about_img_1.png'
                      alt='About AI Text Tools'
                      width={500}
                      height={600}
                      className='img-fluid w-100'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*===============================
  ABOUT DETAILS END
    ===============================*/}

      {/*===============================
  MISSION & VISION START
    ===============================*/}
      <section className='pt_120 xs_pt_70 pb_120 xs_pb_70' style={{ backgroundColor: '#f8f9fa' }}>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-8 text-center'>
              <div className='section_heading'>
                <h5 style={{ color: '#ff6b6b', fontWeight: '600', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '2px' }}>
                  Our Purpose
                </h5>
                <h2 data-text-animation='' data-split='word' style={{ 
                  color: '#333', 
                  fontWeight: '700',
                  marginTop: '10px',
                  marginBottom: '20px'
                }}>
                  Mission & Vision
                </h2>
              </div>
            </div>
          </div>

          <div className='row mt-5'>
            <div className='col-lg-6 mb-5'>
              <div style={{ 
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '40px 30px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                height: '100%',
                border: '1px solid #f0f0f0'
              }}>
                <div className='text-center mb-4'>
                  <div style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontSize: '36px'
                  }}>
                    🎯
                  </div>
                  <h3 style={{ color: '#333', fontWeight: '600' }}>Our Mission</h3>
                </div>
                <p style={{ color: '#666', lineHeight: '1.8', fontSize: '16px', textAlign: 'center' }}>
                  To democratize access to advanced AI-powered text processing tools, empowering individuals and businesses to communicate more effectively, create compelling content, and achieve their goals with unprecedented efficiency.
                </p>
              </div>
            </div>
            <div className='col-lg-6 mb-5'>
              <div style={{ 
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '40px 30px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                height: '100%',
                border: '1px solid #f0f0f0'
              }}>
                <div className='text-center mb-4'>
                  <div style={{ 
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontSize: '36px'
                  }}>
                    🚀
                  </div>
                  <h3 style={{ color: '#333', fontWeight: '600' }}>Our Vision</h3>
                </div>
                <p style={{ color: '#666', lineHeight: '1.8', fontSize: '16px', textAlign: 'center' }}>
                  To become the world&apos;s leading platform for intelligent text processing, where creativity meets artificial intelligence to transform how people interact with and manipulate textual content across all industries and applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*===============================
  MISSION & VISION END
    ===============================*/}

      {/*===============================
  TEAM VALUES START
    ===============================*/}
      <section className='pt_120 xs_pt_70 pb_120 xs_pb_70'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-8 text-center'>
              <div className='section_heading'>
                <h5 data-text-animation=''>Our Values</h5>
                <h2 data-text-animation='' data-split='word'>
                  What Drives Us Forward
                </h2>
                <p className='mt-3' style={{ color: '#666', fontSize: '16px', lineHeight: '1.6' }}>
                  Our core values shape every decision we make and every tool we create.
                </p>
              </div>
            </div>
          </div>

          <div className='row mt-5'>
            {[
              { 
                icon: '💡', 
                title: 'Innovation', 
                desc: 'Continuously pushing the boundaries of what\'s possible with AI and text processing technology.',
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              },
              { 
                icon: '🤝', 
                title: 'Accessibility', 
                desc: 'Making powerful AI tools available to everyone, regardless of technical background or experience.',
                gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
              },
              { 
                icon: '⚡', 
                title: 'Performance', 
                desc: 'Delivering fast, reliable, and efficient tools that save time and boost productivity.',
                gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
              },
              { 
                icon: '🔒', 
                title: 'Privacy', 
                desc: 'Protecting user data and ensuring complete privacy in all text processing operations.',
                gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
              },
              { 
                icon: '🎨', 
                title: 'Creativity', 
                desc: 'Empowering users to unlock their creative potential through intelligent text manipulation.',
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
              },
              { 
                icon: '🌍', 
                title: 'Global Impact', 
                desc: 'Building tools that serve users worldwide and break down language and communication barriers.',
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }
            ].map((value, index) => (
              <div key={index} className='col-lg-4 col-md-6 mb-4'>
                <div 
                  className='text-center p-4'
                  style={{ 
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    border: '1px solid #f0f0f0'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
                  }}>
                  <div style={{ 
                    background: value.gradient,
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontSize: '30px'
                  }}>
                    {value.icon}
                  </div>
                  <h4 style={{ color: '#333', marginBottom: '15px', fontWeight: '600' }}>
                    {value.title}
                  </h4>
                  <p style={{ color: '#666', lineHeight: '1.6', fontSize: '14px', margin: '0' }}>
                    {value.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/*===============================
  TEAM VALUES END
    ===============================*/}

    </FxotaryLayout>
  );
};

export default AboutPage;
