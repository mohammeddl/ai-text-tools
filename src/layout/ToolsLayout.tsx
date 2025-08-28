"use client";
import { fxotaryUtility } from "@/utility";
import { Fragment, useEffect, ReactNode } from "react";
import Cursor from "./Cursor";
import ScrollTopBtn from "./ScrollTopBtn";

interface ToolsLayoutProps {
  children: ReactNode;
}

const ToolsLayout = ({ children }: ToolsLayoutProps) => {
  useEffect(() => {
    fxotaryUtility.customMouse();
    fxotaryUtility.buttonHover();
    fxotaryUtility.imgToSVG();
    fxotaryUtility.lenisScrollAnimation();
    fxotaryUtility.scrollAnimation();
    fxotaryUtility.scrollTextAnimation();
  }, []);
  
  return (
    <Fragment>
      {children}
      <ScrollTopBtn />
      <Cursor />
    </Fragment>
  );
};

export default ToolsLayout;