"use client";
import TextHoverAnimation from "@/components/TextHoverAnimation";
import Link from "next/link";
import { Fragment, useState } from "react";
const Header = () => {
  const [toggle, setToggle] = useState(false);
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
                  <li>
                    <Link href="about_us" className="text_hover_animaiton">
                      <TextHoverAnimation text={"About"} />
                    </Link>
                  </li>
                  <li className="dropdown-nav">
                    <a href="#" className="text_hover_animaiton">
                      <TextHoverAnimation text={"Pages"} />
                    </a>
                    <ul className="submenu">
                      <li className="dropdown-nav">
                        <a href="#">Services</a>
                        <ul className="submenu">
                          <li>
                            <Link href="services">Service List</Link>
                          </li>
                          <li>
                            <Link href="service_details">Service Details</Link>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown-nav">
                        <a href="#">Portfolio</a>
                        <ul className="submenu">
                          <li>
                            <Link href="portfolio">Portfolio List</Link>
                          </li>
                          <li>
                            <Link href="portfolio_2">Portfolio Grid</Link>
                          </li>
                          <li>
                            <Link href="portfolio_details">
                              Portfolio Details
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link href="team_page">Team List</Link>
                      </li>
                      <li>
                        <Link href="error">404</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown-nav">
                    <a href="#" className="text_hover_animaiton">
                      <TextHoverAnimation text={"Blog"} />
                    </a>
                    <ul className="submenu">
                      <li>
                        <Link href="blog_grid">Blog Grid</Link>
                      </li>
                      <li>
                        <Link href="blog_list">Blog List</Link>
                      </li>
                      <li>
                        <Link href="blog_details">Blog Details</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link href="contact" className="text_hover_animaiton">
                      <TextHoverAnimation text={"Contact"} />
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="right_menu">
              <a
                href="#"
                className="search_icon"
                onClick={() => setToggle(true)}
              >
                <i className="fa-sharp fa-regular fa-magnifying-glass" />
              </a>
              <Link href="contact" className="common_btn">
                Request Quote
              </Link>
            </div>
          </div>
        </div>
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
