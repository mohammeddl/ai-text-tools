"use client";
import { fxotaryUtility } from "@/utility";
import { useEffect } from "react";

const ScrollTopBtn = () => {
  useEffect(() => {
    fxotaryUtility.scrollBtn();
  }, []);

  return (
    <div className="tf__scroll_btn" style={{ display: "none" }}>
      <i className="fa-regular fa-arrow-up-long" />
    </div>
  );
};
export default ScrollTopBtn;
