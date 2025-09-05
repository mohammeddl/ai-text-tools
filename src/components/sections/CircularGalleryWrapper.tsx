"use client";
import React from "react";
import CircularGallery from "./CircularGallerySection";

const CircularGalleryWrapper = () => {

  // Gallery items using your existing project images
  const galleryItems = [
    {
      image: "/images/project_img_1.png",
      text: "Text Transformation",
    },
    {
      image: "/images/project_img_2.png",
      text: "AI Translation",
    },
    {
      image: "/images/blog_1.png",
      text: "Content Generation",
    },
    {
      image: "/images/blog_2.png",
      text: "Text Analysis",
    },
    {
      image: "/images/blog_3.png",
      text: "Grammar Check",
    },
    {
      image: "/images/about_img_1.png",
      text: "Summarization",
    },
  ];

  return (
    <section
      style={{
        background: "url(images/banner_bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        marginTop: "8px",
        paddingTop: "0px",
        paddingBottom: "10px",
      }}>
      <div className='col-12'>
        {/* Circular Gallery */}
        <div style={{ height: "60vh", minHeight: "500px" }}>
          <CircularGallery
            items={galleryItems}
            bend={3}
            textColor='#000000'
            borderRadius={0.05}
            font='bold 24px Arial, sans-serif'
            scrollSpeed={2}
            scrollEase={0.05}
          />
        </div>
      </div>
    </section>
  );
};

export default CircularGalleryWrapper;
