"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

const AboutSection = () => {
  const t = useTranslations();

  return (
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
  );
};

export default AboutSection;