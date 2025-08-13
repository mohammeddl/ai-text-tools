"use client";
import Counter from "@/components/Counter";
import TestimonialSlider from "@/components/TestimonialSlider";
import FxotaryLayout from "@/layout/FxotaryLayout";
import Link from "next/link";
import Marquee from "react-fast-marquee";
const page = () => {
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
                <h4>We are Digital Agency</h4>
                <h1 className='banner_title'>
                  Helping the Brands to{" "}
                  <span>
                    Grow <b>Business.</b>
                  </span>
                </h1>
              </div>
              <div className='banner_img'>
                <div className='overflow-hidden'>
                  <img
                    src='images/banner_img_1.png'
                    alt='banner'
                    className='img-fluid w-100'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className='d-flex flex-wrap'>
          <li>
            <span>Follow Us</span>
          </li>
          <li>
            <a href='#'>Fb.</a>
          </li>
          <li>
            <a href='#'>Be.</a>
          </li>
          <li>
            <a href='#'>Yt.</a>
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
                  <h5 data-text-animation=''>ABOUT COMPANY</h5>
                  <h2
                    data-text-animation=''
                    data-split='word'
                    data-duration={1}>
                    We are a top Digital agency in the world.
                  </h2>
                </div>
                <Link className='circle_btn' href='about_us'>
                  Learn More <i className='fx-icon-next-arrow' />
                </Link>
              </div>
            </div>
            <div className='col-lg-5 col-md-7'>
              <div className='about_img_1'>
                <div className='img'>
                  <div data-animation='img-blur'>
                    <img
                      src='images/about_img_1.jpg'
                      alt='about'
                      className='img-fluid w-100'
                    />
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit viverra
                  purus senectus sapien habitant rutrum himenaeos curabitur
                  posuere congue ac non eu odio tempor placerat id.
                </p>
              </div>
            </div>
            <div className='col-lg-3 col-md-5'>
              <div className='about_img_2'>
                <div data-animation='img-blur'>
                  <img
                    src='images/about_img_2.jpg'
                    alt='about'
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
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit eros
                  nullam inceptos placerat aliquet taciti conubia himenaeos
                  elementum mattis per velit eleifend ridiculus.
                </p>
                <a className='view_btn' href='#'>
                  View All Services <i className='fx-icon-next-arrow' />
                </a>
              </div>
            </div>
            <div className='col-xl-5 col-md-5'>
              <div className='section_heading'>
                <h5 data-text-animation=''>WHAT WE DO</h5>
                <h2 data-text-animation='' data-split='word'>
                  Expertise Field.
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
                  className='image-view'
                  data-img-cursor="<img src='images/what_we_do_img.jpg' />">
                  <div className='icon'>
                    <img
                      src='icons/ui-ux.svg'
                      alt='about'
                      className='img-fluid w-100 svg'
                    />
                  </div>
                  <div className='text'>
                    <h3>UI/UX Design</h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipiscing elit
                      etiam accumsan, tellus viverra aliquet donec nisi
                      vulputate erat Cursus ornare nullam scelerisque
                      sollicitudin nisi odio sociosqu in euismod
                    </p>
                  </div>
                  <div className='img'>
                    <img
                      src='images/what_we_do_img.jpg'
                      alt='what we do'
                      className='img-fluid w-100'
                    />
                  </div>
                  <a className='circle_btn' href='#'>
                    details
                  </a>
                </li>
                <li
                  data-animation=''
                  className='image-view'
                  data-img-cursor="<img src='images/what_we_do_img.jpg' />">
                  <div className='icon'>
                    <img
                      src='icons/web-programming.svg'
                      alt='about'
                      className='img-fluid w-100 svg'
                    />
                  </div>
                  <div className='text'>
                    <h3>Web Development</h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipiscing elit
                      etiam accumsan, tellus viverra aliquet donec nisi
                      vulputate erat Cursus ornare nullam scelerisque
                      sollicitudin nisi odio sociosqu in euismod
                    </p>
                  </div>
                </li>
                <li
                  data-animation=''
                  className='image-view'
                  data-img-cursor="<img src='images/what_we_do_img.jpg' />">
                  <div className='icon'>
                    <img
                      src='icons/megaphone.svg'
                      alt='about'
                      className='img-fluid w-100 svg'
                    />
                  </div>
                  <div className='text'>
                    <h3>Digital Marketing</h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipiscing elit
                      etiam accumsan, tellus viverra aliquet donec nisi
                      vulputate erat Cursus ornare nullam scelerisque
                      sollicitudin nisi odio sociosqu in euismod
                    </p>
                  </div>
                  <div className='img'>
                    <img
                      src='images/what_we_do_img.jpg'
                      alt='what we do'
                      className='img-fluid w-100'
                    />
                  </div>
                  <a className='circle_btn' href='#'>
                    details
                  </a>
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
                  <h5>LATEST PROJECTS</h5>
                  <h2 data-text-animation='' data-split='char'>
                    Here’s our latest projects
                  </h2>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit eros
                  nullam inceptos placerat aliquet taciti conubia himenaeos
                  elementum mattis per velit eleifend ridiculus.
                </p>
              </div>
              <Link
                href='portfolio_details'
                className='latest_project_img d-block cursor-arrow c-pointer'
                data-cursor='<i class="fx-icon-long-next-arrow"></i>'>
                <div data-animation='img-blur'>
                  <img
                    src='images/project_img_1.jpg'
                    alt='projext'
                    className='img-fluid w-100'
                  />
                </div>
                <div className='text d-flex flex-column'>
                  <h3>Mark Wide Website</h3>
                  <h3>Design Project</h3>
                </div>
              </Link>
            </div>
            <div className='col-xl-5 col-md-6'>
              <Link
                href='portfolio_details'
                className='latest_project_img d-block cursor-arrow latest_project_img_2 c-pointer'
                data-cursor='<i class="fx-icon-long-next-arrow"></i>'>
                <div data-animation='img-blur'>
                  <img
                    src='images/project_img_2.jpg'
                    alt='projext'
                    className='img-fluid w-100'
                  />
                </div>
                <div className='text d-flex flex-column'>
                  <h3>Mark Wide Website</h3>
                  <h3>Design Project</h3>
                </div>
              </Link>
              <h4>Want to See More Projects</h4>
            </div>
          </div>
        </div>
        <div className='row mt_175 marquee_section'>
          <div className='col-12'>
            <div className='marquee-container'>
              <Marquee className='marquee_animi' direction='left'>
                <ul className='project_slider d-flex flex-wrap'>
                  <li>
                    <a href='#'>
                      <p>UI/UX Design</p>
                      <div className='img'>
                        <img
                          src='images/project_iten_img.jpg'
                          alt='project'
                          className='img-fluid'
                        />
                        <span>03</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <p>Digital Marketing</p>
                      <div className='img'>
                        <img
                          src='images/project_iten_img.jpg'
                          alt='project'
                          className='img-fluid'
                        />
                        <span>05</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <p>Web Development</p>
                      <div className='img'>
                        <img
                          src='images/project_iten_img.jpg'
                          alt='project'
                          className='img-fluid'
                        />
                        <span>07</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <p>Web Design</p>
                      <div className='img'>
                        <img
                          src='images/project_iten_img.jpg'
                          alt='project'
                          className='img-fluid'
                        />
                        <span>14</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <p>Graphic Design</p>
                      <div className='img'>
                        <img
                          src='images/project_iten_img.jpg'
                          alt='project'
                          className='img-fluid'
                        />
                        <span>42</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </Marquee>
            </div>
          </div>
          <div className='col-12 mt_30'>
            <Marquee className='marquee_animi2' direction='right'>
              <ul className='project_slider d-flex flex-wrap'>
                <li>
                  <a href='#'>
                    <p>UI/UX Design</p>
                    <div className='img'>
                      <img
                        src='images/project_iten_img.jpg'
                        alt='project'
                        className='img-fluid'
                      />
                      <span>03</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <p>Digital Marketing</p>
                    <div className='img'>
                      <img
                        src='images/project_iten_img.jpg'
                        alt='project'
                        className='img-fluid'
                      />
                      <span>05</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <p>Web Development</p>
                    <div className='img'>
                      <img
                        src='images/project_iten_img.jpg'
                        alt='project'
                        className='img-fluid'
                      />
                      <span>07</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <p>Web Design</p>
                    <div className='img'>
                      <img
                        src='images/project_iten_img.jpg'
                        alt='project'
                        className='img-fluid'
                      />
                      <span>14</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <p>Graphic Design</p>
                    <div className='img'>
                      <img
                        src='images/project_iten_img.jpg'
                        alt='project'
                        className='img-fluid'
                      />
                      <span>42</span>
                    </div>
                  </a>
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
  COUNTER START
    ===============================*/}
      <section className='counter pt_120 xs_pt_70 pb_140 xs_pb_90'>
        <div className='container'>
          <div className='row justify-content-between'>
            <div className='col-xl-6 col-md-6'>
              <div className='counter_img'>
                <img
                  src='images/counter_img.png'
                  alt='counter'
                  className='img-fluid w-100'
                />
              </div>
            </div>
            <div className='col-xl-5 col-md-6'>
              <div className='row'>
                <div className='col-xl-6 col-sm-6' data-animation='fade-right'>
                  <div className='counter_item counter_item_icon'>
                    <h2 className='count'>
                      <Counter end={10} decimals={0} extraClass='' />k
                    </h2>
                    <p>Project completed</p>
                  </div>
                </div>
                <div
                  className='col-xl-6 col-sm-6'
                  data-animation='fade-right'
                  data-delay='.5'>
                  <div className='counter_item'>
                    <h2 className='count'>
                      <Counter end={180} decimals={0} extraClass='' />
                    </h2>
                    <p>Skilled Professional</p>
                  </div>
                </div>
                <div
                  className='col-xl-6 col-sm-6'
                  data-animation='fade-right'
                  data-delay='.75'>
                  <div className='counter_item'>
                    <h2 className='count'>
                      <Counter end={500} decimals={0} extraClass='' />
                    </h2>
                    <p>Visited Conference</p>
                  </div>
                </div>
                <div
                  className='col-xl-6 col-sm-6'
                  data-animation='fade-right'
                  data-delay={1}>
                  <div className='counter_item counter_item_icon'>
                    <h2 className='count'>
                      <Counter end={30} decimals={0} extraClass='' />k
                    </h2>
                    <p>Happy Clients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*===============================
  COUNTER END
    ===============================*/}
      {/*===============================
  ACHIVEMENT START
    ===============================*/}
      <section className='achivement pt_100 xs_pt_50 pb_120 xs_pb_70'>
        <div className='container'>
          <div className='row justify-content-between'>
            <div className='col-xl-5 col-lg-6'>
              <div className='section_heading'>
                <h5>ACHIVEMENTS</h5>
                <h2 data-text-animation='' data-split='word'>
                  Company awards &amp; achievements
                </h2>
              </div>
            </div>
            <div className='col-xl-5 col-lg-6'>
              <div className='achivement_right_text'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit viverra
                  purus senectus sapien habitant rutrum himenaeos curabitur
                  posuere congue ac non eu odio tempor placerat id.
                </p>
              </div>
            </div>
          </div>
          <div className='row justify-content-between mt_50'>
            <div className='col-xxl-3 col-md-6 col-lg-4 col-xl-4'>
              <div className='achivement_img'>
                <div className='img_1'>
                  <div data-animation='img-blur'>
                    <img
                      src='images/achivement_img_1.jpg'
                      alt='achivement'
                      className='img-fluid w-100'
                    />
                  </div>
                </div>
                <div className='img_2'>
                  <div data-animation='img-blur'>
                    <img
                      src='images/achivement_img_2.jpg'
                      alt='achivement'
                      className='img-fluid w-100'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xxl-8 col-lg-8 col-xl-8'>
              <div className='achivement_list'>
                <ul>
                  <li data-animation=''>
                    <div className='icon'>
                      <img
                        src='images/achivement_icon_1.png'
                        alt='icon'
                        className='img-fluid w-100'
                      />
                    </div>
                    <div className='text'>
                      <h4>Awwwards Interior excellence.</h4>
                      <span>2015</span>
                      <a href='#' className='achivement_link'>
                        <i className='fx-icon-long-next-arrow' />
                      </a>
                    </div>
                  </li>
                  <li data-animation=''>
                    <div className='icon'>
                      <img
                        src='images/achivement_icon_2.png'
                        alt='icon'
                        className='img-fluid w-100'
                      />
                    </div>
                    <div className='text'>
                      <h4>Best Site of the Year Awards.</h4>
                      <span>2018</span>
                      <a href='#' className='achivement_link'>
                        <i className='fx-icon-long-next-arrow' />
                      </a>
                    </div>
                  </li>
                  <li data-animation=''>
                    <div className='icon'>
                      <img
                        src='images/achivement_icon_3.png'
                        alt='icon'
                        className='img-fluid w-100'
                      />
                    </div>
                    <div className='text'>
                      <h4>Template of the seasons in this month.</h4>
                      <span>2020</span>
                      <a href='#' className='achivement_link'>
                        <i className='fx-icon-long-next-arrow' />
                      </a>
                    </div>
                  </li>
                  <li data-animation=''>
                    <div className='icon'>
                      <img
                        src='images/achivement_icon_4.png'
                        alt='icon'
                        className='img-fluid w-100'
                      />
                    </div>
                    <div className='text'>
                      <h4>Best Selling of this week &amp; month.</h4>
                      <span>2023</span>
                      <a href='#' className='achivement_link'>
                        <i className='fx-icon-long-next-arrow' />
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*===============================
  ACHIVEMENT END
    ===============================*/}
      {/*===============================
  TESTIMONIAL START
    ===============================*/}
      <section className='testimonial pt_120'>
        <div className='container'>
          <TestimonialSlider />
        </div>
      </section>
      {/*===============================
  TESTIMONIAL END
    ===============================*/}
      {/*===============================
  BLOG START
    ===============================*/}
      <section className='blog pt_120 xs_pt_80'>
        <div className='container'>
          <div className='row justify-content-between'>
            <div className='col-lg-5 col-md-8'>
              <div className='section_heading'>
                <h5>LATEST NEWS</h5>
                <h2 data-text-animation='' data-split='word'>
                  Latest News &amp; Updates.
                </h2>
              </div>
            </div>
            <div className='col-lg-7 col-md-12'>
              <div className='blog_right_text'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit
                  lobortis sagittis, velit nec vehicula netus elementum interdum
                  ultricies hendrerit tristique.
                </p>
                <Link className='circle_btn' href='blog_grid'>
                  View All <br />
                  Our News <i className='fx-icon-next-arrow' />
                </Link>
              </div>
            </div>
          </div>
          <div className='row mt_20'>
            <div className='col-lg-4 col-md-6' data-animation='fade-left'>
              <div className='single_blog first_blog'>
                <div className='single_blog_text'>
                  <ul className='d-flex flex-wrap'>
                    <li>User Experience</li>
                    <li>September 10, 2023</li>
                  </ul>
                  <Link className='title' href='blog_details'>
                    Creative advertising our life became noise.
                  </Link>
                </div>
                <div className='single_blog_img'>
                  <Link
                    href='blog_details'
                    data-cursor='<i class="fx-icon-long-next-arrow"></i>'
                    className='img w-100'>
                    <div data-animation='img-blur' className='w-100'>
                      <img
                        src='images/blog_1.jpg'
                        alt='blog'
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
                    <li>User Experience</li>
                    <li>September 10, 2023</li>
                  </ul>
                  <Link className='title' href='blog_details'>
                    Creative advertising our life became noise.
                  </Link>
                </div>
                <div className='single_blog_img'>
                  <Link
                    href='blog_details'
                    data-cursor='<i class="fx-icon-long-next-arrow"></i>'
                    className='img w-100'>
                    <div data-animation='img-blur' className='w-100'>
                      <img
                        src='images/blog_2.jpg'
                        alt='blog'
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
                    <li>User Experience</li>
                    <li>September 10, 2023</li>
                  </ul>
                  <Link className='title' href='blog_details'>
                    Creative advertising our life became noise.
                  </Link>
                </div>
                <div className='single_blog_img'>
                  <Link
                    href='blog_details'
                    data-cursor='<i class="fx-icon-long-next-arrow"></i>'
                    className='img w-100'>
                    <div data-animation='img-blur' className='w-100'>
                      <img
                        src='images/blog_3.jpg'
                        alt='blog'
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
      {/*============================
  BRAND START
    =============================*/}
      <section className='tf__brand pt_100 xs_pt_60 pb_100 xs_pb_60'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <Marquee className='marquee_animi'>
                <ul className='tf__brand_logo_area d-flex flex-wrap justify-content-between'>
                  <li>
                    <a href='#'>
                      <img
                        src='images/brand_1.jpg'
                        alt='brand'
                        className='img-fluid w-100'
                      />
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <img
                        src='images/brand_5.jpg'
                        alt='brand'
                        className='img-fluid w-100'
                      />
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <img
                        src='images/brand_2.jpg'
                        alt='brand'
                        className='img-fluid w-100'
                      />
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <img
                        src='images/brand_3.jpg'
                        alt='brand'
                        className='img-fluid w-100'
                      />
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <img
                        src='images/brand_6.jpg'
                        alt='brand'
                        className='img-fluid w-100'
                      />
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <img
                        src='images/brand_4.jpg'
                        alt='brand'
                        className='img-fluid w-100'
                      />
                    </a>
                  </li>
                </ul>
              </Marquee>
            </div>
          </div>
        </div>
      </section>
      {/*============================
  BRAND END
    =============================*/}
    </FxotaryLayout>
  );
};
export default page;
