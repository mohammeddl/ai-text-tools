"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Footer = () => {
  let t;
  try {
    t = useTranslations("footer");
  } catch (error) {
    // Fallback translations if context is not available
    t = (key: string) => {
      const fallbacks: Record<string, string> = {
        description:
          "Transform your text with our powerful AI-driven tools. Fast, secure, and completely free to use.",
        "links.about": "About Us",
        "links.privacy": "Privacy Policy",
        "links.terms": "Terms of Service",
        "contact.email": "support@aitexttools.com",
        "contact.address": "AI Text Tools Platform",
        copyright: "© 2024 AI Text Tools. All rights reserved.",
      };
      return fallbacks[key] || key;
    };
  }

  return (
    <footer className='pt_120 xs_pt_80'>
      <div className='container'>
        <div className='row justify-content-between'>
          <div className='col-xl-4 col-sm-8 col-md-6 col-lg-4'>
            <div className='footer_content'>
              <Link className='footer_logo' href='/'>
                <img
                  src='images/TextCrafterLogoWhite.png'
                  alt='AI Text Tools'
                  className='img-fluid w-100'
                />
              </Link>
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
                  href='/tools/uppercase'
                  className='text_hover_animaiton text_hover_type_2'>
                  UPPERCASE
                </Link>
              </li>
              <li>
                <Link
                  href='/tools/lowercase'
                  className='text_hover_animaiton text_hover_type_2'>
                  lowercase
                </Link>
              </li>
              <li>
                <Link
                  href='/tools/capitalize'
                  className='text_hover_animaiton text_hover_type_2'>
                  Capitalize
                </Link>
              </li>
              <li>
                <Link
                  href='/tools/inverse'
                  className='text_hover_animaiton text_hover_type_2'>
                  iNvErSe CaSe
                </Link>
              </li>
              <li>
                <Link
                  href='/tools/sentence'
                  className='text_hover_animaiton text_hover_type_2'>
                  Sentence case
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
              <div className='mt-3'>
                <Link href='/tools' className='common_btn'>
                  Try Tools Now
                </Link>
              </div>
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
