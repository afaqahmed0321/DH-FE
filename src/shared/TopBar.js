import React, { useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import "../assets/css/topbar.css";
import LogoImg from "../assets/images/logo.svg";
import LogoIcon from "../assets/images/logoIcon.svg";
import userImage from "../assets/images/user-img.png";
import notification from "../assets/images/icons/notifications.svg";
import { Link, NavLink } from "react-router-dom";
import SettingsIcon from "../assets/images/icons/Settings";
import LogoutIcon from "../assets/images/icons/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../store/storeIndex";
import { useSelector } from "react-redux";

const TopBar = () => {
  const user = useSelector((state) => state.user.user);
  const isLogin = useSelector((state) => state.user.isLogin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [notifications] = useState(10);
  return (
    <Row className="py-3 px-4 m-0 topbar">
      <Col className="logo">
        <Image fluid className="h-48px " src={LogoImg} loading="lazy" />
      </Col>
      <Col className="logoIcon">
        <Image fluid className="h-48px" src={LogoIcon} loading="lazy" />
      </Col>
      <Col className="d-flex align-items-center justify-content-end">
        <div className="bar-icons">
          <Link to='/dashboard/notifications'>
            <div className="notifiy-dropbtn-style">
              <Image fluid src={notification} loading="lazy" />
              <p>{notifications}</p>
            </div>
          </Link>
          <Dropdown className="user-dropdown">
            <Dropdown.Toggle
              className="dropbtn-style"
              id="dropdown-menu-align-end"
            >
              <div className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-md-block text-end d-none">
                  <p className="text-18 fw-bold m-0">
                    {isLogin && user && user.fullName}
                  </p>
                  <p className="text-14 grey font-weight-500 m-0">
                    {isLogin && user && user.role}
                  </p>
                </div>
                <Image fluid src={userImage} loading="lazy" className="h-56" />
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item className="py-0">
                <div>
                  <NavLink
                    to={"/settings/edit"}
                    className="text-decoration-none text-dark d-flex align-items-center gap-2 border-bottom pt-1 pb-2"
                  >
                    <SettingsIcon /> Account Settings
                  </NavLink>
                </div>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => dispatch(userLogout(navigate))}>
                <Button className="bg-transparent border-0 text-danger p-0 d-flex align-items-center gap-2">
                  <LogoutIcon />
                  Logout
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Col>
    </Row>
  );
};

export default TopBar;
