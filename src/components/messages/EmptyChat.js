import React from "react";
import { Image, Row } from "react-bootstrap";
import logo from "../../assets/images/logo.svg";
import SpaceCard from "../../hoc/SpaceCard";
import "../../assets/css/user-chat-messages.css";


const EmptyChat = (props) => {

  return (
    <SpaceCard>
      <Row className="w-100">
        <div className="custom-msg-text">
            <div className="!w-100 ">
                <span className="custom-msg-img"><Image src={logo} className="custom-msg-img"/></span>
                <h1 className="custom-msg-heading">Instant Space Web</h1>
                <p>Send and Receive messages without keeping your phone online</p>
            </div>
        </div>
      </Row>
    </SpaceCard>
  );
};

export default EmptyChat;