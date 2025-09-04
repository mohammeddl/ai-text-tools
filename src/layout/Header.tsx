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
        
        {/* Rest of your header code... */}
        <div className="mobile-menu d-xl-none main_menu d-flex">
          <div className="container-fluid d-flex justify-content-between">
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="navbar-brand ms-3">
                <Link href="index">
                  <Image
                    src="/images/logo.png"
                    alt="Fxotary"
                    width={120}
                    height={40}
                    className="img-fluid w-100"
                  />
                </Link>
              </div>
              <div className="text-end me-3">
                <a
                  className="menu-bar navbar-toggler"
                  href="javascript:void(0)"
                >
                  <i className="fa-solid fa-bars" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile_menu_container">
          <div className="mobile_menu_content">
            <div className="d-flex align-items-center justify-content-between">
              <div className="navbar-brand">
                <Link href="index">
                  <Image
                    src="/images/logo.png"
                    alt="Fxotary"
                    width={120}
                    height={40}
                    className="img-fluid w-100"
                  />
                </Link>
              </div>
              <div className="close_btn">
                <button>
                  <i className="fal fa-times" />
                </button>
              </div>
            </div>
            <div className="main-menu-mobile" />
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