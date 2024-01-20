import React, { useState, useRef, useEffect } from "react";
import { Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import SpaceCard from "../../hoc/SpaceCard";
import UserImg from "../../assets/images/user-img.png";
import "../../assets/css/user-chats.css";
import { getConversationMessages } from "../../store/storeIndex";

const UserChats = (props) => {
  const { setConversationId, setConversationUser } = props;
  const dispatch = useDispatch();

  const scrollRef = useRef();
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const conversations = useSelector((state) => state.chat.conversations);
  const userId = useSelector((state) => state.user.user._id);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleChatSelection = (chat, index) => {
    setConversationId(chat._id);
    setConversationUser({
      name: chat.fullName,
      photo: chat.photo,
    });
    dispatch(getConversationMessages(chat._id, token));
    setSelectedChatIndex(index);
  };

  const [selectedCard, setSelectedCard] = useState();

  return (
    <SpaceCard>
      <div className="p-3 userChat-height">
        {conversations.length > 0 ? (
          conversations.map((chat, index) => {
            const isSelected = index === selectedChatIndex;
            return (
              <div
                key={index}
                className={`d-flex align-items-center my-3 pb-3 border-bottom main-chat ${
                  isSelected ? "selected-chat" : ""   
                }`}   
                onClick={() => handleChatSelection(chat, index)}
              >   
                {chat.members.length > 2 ? (    
                  <React.Fragment>
                    <p>G</p>
                    <div className="d-flex flex-column align-items-start justify-content-center ms-3">
                      <p className="m-0 p-0 user-name">Booking Chat</p>
                      <p className="m-0 p-0 user-msg">Hello kkkkk</p>
                    </div>
                  </React.Fragment>
                ) : (
                  chat.members.map((member, idx) => {
                    if (member._id !== userId) {
                      return (
                        <React.Fragment key={idx}>
                          <Image
                            src={
                              member.photo
                                ? `http://localhost:5001/${member.photo}`
                                : UserImg
                            }
                            alt="User"
                            roundedCircle
                            width={40}   
                            height={40}
                          />
                          <div className="d-flex flex-column align-items-start justify-content-center ms-3">
                            <p className="m-0 p-0 user-name">{member.name}</p>
                            <p className="m-0 p-0 user-msg">
                              {chat.lastMessage}
                            </p>
                          </div>
                        </React.Fragment>
                      );
                    }
                    return null;
                  })
                )}
              </div>
            );
          })
        ) : (
          <p>No chats available.</p>
        )}
        <div ref={scrollRef} />
      </div>
    </SpaceCard>
  );
};

export default UserChats;
