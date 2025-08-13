"use client";
import { sliderProps } from "@/utility/sliderProps";
import Slider from "react-slick";
const TestimonialSlider = () => {
  return (
    <Slider {...sliderProps.testimonial} className="row testi_slider">
      <div className="col-xl-12">
        <div className="testimonial_item">
          <div className="row">
            <div className="col-xl-6 col-md-6">
              <div className="testimonial_text">
                <p className="description">
                  Nam ultricies sed leo eget vehicula. Sed varius non magna quis
                  mattis. Integer finibus, nisdl at tempus semper, me tufhs
                  lectus auctor leo.
                </p>
                <p className="rating">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </p>
                <h4>
                  Wade Warren <span>UI/UX Designer</span>
                </h4>
              </div>
            </div>
            <div className="col-xl-5 col-md-6">
              <div className="testimonial_img">
                <img
                  src="images/testimonial_img.png"
                  alt="testimonial"
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
                  Nam ultricies sed leo eget vehicula. Sed varius non magna quis
                  mattis. Integer finibus, nisdl at tempus semper, me tufhs
                  lectus auctor leo.
                </p>
                <p className="rating">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </p>
                <h4>
                  Wade Warren <span>UI/UX Designer</span>
                </h4>
              </div>
            </div>
            <div className="col-xl-5 col-md-6">
              <div className="testimonial_img">
                <img
                  src="images/testimonial_img.png"
                  alt="testimonial"
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
