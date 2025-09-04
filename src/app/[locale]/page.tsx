"use client";
import FxotaryLayout from "@/layout/FxotaryLayout";
import BannerSection from "@/components/sections/BannerSection";
import AboutSection from "@/components/sections/AboutSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import UpcomingFeaturesSection from "@/components/sections/UpcomingFeaturesSection";
import BlogSection from "@/components/sections/BlogSection";

const Page = () => {
  return (
    <FxotaryLayout errorPage={false}>
      <BannerSection />
      <AboutSection />
      <FeaturesSection />
      <ProjectsSection />
      <UpcomingFeaturesSection />
      <BlogSection />
    </FxotaryLayout>
  );
};

export default Page;