"use client";
import { fxotaryUtility } from "@/utility";
import { Fragment, useEffect } from "react";
import Cursor from "@/components/ui/Cursor";
import ScrollTopBtn from "@/components/ui/ScrollTopBtn";

const ToolsLayout = ({ children }) => {
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
