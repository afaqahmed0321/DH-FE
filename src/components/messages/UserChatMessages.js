import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { AiFillCamera } from "react-icons/ai";
import { GrSend } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";
import ChatImg from "../../assets/images/user-img.png";
import SpaceCard from "../../hoc/SpaceCard";
import "../../assets/css/user-chat-messages.css";
import { send_messages } from "../../store/storeIndex";
import Axios from "../../axios/Axios";
import Socket from "../../Socket";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

const UserChatMessages = (props) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const { conversationId, conversationUser } = props;
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [mediaFile, setMediaFile] = useState("");
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user._id);

  useEffect(() => {
    if (conversationId) {       
      getMessages();        
    }
  }, [conversationId]);      
  useEffect(() => {
    Socket.on("getMessage", (data) => {
      const newmessage = {                              
        receiverId: data.receiverId,           
        sender: data.senderId,                           
        message: data.message,
      };
      setArrivalMessage(newmessage);
      // setMessages(pre => [...pre, newmessage]);
    });                
  }, []);          
  useEffect(() => {
    arrivalMessage &&
      messages !== undefined &&
      messages[0].conversationId.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, messages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getMessages = async () => {
    try {
      const res = await Axios.get(`messages/${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data.messages);
    } catch (err) {
    }
  };    
  const sendMessage = async () => {        
    const newmessage = {      
      conversationId: conversationId,                 
      sender: userId,                 
      message: message,
      createdAt: new Date(), 
    };   
    dispatch(send_messages(newmessage, token));
    setMessages((pre) => [...pre, newmessage]);
    setMessage("");                                                        

    const receiverId =      
      (await messages) !== undefined &&
      messages[0].conversationId.members.find((member) => member !== userId);
    Socket.emit("sendMessage", {                     
      senderId: userId,
      receiverId: receiverId,                                                       
      message: message,
      createdAt: new Date(),
    });
  };

  return (
    <SpaceCard className="">
      <div className="p-3 custom-chat-height">
        <Row className="border-bottom ">
          <Col>
            <div className="d-flex align-items-center my-2 pb-2">
              <Image
                src={
                  conversationUser.photo
                    ? `${process.env.REACT_APP_SERVER_URL}${conversationUser.photo}`
                    : ChatImg
                }
                fluid
              />
              <div className="d-flex flex-column align-items-start justify-content-center ms-3">
                <p className="m-0 p-0 user-name">{conversationUser.name}</p>
                <p className="m-0 p-0 user-msg text-success">Available</p>
              </div>
            </div>
          </Col>              
          <Col className="d-flex align-items-center justify-content-end">
            <Button>Contact Customer</Button>
          </Col>
        </Row>
        <div>
          <div className="messages-bank">
            {messages !== undefined &&
              messages.length > 0 &&
              messages.map((msg, index) => {
                return (
                  <div
                    key={index}
                    className={
                      msg.sender === userId ? "message own" : "message"
                    }
                    ref={scrollRef}
                  >
                    <div className="main-message rounded">
                      <p className="m-0 ">{msg.message}</p>
                      <p className="text-end message-time p-0 m-0">
                        {timeAgo.format(new Date(msg.createdAt))}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="d-flex align-items-center">
            <input
              className="d-flex uploader"
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              onChange={(e) => setMediaFile(e.target.files[0])}
            />
            <AiFillCamera className="media-icon" />
            {!mediaFile && (
              <div className="d-flex align-items-center flex-grow-1 msg-container">
                <Form.Control
                  className="message-input"
                  size="lg"
                  type="text"
                  placeholder="Send message"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                />
                {message && (
                  <GrSend style={{ cursor: "pointer" }} onClick={sendMessage} />
                )}
              </div>
            )}
            {mediaFile && (
              <div className="d-flex align-items-center flex-grow-1 msg-container">
                <p className="m-0 p-0">{mediaFile.name}</p>
                {mediaFile && (
                  <GrSend style={{ cursor: "pointer" }} className="ms-3" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </SpaceCard>
  );
};

export default UserChatMessages;
