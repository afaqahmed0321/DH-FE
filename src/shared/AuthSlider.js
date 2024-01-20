import React from "react";
import { Carousel } from "react-bootstrap";

import "../assets/css/auth-slider.css";

const AuthSlider = ({ slides }) => {
  return (
    <Carousel
      controls={false}
      indicators={false}
      interval={3000}
      data-aos="fade-left"
    >
      {slides.map((slide, index) => {
        return (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={slide.img} alt="Slide" />
            <div class="overlay"></div>
            <Carousel.Caption className="slide-caption">
              <h3 className="slide-title">{slide.title}</h3>
              <p className="slide-description">{slide.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default AuthSlider;
