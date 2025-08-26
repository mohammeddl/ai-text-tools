"use client";
import FxotaryLayout from "@/layout/FxotaryLayout";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";

const ContactPage = () => {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('');
      }, 5000);
    }, 2000);
  };

  return (
    <FxotaryLayout errorPage={false}>
      {/*===============================
  BANNER START
    ===============================*/}
      <section
        className='banner'
        style={{ background: "url(/images/banner_bg.png)" }}>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='banner_text'>
                <h4>{t("contact.subtitle")}</h4>
                <h1 className='banner_title'>
                  {t("contact.title")}{" "}
                  <span>
                    <b></b>
                  </span>
                </h1>
                <p className='mt-4' style={{ color: '#fff', fontSize: '18px', maxWidth: '600px' }}>
                  Get in touch with us. We&apos;re here to help and answer any questions you might have.
                </p>
              </div>
            </div>
          </div>
        </div>
        <ul className='d-flex flex-wrap'>
          <li>
            <span>{t("common.followUs")}</span>
          </li>
          <li>
            <a href='https://www.linkedin.com/in/daali-mohammed-85736b271'>LK.</a>
          </li>
          <li>
            <a href='https://github.com/mohammeddl'>GH.</a>
          </li>
        </ul>
      </section>
      {/*===============================
  BANNER END
    ===============================*/}

      {/*===============================
  CONTACT FORM START
    ===============================*/}
      <section className='pt_120 xs_pt_70 pb_120 xs_pb_70'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8 mx-auto'>
              <div className='section_heading text-center mb-5'>
                <h5 data-text-animation=''>Send us a Message</h5>
                <h2 data-text-animation='' data-split='word'>
                  We&apos;d Love to Hear From You
                </h2>
                <p className='mt-3' style={{ color: '#666', fontSize: '16px', lineHeight: '1.6' }}>
                  Have questions, feedback, or need support? Drop us a message and we&apos;ll get back to you as soon as possible.
                </p>
              </div>

              <div style={{ 
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '50px 40px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                border: '1px solid #f0f0f0'
              }}>
                <form onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col-md-6 mb-4'>
                      <label style={{ 
                        color: '#333', 
                        fontWeight: '500', 
                        marginBottom: '10px', 
                        display: 'block',
                        fontSize: '14px'
                      }}>
                        Full Name *
                      </label>
                      <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '15px 20px',
                          border: '2px solid #f0f0f0',
                          borderRadius: '12px',
                          fontSize: '16px',
                          transition: 'all 0.3s ease',
                          outline: 'none'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#667eea';
                          e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#f0f0f0';
                          e.target.style.boxShadow = 'none';
                        }}
                        placeholder='Enter your full name'
                      />
                    </div>
                    <div className='col-md-6 mb-4'>
                      <label style={{ 
                        color: '#333', 
                        fontWeight: '500', 
                        marginBottom: '10px', 
                        display: 'block',
                        fontSize: '14px'
                      }}>
                        Email Address *
                      </label>
                      <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '15px 20px',
                          border: '2px solid #f0f0f0',
                          borderRadius: '12px',
                          fontSize: '16px',
                          transition: 'all 0.3s ease',
                          outline: 'none'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#667eea';
                          e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#f0f0f0';
                          e.target.style.boxShadow = 'none';
                        }}
                        placeholder='Enter your email address'
                      />
                    </div>
                    <div className='col-12 mb-4'>
                      <label style={{ 
                        color: '#333', 
                        fontWeight: '500', 
                        marginBottom: '10px', 
                        display: 'block',
                        fontSize: '14px'
                      }}>
                        Subject *
                      </label>
                      <input
                        type='text'
                        name='subject'
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '15px 20px',
                          border: '2px solid #f0f0f0',
                          borderRadius: '12px',
                          fontSize: '16px',
                          transition: 'all 0.3s ease',
                          outline: 'none'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#667eea';
                          e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#f0f0f0';
                          e.target.style.boxShadow = 'none';
                        }}
                        placeholder='What is this regarding?'
                      />
                    </div>
                    <div className='col-12 mb-4'>
                      <label style={{ 
                        color: '#333', 
                        fontWeight: '500', 
                        marginBottom: '10px', 
                        display: 'block',
                        fontSize: '14px'
                      }}>
                        Message *
                      </label>
                      <textarea
                        name='message'
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        style={{
                          width: '100%',
                          padding: '15px 20px',
                          border: '2px solid #f0f0f0',
                          borderRadius: '12px',
                          fontSize: '16px',
                          transition: 'all 0.3s ease',
                          outline: 'none',
                          resize: 'vertical',
                          minHeight: '120px'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#667eea';
                          e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#f0f0f0';
                          e.target.style.boxShadow = 'none';
                        }}
                        placeholder='Tell us more about your inquiry...'
                      />
                    </div>
                    <div className='col-12 text-center'>
                      {submitStatus === 'success' && (
                        <div style={{
                          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                          color: 'white',
                          padding: '15px 25px',
                          borderRadius: '12px',
                          marginBottom: '20px',
                          fontSize: '16px',
                          fontWeight: '500'
                        }}>
                          ✅ Message sent successfully! We&apos;ll get back to you soon.
                        </div>
                      )}
                      <button
                        type='submit'
                        disabled={isSubmitting}
                        style={{
                          background: isSubmitting 
                            ? 'linear-gradient(135deg, #ccc 0%, #999 100%)' 
                            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          padding: '18px 50px',
                          border: 'none',
                          borderRadius: '50px',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: isSubmitting ? 'not-allowed' : 'pointer',
                          transition: 'all 0.3s ease',
                          minWidth: '200px'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSubmitting) {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSubmitting) {
                            e.currentTarget.style.transform = 'translateY(0px)';
                            e.currentTarget.style.boxShadow = 'none';
                          }
                        }}>
                        {isSubmitting ? (
                          <>
                            <span style={{ marginRight: '10px' }}>⏳</span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <span style={{ marginRight: '10px' }}>📧</span>
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*===============================
  CONTACT FORM END
    ===============================*/}

      {/*===============================
  CONTACT INFO START
    ===============================*/}
      <section className='pt_120 xs_pt_70 pb_120 xs_pb_70' style={{ backgroundColor: '#f8f9fa' }}>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-8 text-center'>
              <div className='section_heading'>
                <h5 style={{ color: '#ff6b6b', fontWeight: '600', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '2px' }}>
                  Get in Touch
                </h5>
                <h2 data-text-animation='' data-split='word' style={{ 
                  color: '#333', 
                  fontWeight: '700',
                  marginTop: '10px',
                  marginBottom: '20px'
                }}>
                  Other Ways to Reach Us
                </h2>
                <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6' }}>
                  Choose the method that works best for you to get in touch with our team.
                </p>
              </div>
            </div>
          </div>

          <div className='row mt-5'>
            <div className='col-lg-4 col-md-6 mb-4'>
              <div 
                style={{ 
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  padding: '40px 30px',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '1px solid #f0f0f0',
                  height: '100%',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08)';
                }}>
                <div style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '30px'
                }}>
                  📧
                </div>
                <h4 style={{ color: '#333', marginBottom: '15px', fontWeight: '600' }}>
                  Email Us
                </h4>
                <p style={{ color: '#666', lineHeight: '1.6', fontSize: '14px', marginBottom: '15px' }}>
                  Send us an email and we&apos;ll respond within 24 hours
                </p>
                <a 
                  href='mailto:support@aitexttools.com' 
                  style={{ 
                    color: '#667eea', 
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#764ba2';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#667eea';
                  }}>
                  support@aitexttools.com
                </a>
              </div>
            </div>

            <div className='col-lg-4 col-md-6 mb-4'>
              <div 
                style={{ 
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  padding: '40px 30px',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '1px solid #f0f0f0',
                  height: '100%',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08)';
                }}>
                <div style={{ 
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '30px'
                }}>
                  💬
                </div>
                <h4 style={{ color: '#333', marginBottom: '15px', fontWeight: '600' }}>
                  Live Chat
                </h4>
                <p style={{ color: '#666', lineHeight: '1.6', fontSize: '14px', marginBottom: '15px' }}>
                  Chat with our support team in real-time
                </p>
                <button 
                  style={{ 
                    background: 'transparent',
                    border: '2px solid #4facfe',
                    color: '#4facfe',
                    padding: '10px 25px',
                    borderRadius: '25px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#4facfe';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#4facfe';
                  }}
                  onClick={() => alert('Live chat feature coming soon!')}>
                  Start Chat
                </button>
              </div>
            </div>

            <div className='col-lg-4 col-md-6 mb-4'>
              <div 
                style={{ 
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  padding: '40px 30px',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '1px solid #f0f0f0',
                  height: '100%',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08)';
                }}>
                <div style={{ 
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '30px'
                }}>
                  🐛
                </div>
                <h4 style={{ color: '#333', marginBottom: '15px', fontWeight: '600' }}>
                  Report a Bug
                </h4>
                <p style={{ color: '#666', lineHeight: '1.6', fontSize: '14px', marginBottom: '15px' }}>
                  Found an issue? Help us improve by reporting bugs
                </p>
                <Link 
                  href='https://github.com/mohammeddl'
                  style={{ 
                    color: '#f093fb', 
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#f5576c';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#f093fb';
                  }}>
                  GitHub Issues
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*===============================
  CONTACT INFO END
    ===============================*/}

      {/*===============================
  FAQ SECTION START
    ===============================*/}
      <section className='pt_120 xs_pt_70 pb_120 xs_pb_70'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-8 text-center'>
              <div className='section_heading'>
                <h5 data-text-animation=''>Frequently Asked Questions</h5>
                <h2 data-text-animation='' data-split='word'>
                  Quick Answers to Common Questions
                </h2>
                <p className='mt-3' style={{ color: '#666', fontSize: '16px', lineHeight: '1.6' }}>
                  Find answers to the most commonly asked questions about our AI text tools.
                </p>
              </div>
            </div>
          </div>

          <div className='row mt-5'>
            <div className='col-lg-8 mx-auto'>
              {[
                {
                  q: "How does AI text processing work?",
                  a: "Our AI text tools use advanced natural language processing algorithms to analyze, transform, and generate text. The AI models are trained on vast datasets to understand context, grammar, and semantic meaning, enabling them to perform complex text operations with high accuracy."
                },
                {
                  q: "Is my data secure and private?",
                  a: "Absolutely! We take privacy seriously. Your text data is processed securely and is never stored on our servers permanently. All processing happens in real-time, and your content is deleted immediately after processing is complete."
                },
                {
                  q: "Are there any usage limits?",
                  a: "Our basic tools are completely free to use with generous daily limits. For power users who need higher limits or premium features, we offer subscription plans that provide unlimited access and additional AI-powered capabilities."
                },
                {
                  q: "Can I use these tools for commercial purposes?",
                  a: "Yes, you can use our tools for both personal and commercial purposes. The generated content is yours to use however you see fit, whether for business, education, or personal projects."
                },
                {
                  q: "Do you offer API access?",
                  a: "We're currently developing API access for developers who want to integrate our text processing capabilities into their own applications. Stay tuned for updates on API availability."
                }
              ].map((faq, index) => (
                <div key={index} className='mb-3'>
                  <div 
                    style={{ 
                      backgroundColor: 'white',
                      borderRadius: '15px',
                      border: '1px solid #f0f0f0',
                      overflow: 'hidden',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
                    }}>
                    <div 
                      style={{
                        padding: '25px 30px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={(e) => {
                        const content = e.currentTarget.nextElementSibling as HTMLElement;
                        const isOpen = content.style.maxHeight !== '0px' && content.style.maxHeight !== '';
                        
                        if (isOpen) {
                          content.style.maxHeight = '0px';
                          content.style.opacity = '0';
                        } else {
                          content.style.maxHeight = content.scrollHeight + 'px';
                          content.style.opacity = '1';
                        }
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                      }}>
                      <h5 style={{ 
                        color: '#333', 
                        marginBottom: '0',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        {faq.q}
                        <span style={{ fontSize: '20px', marginLeft: '15px' }}>+</span>
                      </h5>
                    </div>
                    <div 
                      style={{ 
                        maxHeight: '0px',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        opacity: '0'
                      }}>
                      <div style={{ padding: '0 30px 25px' }}>
                        <p style={{ 
                          color: '#666', 
                          lineHeight: '1.6',
                          margin: '0',
                          fontSize: '15px'
                        }}>
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/*===============================
  FAQ SECTION END
    ===============================*/}
    </FxotaryLayout>
  );
};

export default ContactPage;
