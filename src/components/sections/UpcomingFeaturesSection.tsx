"use client";
import { useTranslations } from "next-intl";
import { pageStyles } from "@/styles/page-styles";
import { MouseEvent } from "react";

const UpcomingFeaturesSection = () => {
  const t = useTranslations();

  const handleCardHover = (e: MouseEvent<HTMLDivElement>, isEntering: boolean) => {
    const target = e.currentTarget;
    if (isEntering) {
      target.style.transform = 'translateY(-10px)';
      target.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
    } else {
      target.style.transform = 'translateY(0px)';
      target.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08)';
    }
  };

  const features = [
    { key: "aiSummarization" },
    { key: "contentOptimization" },
    { key: "voiceToText" },
    { key: "multilanguageAI" },
    { key: "sentimentAnalysis" }
  ];

  return (
    <section className='about_us pt_120 xs_pt_70 pb_120 xs_pb_70' style={pageStyles.upcomingFeaturesSection}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-8 text-center'>
            <div className='section_heading'>
              <h5 style={pageStyles.upcomingFeaturesSubtitle}>
                {t("upcomingFeatures.subtitle")}
              </h5>
              <h2 data-text-animation='' data-split='word' style={pageStyles.upcomingFeaturesTitle}>
                {t("upcomingFeatures.title")}
              </h2>
              <p style={pageStyles.upcomingFeaturesDescription}>
                {t("upcomingFeatures.description")}
              </p>
            </div>
          </div>
        </div>

        <div className='row mt-5'>
          {features.map((feature) => (
            <div key={feature.key} className='col-lg-4 col-md-6 mb-4'>
              <div 
                className='upcoming-feature-card position-relative overflow-hidden' 
                style={pageStyles.upcomingFeatureCard}
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}>
                
                {/* Coming Soon Badge */}
                <div className='position-absolute' style={pageStyles.comingSoonBadge}>
                  {t("upcomingFeatures.comingSoon")}
                </div>
                
                {/* Icon */}
                <div className='text-center mb-3'>
                  <div style={pageStyles.featureIcon}>
                    {t(`upcomingFeatures.items.${feature.key}.icon`)}
                  </div>
                </div>
                
                {/* Content */}
                <div className='text-center'>
                  <h4 style={pageStyles.featureTitle}>
                    {t(`upcomingFeatures.items.${feature.key}.title`)}
                  </h4>
                  <p style={pageStyles.featureDescription}>
                    {t(`upcomingFeatures.items.${feature.key}.description`)}
                  </p>
                </div>
                
                {/* Decorative elements */}
                <div className='position-absolute' style={pageStyles.decorativeElement}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingFeaturesSection;