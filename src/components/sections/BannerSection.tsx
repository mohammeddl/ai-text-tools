"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import "@/styles/banner-responsive.css";

const BannerSection = () => {
  const t = useTranslations();

  return (
    <section
      className='banner banner-responsive'
      style={{ background: "url(images/banner_bg.png)" }}>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className='banner_text banner-text-responsive'>
              <h4 className="banner-subtitle">{t("banner.subtitle")}</h4>
              <h1 className='banner_title banner-title-responsive'>
                Transform Your Text with{" "}
                <span className="banner-title-span ai-power-text">
                  <b>AI Power</b>
                </span>
              </h1>
            </div>
            <div className='banner_img banner-img-responsive'>
              <div className='overflow-hidden banner-img-container'>
                <Image
                  src='/images/banner_img_1.png'
                  alt='banner'
                  width={1200}
                  height={700}
                  className='img-fluid w-100 banner-main-image'
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul className='d-flex flex-wrap banner-social'>
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
  );
};

export default BannerSection;