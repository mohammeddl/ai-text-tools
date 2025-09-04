"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const FeaturesSection = () => {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations();

  return (
    <section className='what_we_do pt_120 xs_pt_70 pb_120 xs_pb_70'>
      <div className='container'>
        <div className='row justify-content-between'>
          <div className='col-xl-5 col-md-7'>
            <div className='what_we_do_text'>
              <p>{t("features.description")}</p>
              <Link className='view_btn' href={`/${locale}/tools`}>
                {t("about.viewServices")} <i className='fx-icon-next-arrow' />
              </Link>
            </div>
          </div>
          <div className='col-xl-5 col-md-5'>
            <div className='section_heading'>
              <h5 data-text-animation=''>{t("features.subtitle")}</h5>
              <h2 data-text-animation='' data-split='word'>
                {t("features.title")}
              </h2>
            </div>
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className='col-12'>
            <ul>
              <li
                data-animation=''
                className='image-view'>
                <div className='icon'>
                  <Image
                    src='/icons/ui-ux.svg'
                    alt='AI Content'
                    width={64}
                    height={64}
                    className='img-fluid w-100 svg'
                  />
                </div>
                <div className='text'>
                  <h3>🤖 {t("features.aiContentGeneration.title")}</h3>
                  <p>{t("features.aiContentGeneration.description")}</p>
                </div>
                <Link className='circle_btn' href={`/${locale}/tools`}>
                  {t("common.details")}
                </Link>
              </li>
              <li
                data-animation=''
                className='image-view'>
                <div className='icon'>
                  <Image
                    src='/icons/web-programming.svg'
                    alt='Text Analysis'
                    width={64}
                    height={64}
                    className='img-fluid w-100 svg'
                  />
                </div>
                <div className='text'>
                  <h3>📊 {t("features.smartTextAnalysis.title")}</h3>
                  <p>{t("features.smartTextAnalysis.description")}</p>
                </div>
              </li>
              <li
                data-animation=''
                className='image-view'>
                <div className='icon'>
                  <Image
                    src='/icons/megaphone.svg'
                    alt='Auto Formatting'
                    width={64}
                    height={64}
                    className='img-fluid w-100 svg'
                  />
                </div>
                <div className='text'>
                  <h3>✨ {t("features.autoFormatting.title")}</h3>
                  <p>{t("features.autoFormatting.description")}</p>
                </div>
                <Link className='circle_btn' href={`/${locale}/tools`}>
                  {t("common.details")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;