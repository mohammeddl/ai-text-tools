"use client";
import { sliderProps } from "@/utility/sliderProps";
import { useTranslations } from "next-intl";
import Slider from "react-slick";

const TestimonialSlider = () => {
  const t = useTranslations('testimonials');

  return (
    <Slider {...sliderProps.testimonial} className="row testi_slider">
      <div className="col-xl-12">
        <div className="testimonial_item">
          <div className="row">
            <div className="col-xl-6 col-md-6">
              <div className="testimonial_text">
                <p className="description">
                  {t('items.user1.text')}
                </p>
                <p className="rating">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </p>
                <h4>
                  {t('items.user1.name')} <span>{t('items.user1.role')}</span>
                </h4>
              </div>
            </div>
            <div className="col-xl-5 col-md-6">
              <div className="testimonial_img">
                <img
                  src="images/testimonial_writer.png"
                  alt="content writer testimonial"
                  className="img-fluid w-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-12">
        <div className="testimonial_item">
          <div className="row">
            <div className="col-xl-6 col-md-6">
              <div className="testimonial_text">
                <p className="description">
                  {t('items.user2.text')}
                </p>
                <p className="rating">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </p>
                <h4>
                  {t('items.user2.name')} <span>{t('items.user2.role')}</span>
                </h4>
              </div>
            </div>
            <div className="col-xl-5 col-md-6">
              <div className="testimonial_img">
                <img
                  src="images/testimonial_developer.png"
                  alt="developer testimonial"
                  className="img-fluid w-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-12">
        <div className="testimonial_item">
          <div className="row">
            <div className="col-xl-6 col-md-6">
              <div className="testimonial_text">
                <p className="description">
                  "The inverse case tool is perfect for my social media posts. It makes my content stand out and the download feature saves me so much time."
                </p>
                <p className="rating">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </p>
                <h4>
                  Emma Rodriguez <span>Social Media Manager</span>
                </h4>
              </div>
            </div>
            <div className="col-xl-5 col-md-6">
              <div className="testimonial_img">
                <img
                  src="images/testimonial_social_media.png"
                  alt="social media manager testimonial"
                  className="img-fluid w-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slider>
  );
};
export default TestimonialSlider;