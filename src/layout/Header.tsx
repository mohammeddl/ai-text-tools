"use client";
import TextHoverAnimation from "@/components/ui/TextHoverAnimation";
import Link from "next/link";
import Image from "next/image";
import { Fragment, useState } from "react";
import { useParams } from 'next/navigation';
import { useTranslations } from "next-intl";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const params = useParams();
  const t = useTranslations();
  
  const currentLocale = params.locale || 'en';

  return (
    <Fragment>
      <header>
        <div className="main_menu navbar d-none d-xl-flex">
          <div className="container-fluid">
            <Link href="/" className="navbar-brand">
              <Image
                src="/images/TextCrafterLogo.png"
                alt="Fxotary"
                width={180}
                height={60}
                className="img-fluid w-100 h-50"
              />
            </Link>
            <div className="main-menu">
              <nav className="navbar-nav m-auto" id="navbarNav">
                <ul>
                  <li className="dropdown-nav">
                    <Link href={`/${currentLocale}`} className="text_hover_animaiton">
                      <TextHoverAnimation text={t("nav.home")} />
                    </Link>
                  </li>
                  <li className="dropdown-nav">
                    <Link href={`/${currentLocale}/tools`} className="text_hover_animaiton">
                      <TextHoverAnimation text={t("nav.tools")} />
                    </Link>
                  </li>
                  <li className="dropdown-nav">
                    <Link href={`/${currentLocale}/about`} className="text_hover_animaiton">
                      <TextHoverAnimation text={t("nav.about")} />
                    </Link>
                  </li>
                  <li className="dropdown-nav">
                    <Link href={`/${currentLocale}/contact`} className="text_hover_animaiton">
                      <TextHoverAnimation text={t("nav.contact")} />
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="nav_right d-flex flex-wrap align-items-center">
              <Link href={`/${currentLocale}/tools`} className="common_btn">
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="main_menu d-xl-none">
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between w-100">
              <Link href={`/${currentLocale}`} className="navbar-brand">
                <Image
                  src="/images/TextCrafterLogo.png"
                  alt="TextCrafter"
                  width={140}
                  height={50}
                  className="img-fluid"
                />
              </Link>
              <button
                className={`navbar-toggler ${toggle ? 'show' : ''}`}
                type="button"
                onClick={() => setToggle(!toggle)}
                aria-expanded={toggle}
                aria-label="Toggle navigation"
              >
                <i className={`menu_bar_icon fas ${toggle ? 'fa-times' : 'fa-bars'}`} />
              </button>
            </div>
            
            <div className={`collapse navbar-collapse ${toggle ? 'show' : ''}`} id="navbarNav">
              <div className="main-menu-mobile">
                <nav className="navbar-nav">
                  <ul>
                    <li className="nav-item">
                      <Link href={`/${currentLocale}`} className="nav-link text_hover_animaiton" onClick={() => setToggle(false)}>
                        <TextHoverAnimation text={t("nav.home")} />
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href={`/${currentLocale}/tools`} className="nav-link text_hover_animaiton" onClick={() => setToggle(false)}>
                        <TextHoverAnimation text={t("nav.tools")} />
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href={`/${currentLocale}/about`} className="nav-link text_hover_animaiton" onClick={() => setToggle(false)}>
                        <TextHoverAnimation text={t("nav.about")} />
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href={`/${currentLocale}/contact`} className="nav-link text_hover_animaiton" onClick={() => setToggle(false)}>
                        <TextHoverAnimation text={t("nav.contact")} />
                      </Link>
                    </li>
                  </ul>
                  <div className="right_menu">
                    <Link href={`/${currentLocale}/tools`} className="common_btn" onClick={() => setToggle(false)}>
                      Get Started Now
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={`menu_search ${toggle ? "show_search" : ""}`}>
        <form>
          <input type="text" placeholder="Search" />
          <button type="submit">Search</button>
          <span
            className="close_search c-pointer"
            onClick={() => setToggle(false)}
          >
            <i className="fa-sharp fa-light fa-xmark" />
          </span>
          <i className="icon-down-arrow" />
        </form>
      </div>
      <div
        className={`body-overlay ${toggle ? "show" : ""}`}
        onClick={() => setToggle(false)}
      />
    </Fragment>
  );
};
export default Header;