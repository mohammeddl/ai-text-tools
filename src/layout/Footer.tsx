"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className='pt_120 xs_pt_80'>
      <div className='container'>
        <div className='row justify-content-between'>
          <div className='col-xl-4 col-sm-8 col-md-6 col-lg-4'>
            <div className='footer_content'>
                  <Image
                  src='/images/TextCrafterLogoWhite.png'
                  alt='AI Text Tools'
                  width={100}
                  height={60}
                  className=' w-50 h-48'
                  priority
                />
              <p>{t("description")}</p>
              <ul className='d-flex flex-wrap'>
                <li>
                  <a href='https://facebook.com'>
                    <i className='fab fa-facebook-f' />
                  </a>
                </li>
                <li>
                  <a href='www.linkedin.com/in/daali-mohammed-85736b271'>
                    <i className='fab fa-linkedin-in' />
                  </a>
                </li>
                <li>
                  <a href='https://github.com/mohammeddl'>
                    <i className='fab fa-github' />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='col-xl-2 col-sm-3 col-md-6 col-lg-2'>
            <ul className='footer_menu'>
              <li>
                <Link
                  href='/tools'
                  className='text_hover_animaiton text_hover_type_2'>
                  AI Content Generation
                </Link>
              </li>
              <li>
                <Link
                  href='/tools'
                  className='text_hover_animaiton text_hover_type_2'>
                  Smart Text Analysis
                </Link>
              </li>
              <li>
                <Link
                  href='/tools'
                  className='text_hover_animaiton text_hover_type_2'>
                  Auto Formatting
                </Link>
              </li>
              <li>
                <Link
                  href='/tools'
                  className='text_hover_animaiton text_hover_type_2'>
                  NLP Processing
                </Link>
              </li>
              <li>
                <Link
                  href='/tools'
                  className='text_hover_animaiton text_hover_type_2'>
                  Bulk Processing
                </Link>
              </li>
            </ul>
          </div>
          <div className='col-xl-2 col-sm-3 col-md-6 col-lg-2'>
            <ul className='footer_menu'>
              <li>
                <Link
                  href='/about'
                  className='text_hover_animaiton text_hover_type_2'>
                  {t("links.about")}
                </Link>
              </li>
              <li>
                <Link
                  href='/features'
                  className='text_hover_animaiton text_hover_type_2'>
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href='/guides'
                  className='text_hover_animaiton text_hover_type_2'>
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href='/privacy'
                  className='text_hover_animaiton text_hover_type_2'>
                  {t("links.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href='/terms'
                  className='text_hover_animaiton text_hover_type_2'>
                  {t("links.terms")}
                </Link>
              </li>
            </ul>
          </div>
          <div className='col-xl-3 col-md-6 col-lg-3'>
            <div className='footer_address'>
              <h3>Contact</h3>
              <p>
                <a href='mailto:support@aitexttools.com'>
                  {t("contact.email")}
                </a>
              </p>
              <p>{t("contact.address")}</p>
              
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <div className='footer_copyright'>
              <p>{t("copyright")}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
