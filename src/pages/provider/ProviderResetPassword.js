import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ResetPasswordForm from "../../components/reset-password/ResetPasswordForm";
import AuthSlider from "../../shared/AuthSlider";
import SlideImg from "../../assets/images/Slider Images.png";

const ProviderResetPassword = () => {
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
            <ResetPasswordForm />
          </Col>
          <Col xs="12" md="6">
            <AuthSlider slides={slides} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProviderResetPassword;
