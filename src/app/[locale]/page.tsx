"use client";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import FxotaryLayout from "@/layout/FxotaryLayout";
import BannerSection from "@/components/sections/BannerSection";
import CircularGalleryWrapper from "@/components/sections/CircularGalleryWrapper";
import AboutSection from "@/components/sections/AboutSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import UpcomingFeaturesSection from "@/components/sections/UpcomingFeaturesSection";
import BlogSection from "@/components/sections/BlogSection";
import InfiniteMenu from "@/components/sections/InfiniteMenu";

const Page = () => {
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    // Check if user is on mobile (screen width <= 768px)
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Redirect to tools page on mobile
      const locale = params.locale || 'en';
      router.push(`/${locale}/tools`);
    }
  }, [router, params]);

  return (
    <FxotaryLayout errorPage={false} showLoading={true} loadingType="animated">
      <BannerSection />
      <InfiniteMenu/>
      <CircularGalleryWrapper />
      <AboutSection />
      <FeaturesSection />
      <ProjectsSection />
      <UpcomingFeaturesSection />
      <BlogSection />
    </FxotaryLayout>
  );
};

export default Page;