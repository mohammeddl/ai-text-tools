"use client";
import TextHoverAnimation from "@/components/TextHoverAnimation";
import Link from "next/link";
import { Fragment, useState } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { useParams } from 'next/navigation';

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  
  const currentLocale = params.locale;

  const switchLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'ar' : 'en';
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <Fragment>
      <header>
        <div className="main_menu navbar d-none d-xl-flex">
          <div className="container-fluid">
            <Link href="/" className="navbar-brand">
              <img
                src="images/logo.png"
                alt="Fxotary"
                className="img-fluid w-100"
              />
            </Link>
            <div className="main-menu">
              <nav className="navbar-nav m-auto" id="navbarNav">
                <ul>
                  <li className="dropdown-nav">
                    <a href="#" className="text_hover_animaiton">
                      <TextHoverAnimation text={"Home"} />
                    </a>
                    <ul className="submenu">
                      <li>
                        <Link href="/">Home 1</Link>
                      </li>
                      <li>
                        <Link href="index_2">Home 2</Link>
                      </li>
                    </ul>
                  </li>
                  {/* Add other menu items here */}
                </ul>
              </nav>
            </div>
            <div className="nav_right d-flex flex-wrap align-items-center">
              <a
                href="#"
                className="search_icon"
                onClick={() => setToggle(true)}
              >
                <i className="fa-sharp fa-regular fa-magnifying-glass" />
              </a>
              
              {/* Language Toggle Button */}
              <button
                onClick={switchLanguage}
                className="language-toggle"
                style={{ 
                  background: 'none',
                  border: '1px solid #ddd',
                  padding: '8px 16px',
                  marginLeft: '15px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.3s ease'
                }}
              >
                {currentLocale === 'en' ? 'عربي' : 'English'}
              </button>
              
              <Link href="contact" className="common_btn">
                Request Quote
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
                  <img
                    src="images/logo.png"
                    alt="Fxotary"
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
                  <img
                    src="images/logo.png"
                    alt="Fxotary"
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