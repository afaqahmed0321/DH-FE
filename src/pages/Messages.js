import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../layout/MainLayout";
import UserChats from "../components/messages/UserChats";
import UserChatMessages from "../components/messages/UserChatMessages";
import { getUserConversations } from "../store/storeIndex";
import EmptyChat from "../components/messages/EmptyChat";

const Users = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user._id);
  const [conversationId, setConversationId] = useState("");
  const [conversationUser, setConversationUser] = useState({
    name: "",
    photo: "",
  });

  useEffect(() => {
    dispatch(getUserConversations(userId, token));
  }, [userId, token]);

  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setShowSidebar(!showSidebar);
    }
  };

  return (
    <MainLayout>
      <Container fluid>
        <Row>
          {showSidebar && (
            <Col xs="12" lg="4">
              <span onClick={toggleSidebar}>
                <UserChats
                  setConversationId={setConversationId}
                  setConversationUser={setConversationUser}
                  conversationUser={conversationUser}
                />
              </span>
            </Col>
          )}
          <Col xs="12" lg={showSidebar ? "8" : "12"}>
            {conversationId ? (
              <UserChatMessages
                conversationId={conversationId}
                conversationUser={conversationUser}
              />
            ) : (
              <EmptyChat />
            )}
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default Users;
