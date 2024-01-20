import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "../assets/css/sidebar-nav.css";
import useWindowDimensions from "../hooks/useWindowDimensions";
import SettingsIcon from "../assets/images/icons/Settings";
import MessagesIcon from "../assets/images/icons/Messages";
import PaymentIcon from "../assets/images/icons/Payment";
import ManagerIcon from "../assets/images/icons/Manager";
import BookingIcon from "../assets/images/icons/Booking";
import HomeIcon from "../assets/images/icons/Home";
import SpacesIcon from "../assets/images/icons/Spaces";

const SidebarNav = () => {

  const userRole = useSelector(state => state.user.user.role);

  return (
    <Sidebar
      defaultCollapsed={useWindowDimensions()}
      width="290px"
      collapsedWidth="65px"
      backgroundColor="#fff"
      className="main-navigation"
    >
      <Menu className="mt-3 gap-2">
        {userRole === 'Storage Owner' && <NavLink to="/" className="menu-item-link">
          <MenuItem>
            <span className="menu-icon">
              <HomeIcon />
            </span>
            Home
          </MenuItem>
        </NavLink>}
        {userRole === 'Customer' && <NavLink to="/customer" className="menu-item-link">
          <MenuItem>
            <span className="menu-icon">
              <HomeIcon />
            </span>
            Home
          </MenuItem>
        </NavLink>}
        {userRole === 'Storage Owner' && <NavLink to="/dashboard/all-spaces" className="menu-item-link">
          <MenuItem>
            <span className="menu-icon">
              <SpacesIcon />
            </span>
            My Spaces
          </MenuItem>
        </NavLink>}
        <NavLink to="/dashboard/bookings" className="menu-item-link">
          <MenuItem>
            <span className="menu-icon">
              <BookingIcon />
            </span>
            Booking Management
          </MenuItem>
        </NavLink>
        {userRole === 'Storage Owner' && <NavLink to="/dashboard/my-managers" className="menu-item-link">
          <MenuItem>
            <span className="menu-icon">
              <ManagerIcon />
            </span>
            My Managers
          </MenuItem>
        </NavLink>}
        {/* <NavLink to="/dashboard/payment-history" className="menu-item-link">
          <MenuItem>
            <span className="menu-icon">
              <PaymentIcon />
            </span>
            Payment History
          </MenuItem>
        </NavLink> */}
        {userRole === 'Truck Driver' && <NavLink to="/dashboard/trucks" className="menu-item-link">
          <MenuItem>
            <span className="menu-icon">
              <PaymentIcon />
            </span>
            My Trucks
          </MenuItem>
        </NavLink>}
        <NavLink to="/dashboard/messages" className="menu-item-link">
          <MenuItem>
            <span className="menu-icon">
              <MessagesIcon />
            </span>
            Messages
          </MenuItem>
        </NavLink>
      </Menu>

      <Menu className="sidebar-footer">
        <NavLink to="/support" className="menu-item-link">
          <MenuItem>
            <span className="menu-icon">
              <SettingsIcon />
            </span>
            Support & Help Center
          </MenuItem>
        </NavLink>
      </Menu>
    </Sidebar>
  );
};

export default SidebarNav;
