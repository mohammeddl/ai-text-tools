"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ProjectMarquee from "@/components/ui/ProjectMarquee";
import { gradients } from "@/styles/page-styles";

const ProjectsSection = () => {
  const t = useTranslations();

  const firstRowProjects = [
    {
      title: `🧠 ${t("features.languageProcessing.title")}`,
      icon: "🧠",
      gradient: gradients.purple,
      index: "01"
    },
    {
      title: `📈 ${t("features.bulkProcessing.title")}`,
      icon: "📈",
      gradient: gradients.pink,
      index: "02"
    },
    {
      title: `🤖 ${t("features.aiContentGeneration.title")}`,
      icon: "🤖",
      gradient: gradients.blue,
      index: "03"
    },
    {
      title: `📊 ${t("features.smartTextAnalysis.title")}`,
      icon: "📊",
      gradient: gradients.orange,
      index: "04"
    },
    {
      title: `✨ ${t("features.autoFormatting.title")}`,
      icon: "✨",
      gradient: gradients.light,
      index: "05"
    }
  ];

  const secondRowProjects = [
    {
      title: `🤖 ${t("features.aiCompletion.title")}`,
      icon: "🤖",
      gradient: gradients.purple,
      index: "01"
    },
    {
      title: `📊 ${t("features.styledText.title")}`,
      icon: "📊",
      gradient: gradients.pink,
      index: "02"
    },
    {
      title: `🧠 ${t("features.languageProcessing.title")}`,
      icon: "🧠",
      gradient: gradients.blue,
      index: "03"
    },
    {
      title: `📈 ${t("features.bulkProcessing.title")}`,
      icon: "📈",
      gradient: gradients.orange,
      index: "04"
    },
    {
      title: `✨ ${t("features.autoFormatting.title")}`,
      icon: "✨",
      gradient: gradients.light,
      index: "05"
    }
  ];

  return (
    <section className='latest_project pt_120 xs_pt_70 pb_120 xs_pb_70'>
      <div className='container'>
        <div className='row justify-content-between'>
          <div className='col-xl-5 col-md-6'>
            <div className='latest_project_text'>
              <div className='section_heading'>
                <h5>{t("projects.subtitle")}</h5>
                <h2 data-text-animation='' data-split='char'>
                  {t("projects.title")}
                </h2>
              </div>
              <p>{t("projects.description")}</p>
            </div>
            <Link
              href='portfolio_details'
              className='latest_project_img d-block cursor-arrow c-pointer'
              data-cursor='<i class="fx-icon-long-next-arrow"></i>'>
              <div data-animation='img-blur'>
                <Image
                  src='/images/project_img_1.png'
                  alt='AI Content Generation'
                  width={400}
                  height={300}
                  className='img-fluid w-100'
                />
              </div>
              <div className='text d-flex flex-column'>
                <h3>🤖 {t("features.aiCompletion.title")}</h3>
                <h3>Advanced AI Processing</h3>
              </div>
            </Link>
          </div>
          <div className='col-xl-5 col-md-6'>
            <Link
              href='portfolio_details'
              className='latest_project_img d-block cursor-arrow latest_project_img_2 c-pointer'
              data-cursor='<i class="fx-icon-long-next-arrow"></i>'>
              <div data-animation='img-blur'>
                <Image
                  src='/images/project_img_2.png'
                  alt='Smart Text Analysis'
                  width={400}
                  height={300}
                  className='img-fluid w-100'
                />
              </div>
              <div className='text d-flex flex-column'>
                <h3>📊 {t("features.styledText.title")}</h3>
                <h3>Smart Text Analytics</h3>
              </div>
            </Link>
            <h4>{t("projects.moreProjects")}</h4>
          </div>
        </div>
      </div>
      <div className='row mt_175 marquee_section'>
        <div className='col-12'>
          <div className='marquee-container'>
            <ProjectMarquee direction="left" projects={firstRowProjects} />
          </div>
        </div>
        <div className='col-12 mt_30'>
          <ProjectMarquee direction="right" projects={secondRowProjects} />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;