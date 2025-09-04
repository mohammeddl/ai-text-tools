"use client";
import { fxotaryUtility } from "@/utility";
import { Fragment, useEffect, ReactNode } from "react";
import Cursor from "@/components/ui/Cursor";
import Footer from "./Footer";
import Header from "./Header";
import ScrollTopBtn from "@/components/ui/ScrollTopBtn";
import PageLoader from "@/components/ui/PageLoader";

interface FxotaryLayoutProps {
  children: ReactNode;
  errorPage?: boolean;
  showLoading?: boolean;
  loadingType?: 'simple' | 'advanced';
}

const FxotaryLayout = ({ children, errorPage, showLoading = false, loadingType = 'advanced' }: FxotaryLayoutProps) => {
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
      <PageLoader 
        enabled={showLoading}
        loadingType={loadingType}
        duration={loadingType === 'simple' ? 3000 : 3500}
      >
        {!errorPage && <Header />}
        {children}
        {!errorPage && <Footer />}
        <ScrollTopBtn />
      </PageLoader>
      <Cursor />
    </Fragment>
  );
};
export default FxotaryLayout;
