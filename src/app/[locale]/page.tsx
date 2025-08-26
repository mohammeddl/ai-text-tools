"use client";
import FxotaryLayout from "@/layout/FxotaryLayout";
import Link from "next/link";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations();

  return (
    <FxotaryLayout errorPage={false}>
      {/*===============================
  BANNER START
    ===============================*/}
      <section
        className='banner'
        style={{ background: "url(images/banner_bg.png)" }}>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='banner_text'>
                <h4>{t("banner.subtitle")}</h4>
                <h1 className='banner_title'>
                  {t("banner.title")}{" "}
                  <span>
                    <b></b>
                  </span>
                </h1>
              </div>
              <div className='banner_img'>
                <div className='overflow-hidden'>
                  <Image
                    src='/images/banner_img_1.png'
                    alt='banner'
                    width={800}
                    height={600}
                    className='img-fluid w-100'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className='d-flex flex-wrap'>
          <li>
            <span>{t("common.followUs")}</span>
          </li>
          <li>
            <a href='www.linkedin.com/in/daali-mohammed-85736b271'>LK.</a>
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
  ABOUT START
    ===============================*/}
      <section className='about_us pt_120 xs_pt_70 pb_120 xs_pb_70'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-4 col-md-7'>
              <div className='about_text'>
                <div className='section_heading'>
                  <h5 data-text-animation=''>{t("about.subtitle")}</h5>
                  <h2
                    data-text-animation=''
                    data-split='word'
                    data-duration={1}>
                    {t("about.title")}
                  </h2>
                </div>
                <Link className='circle_btn' href='about_us'>
                  {t("common.learnMore")} <i className='fx-icon-next-arrow' />
                </Link>
              </div>
            </div>
            <div className='col-lg-5 col-md-7'>
              <div className='about_img_1'>
                <div className='img'>
                  <div data-animation='img-blur'>
                    <Image
                      src='/images/about_img_1.png'
                      alt='about'
                      width={500}
                      height={600}
                      className='img-fluid w-100'
                    />
                  </div>
                </div>
                <p>{t("about.description")}</p>
              </div>
            </div>
            <div className='col-lg-3 col-md-5'>
              <div className='about_img_2'>
                <div data-animation='img-blur'>
                  <Image
                    src='/images/about_img_2.png'
                    alt='about'
                    width={350}
                    height={400}
                    className='img-fluid w-100'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*===============================
  ABOUT END
    ===============================*/}
      {/*===============================
  WHAT WE DO START
    ===============================*/}
      <section className='what_we_do pt_120 xs_pt_70 pb_120 xs_pb_70'>
        <div className='container'>
          <div className='row justify-content-between'>
            <div className='col-xl-5 col-md-7'>
              <div className='what_we_do_text'>
                <p>{t("features.description")}</p>
                <Link className='view_btn' href={`/${locale}/tools`}>
                  {t("about.viewServices")} <i className='fx-icon-next-arrow' />
                </Link>
              </div>
            </div>
            <div className='col-xl-5 col-md-5'>
              <div className='section_heading'>
                <h5 data-text-animation=''>{t("features.subtitle")}</h5>
                <h2 data-text-animation='' data-split='word'>
                  {t("features.title")}
                </h2>
              </div>
            </div>
          </div>
          <hr />
          <div className='row'>
            <div className='col-12'>
              <ul>
                <li
                  data-animation=''
                  className='image-view'>
                  <div className='icon'>
                    <Image
                      src='/icons/ui-ux.svg'
                      alt='AI Content'
                      width={64}
                      height={64}
                      className='img-fluid w-100 svg'
                    />
                  </div>
                  <div className='text'>
                    <h3>🤖 {t("features.aiContentGeneration.title")}</h3>
                    <p>{t("features.aiContentGeneration.description")}</p>
                  </div>
                  <Link className='circle_btn' href={`/${locale}/tools`}>
                    {t("common.details")}
                  </Link>
                </li>
                <li
                  data-animation=''
                  className='image-view'>
                  <div className='icon'>
                    <Image
                      src='/icons/web-programming.svg'
                      alt='Text Analysis'
                      width={64}
                      height={64}
                      className='img-fluid w-100 svg'
                    />
                  </div>
                  <div className='text'>
                    <h3>📊 {t("features.smartTextAnalysis.title")}</h3>
                    <p>{t("features.smartTextAnalysis.description")}</p>
                  </div>
                </li>
                <li
                  data-animation=''
                  className='image-view'>
                  <div className='icon'>
                    <Image
                      src='/icons/megaphone.svg'
                      alt='Auto Formatting'
                      width={64}
                      height={64}
                      className='img-fluid w-100 svg'
                    />
                  </div>
                  <div className='text'>
                    <h3>✨ {t("features.autoFormatting.title")}</h3>
                    <p>{t("features.autoFormatting.description")}</p>
                  </div>
                  <Link className='circle_btn' href={`/${locale}/tools`}>
                    {t("common.details")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/*===============================
  WHAT WE DO END
    ===============================*/}
      {/*===============================
  LATEST PROJECT START
    ===============================*/}
      <section className='latest_project pt_120 xs_pt_70 pb_120 xs_pb_70'>
        <div className='container'>
          <div className='row justify-content-between'>
            <div className='col-xl-5 col-md-6'>
              <div className='latest_project_text'>
                <div className='section_heading'>
                  <h5>{t("projects.subtitle")}</h5>
                  <h2 data-text-animation='' data-split='char'>
                    {t("projects.title")}
                  </h2>
                </div>
                <p>{t("projects.description")}</p>
              </div>
              <Link
                href='portfolio_details'
                className='latest_project_img d-block cursor-arrow c-pointer'
                data-cursor='<i class="fx-icon-long-next-arrow"></i>'>
                <div data-animation='img-blur'>
                  <Image
                    src='/images/project_img_1.png'
                    alt='AI Content Generation'
                    width={400}
                    height={300}
                    className='img-fluid w-100'
                  />
                </div>
                <div className='text d-flex flex-column'>
                  <h3>🤖 {t("features.aiCompletion.title")}</h3>
                  <h3>Advanced AI Processing</h3>
                </div>
              </Link>
            </div>
            <div className='col-xl-5 col-md-6'>
              <Link
                href='portfolio_details'
                className='latest_project_img d-block cursor-arrow latest_project_img_2 c-pointer'
                data-cursor='<i class="fx-icon-long-next-arrow"></i>'>
                <div data-animation='img-blur'>
                  <Image
                    src='/images/project_img_2.png'
                    alt='Smart Text Analysis'
                    width={400}
                    height={300}
                    className='img-fluid w-100'
                  />
                </div>
                <div className='text d-flex flex-column'>
                  <h3>📊 {t("features.styledText.title")}</h3>
                  <h3>Smart Text Analytics</h3>
                </div>
              </Link>
              <h4>{t("projects.moreProjects")}</h4>
            </div>
          </div>
        </div>
        <div className='row mt_175 marquee_section'>
          <div className='col-12'>
            <div className='marquee-container'>
              <Marquee className='marquee_animi' direction='left'>
                <ul className='project_slider d-flex flex-wrap'>
                  <li>
                    <Link href={`/${locale}/tools`}>
                      <p>🧠 {t("features.languageProcessing.title")}</p>
                      <div className='img'>
                        <div style={{ 
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          width: '100%',
                          height: '120px',
                          borderRadius: '5px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '2rem'
                        }}>
                          🧠
                        </div>
                        <span>01</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/tools`}>
                      <p>📈 {t("features.bulkProcessing.title")}</p>
                      <div className='img'>
                        <div style={{ 
                          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                          width: '100%',
                          height: '120px',
                          borderRadius: '5px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '2rem'
                        }}>
                          📈
                        </div>
                        <span>02</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/tools`}>
                      <p>🤖 {t("features.aiContentGeneration.title")}</p>
                      <div className='img'>
                        <div style={{ 
                          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                          width: '100%',
                          height: '120px',
                          borderRadius: '5px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '2rem'
                        }}>
                          🤖
                        </div>
                        <span>03</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/tools`}>
                      <p>📊 {t("features.smartTextAnalysis.title")}</p>
                      <div className='img'>
                        <div style={{ 
                          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                          width: '100%',
                          height: '120px',
                          borderRadius: '5px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '2rem'
                        }}>
                          📊
                        </div>
                        <span>04</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/tools`}>
                      <p>✨ {t("features.autoFormatting.title")}</p>
                      <div className='img'>
                        <div style={{ 
                          background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                          width: '100%',
                          height: '120px',
                          borderRadius: '5px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#333',
                          fontSize: '2rem'
                        }}>
                          ✨
                        </div>
                        <span>05</span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </Marquee>
            </div>
          </div>
          <div className='col-12 mt_30'>
            <Marquee className='marquee_animi2' direction='right'>
              <ul className='project_slider d-flex flex-wrap'>
                <li>
                  <Link href={`/${locale}/tools`}>
                    <p>🤖 {t("features.aiCompletion.title")}</p>
                    <div className='img'>
                      <div style={{ 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        width: '100%',
                        height: '120px',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '2rem'
                      }}>
                        🤖
                      </div>
                      <span>01</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/tools`}>
                    <p>📊 {t("features.styledText.title")}</p>
                    <div className='img'>
                      <div style={{ 
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        width: '100%',
                        height: '120px',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '2rem'
                      }}>
                        📊
                      </div>
                      <span>02</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/tools`}>
                    <p>🧠 {t("features.languageProcessing.title")}</p>
                    <div className='img'>
                      <div style={{ 
                        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        width: '100%',
                        height: '120px',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '2rem'
                      }}>
                        🧠
                      </div>
                      <span>03</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/tools`}>
                    <p>📈 {t("features.bulkProcessing.title")}</p>
                    <div className='img'>
                      <div style={{ 
                        background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                        width: '100%',
                        height: '120px',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '2rem'
                      }}>
                        📈
                      </div>
                      <span>04</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/tools`}>
                    <p>✨ {t("features.autoFormatting.title")}</p>
                    <div className='img'>
                      <div style={{ 
                        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                        width: '100%',
                        height: '120px',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#333',
                        fontSize: '2rem'
                      }}>
                        ✨
                      </div>
                      <span>05</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </Marquee>
          </div>
        </div>
      </section>
      {/*===============================
  LATEST PROJECT END
    ===============================*/}
      {/*===============================
  COUNTER END
    ===============================*/}

      <section className='about_us pt_120 xs_pt_70 pb_120 xs_pb_70' style={{ backgroundColor: '#f8f9fa' }}>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-8 text-center'>
              <div className='section_heading'>
                <h5 style={{ color: '#ff6b6b', fontWeight: '600', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '2px' }}>
                  {t("upcomingFeatures.subtitle")}
                </h5>
                <h2 data-text-animation='' data-split='word' style={{ 
                  color: '#333', 
                  fontWeight: '700',
                  marginTop: '10px',
                  marginBottom: '20px'
                }}>
                  {t("upcomingFeatures.title")}
                </h2>
                <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6' }}>
                  {t("upcomingFeatures.description")}
                </p>
              </div>
            </div>
          </div>

          <div className='row mt-5'>
            {[
              { key: "aiSummarization" },
              { key: "contentOptimization" },
              { key: "voiceToText" },
              { key: "multilanguageAI" },
              { key: "sentimentAnalysis" }
            ].map((feature) => (
              <div key={feature.key} className='col-lg-4 col-md-6 mb-4'>
                <div className='upcoming-feature-card position-relative overflow-hidden' style={{ 
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  padding: '30px 20px',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '1px solid #f0f0f0',
                  minHeight: '280px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08)';
                }}>
                  {/* Coming Soon Badge */}
                  <div className='position-absolute' style={{
                    top: '15px',
                    right: '15px',
                    backgroundColor: '#ff6b6b',
                    color: 'white',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {t("upcomingFeatures.comingSoon")}
                  </div>
                  
                  {/* Icon */}
                  <div className='text-center mb-3'>
                    <div style={{ 
                      fontSize: '4rem', 
                      marginBottom: '1rem',
                      filter: 'grayscale(50%) opacity(0.8)'
                    }}>
                      {t(`upcomingFeatures.items.${feature.key}.icon`)}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className='text-center'>
                    <h4 style={{ 
                      color: '#333',
                      marginBottom: '15px',
                      fontSize: '1.3rem',
                      fontWeight: '600'
                    }}>
                      {t(`upcomingFeatures.items.${feature.key}.title`)}
                    </h4>
                    <p style={{ 
                      color: '#666',
                      lineHeight: '1.6',
                      fontSize: '14px',
                      margin: '0'
                    }}>
                      {t(`upcomingFeatures.items.${feature.key}.description`)}
                    </p>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className='position-absolute' style={{
                    bottom: '0',
                    left: '0',
                    width: '100%',
                    height: '4px',
                    background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4)',
                    opacity: '0.3'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/*===============================

      {/*===============================
      {/*===============================
  BLOG START
    ===============================*/}
<section className='blog pt_120 xs_pt_80'>
  <div className='container'>
    <div className='row justify-content-between'>
      <div className='col-lg-5 col-md-8'>
        <div className='section_heading'>
          <h5>{t("blog.subtitle")}</h5>
          <h2 data-text-animation='' data-split='word'>
            {t("blog.title")}
          </h2>
        </div>
      </div>
      <div className='col-lg-7 col-md-12'>
        <div className='blog_right_text'>
          <p>{t("blog.description")}</p>
          <Link className='circle_btn' href='blog_grid'>
            {t("blog.viewAll")} <i className='fx-icon-next-arrow' />
          </Link>
        </div>
      </div>
    </div>
    <div className='row mt_20'>
      <div className='col-lg-4 col-md-6' data-animation='fade-left'>
        <div className='single_blog first_blog'>
          <div className='single_blog_text'>
            <ul className='d-flex flex-wrap'>
              <li>AI Technology</li>
              <li>December 15, 2024</li>
            </ul>
            <Link className='title' href='blog_details'>
            AI is Revolutionizing Text Processing and Content Creation
            </Link>
          </div>
          <div className='single_blog_img'>
            <Link
              href='blog_details'
              data-cursor='<i class="fx-icon-long-next-arrow"></i>'
              className='img w-100'>
              <div data-animation='img-blur' className='w-100'>
                <Image
                  src='/images/blog_1.png'
                  alt='AI Text Processing'
                  width={400}
                  height={300}
                  className='img-fluid w-100'
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div
        className='col-lg-4 col-md-6'
        data-animation='fade-left'
        data-delay='.75'>
        <div className='single_blog'>
          <div className='single_blog_text'>
            <ul className='d-flex flex-wrap'>
              <li>Productivity</li>
              <li>December 20, 2024</li>
            </ul>
            <Link className='title' href='blog_details'>
              10 Essential Text Formatting Tools Every Content Creator Needs
            </Link>
          </div>
          <div className='single_blog_img'>
            <Link
              href='blog_details'
              data-cursor='<i class="fx-icon-long-next-arrow"></i>'
              className='img w-100'>
              <div data-animation='img-blur' className='w-100'>
                <Image
                  src='/images/blog_2.png'
                  alt='Text Formatting Tools'
                  width={400}
                  height={300}
                  className='img-fluid w-100'
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div
        className='col-lg-4 col-md-6'
        data-animation='fade-left'
        data-delay={1}>
        <div className='single_blog last_blog'>
          <div className='single_blog_text'>
            <ul className='d-flex flex-wrap'>
              <li>Web Development</li>
              <li>December 25, 2024</li>
            </ul>
            <Link className='title' href='blog_details'>
              Building Modern Text Processing Apps with Next.js and TypeScript
            </Link>
          </div>
          <div className='single_blog_img'>
            <Link
              href='blog_details'
              data-cursor='<i class="fx-icon-long-next-arrow"></i>'
              className='img w-100'>
              <div data-animation='img-blur' className='w-100'>
                <Image
                  src='/images/blog_3.png'
                  alt='Next.js Development'
                  width={400}
                  height={300}
                  className='img-fluid w-100'
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      {/*===============================
  BLOG END
    ===============================*/}
    </FxotaryLayout>
  );
};
export default Page;
