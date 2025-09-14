"use client";
import { fxotaryUtility } from "@/utility";
import { Fragment, useEffect, ReactNode } from "react";
import Cursor from "@/components/ui/Cursor";
import Footer from "./Footer";
import Header from "./Header";
import ScrollTopBtn from "@/components/ui/ScrollTopBtn";
import PageLoader from "@/components/ui/PageLoader";
import MobileWrapper from "@/components/layout/MobileWrapper";

interface FxotaryLayoutProps {
  children: ReactNode;
  errorPage?: boolean;
  showLoading?: boolean;
  loadingType?: 'simple' | 'advanced' | 'modern' | 'stunning' | 'interactive' | 'minimal' | 'elegant' | 'animated';
}

const FxotaryLayout = ({ children, errorPage, showLoading = true, loadingType = 'animated' }: FxotaryLayoutProps) => {
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
      <MobileWrapper>
        <PageLoader 
          enabled={showLoading}
          loadingType={loadingType}
          duration={loadingType === 'simple' ? 3000 : loadingType === 'modern' ? 4000 : loadingType === 'stunning' ? 3500 : loadingType === 'interactive' ? 4000 : loadingType === 'minimal' ? 3000 : loadingType === 'elegant' ? 3500 : loadingType === 'animated' ? 4000 : 3500}
        >
          {!errorPage && <Header />}
          {children}
          {!errorPage && <Footer />}
          <ScrollTopBtn />
        </PageLoader>
        <Cursor />
      </MobileWrapper>
    </Fragment>
  );
};
export default FxotaryLayout;
