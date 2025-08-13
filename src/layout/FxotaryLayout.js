"use client";
import { fxotaryUtility } from "@/utility";
import { Fragment, useEffect } from "react";
import Cursor from "./Cursor";
import Footer from "./Footer";
import Header from "./Header";
import ScrollTopBtn from "./ScrollTopBtn";
const FxotaryLayout = ({ children, errorPage }) => {
  useEffect(() => {
    fxotaryUtility.customMouse();
    fxotaryUtility.buttonHover();
    fxotaryUtility.imgToSVG();
    fxotaryUtility.lenisScrollAnimation();
    fxotaryUtility.stickyNav();
    fxotaryUtility.scrollAnimation();
    fxotaryUtility.scrollTextAnimation();
  }, []);
  return (
    <Fragment>
      {!errorPage && <Header />}
      {children}
      {!errorPage && <Footer />}
      <ScrollTopBtn />
      <Cursor />
    </Fragment>
  );
};
export default FxotaryLayout;
