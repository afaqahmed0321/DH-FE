import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";

import LoginForm from "../../components/login/LoginForm";
import AuthSlider from "../../shared/AuthSlider";
import SlideImg from "../../assets/images/Slider Images.png";
import ErrorBoundary from "../../shared/ErrorBoundary";
import ErrorBoundaryAlert from "../../shared/ErrorBoundaryAlert";
import LogoImg from "../../assets/images/logo.png"

const Login = () => {
  const slides = [
    {
      img: SlideImg,
      title: "Lorem ipsum dolor sit amet",
      description:
        "Lorem ipsum dolor sit amet consectetur. Non sit volutpat egestas tempus molestie posuere nullam cursus. Egestas venenatis fusce turpis aenean sem sit bibendum. Libero sit tincidunt dui phasellus adipiscing fermentum molestie urna. Non consectetur sapien eleifend leo lorem neque sed eget. Enim pellentesque ultrices nisl sit odio nam nullam cursus. Neque morbi dui purus mattis.",
    },
    {
      img: SlideImg,
      title: "Lorem ipsum dolor sit amet",
      description:
        "Lorem ipsum dolor sit amet consectetur. Non sit volutpat egestas tempus molestie posuere nullam cursus. Egestas venenatis fusce turpis aenean sem sit bibendum. Libero sit tincidunt dui phasellus adipiscing fermentum molestie urna. Non consectetur sapien eleifend leo lorem neque sed eget. Enim pellentesque ultrices nisl sit odio nam nullam cursus. Neque morbi dui purus mattis.",
    },
    {
      img: SlideImg,
      title: "Lorem ipsum dolor sit amet",
      description:
        "Lorem ipsum dolor sit amet consectetur. Non sit volutpat egestas tempus molestie posuere nullam cursus. Egestas venenatis fusce turpis aenean sem sit bibendum. Libero sit tincidunt dui phasellus adipiscing fermentum molestie urna. Non consectetur sapien eleifend leo lorem neque sed eget. Enim pellentesque ultrices nisl sit odio nam nullam cursus. Neque morbi dui purus mattis.",
    },
    {
      img: SlideImg,
      title: "Lorem ipsum dolor sit amet",
      description:
        "Lorem ipsum dolor sit amet consectetur. Non sit volutpat egestas tempus molestie posuere nullam cursus. Egestas venenatis fusce turpis aenean sem sit bibendum. Libero sit tincidunt dui phasellus adipiscing fermentum molestie urna. Non consectetur sapien eleifend leo lorem neque sed eget. Enim pellentesque ultrices nisl sit odio nam nullam cursus. Neque morbi dui purus mattis.",
    },
  ];

  return (
    <div className="full-height-section">
      <Container fluid>
        <Row className="m-0">
          <Col xs="12" md="6" className="my-lg-0 my-4">
            <ErrorBoundary fallback={<ErrorBoundaryAlert />}>
              <LoginForm />
            </ErrorBoundary>
          </Col>
          <Col xs="12" md="6" className="order-first order-md-last text-center mb-5">
            <Image fluid src={LogoImg} alt="Logo" loading="lazy" className="d-block d-md-none p-3" />
            <AuthSlider slides={slides} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;



// <Col xs="12" md="6" className="order-first order-md-last">
//           <Image fluid src={LogoImg} alt="Logo" loading="lazy" xs="12" md="6"  className="d-block d-md-none align"/>
//             <AuthSlider slides={slides} />
//           </Col>
