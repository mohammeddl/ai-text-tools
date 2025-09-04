"use client";
import { fxotaryUtility } from "@/utility";
import { useEffect } from "react";

const Preloader = () => {
  useEffect(() => {
    fxotaryUtility.preloader();
    console.log("lhi");
  }, []);

  return (
    <div className="preloader">
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path id="svg" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z" />
      </svg>
      <h5 className="preloader-text">Fxotary</h5>
    </div>
  );
};
export default Preloader;
