"use client";
import { fxotaryUtility } from "@/utility";
import { useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollTopBtn = () => {
  useEffect(() => {
    fxotaryUtility.scrollBtn();
  }, []);

  return (
    <div className="tf__scroll_btn" style={{ display: "none" }}>
      <ArrowUp />
    </div>
  );
};
export default ScrollTopBtn;
