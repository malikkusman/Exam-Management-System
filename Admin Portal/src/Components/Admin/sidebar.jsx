import React, { useState, useEffect } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

const Sidebar = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [openclass, setOpenclass] = useState("");
  useEffect(() => {
    if (screenWidth <= 600) {
      setOpenclass("pro-sidebar toggled");
      document.getElementById("mainlogo").style.display = "none";
      document.getElementById("bars").style.display = "none";
    } else {
      setOpenclass("pro-sidebar");
      document.getElementById("mainlogo").style.display = "block";
      document.getElementById("bars").style.display = "block";
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "scroll initial",
        position: "fixed",
        zIndex: "1",
        top: "0",
        left: "0",
      }}
    >
      <CDBSidebar
        textColor="white"
        className={openclass}
        style={{ backgroundColor: "#3c4763" }}
      >
        <CDBSidebarHeader
          prefix={<i className="fa fa-bars fa-large" id="bars"></i>}
        >
          <img
            src="/Assets/logo.png"
            alt="Booking Tool"
            id="mainlogo"
            style={{ width: "160px", height: "70px", marginTop: "-10px" }}
          />
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/home">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/manage-users">
              <CDBSidebarMenuItem icon="users">Manage Users</CDBSidebarMenuItem>
            </NavLink>
            {process.env.REACT_APP_SUPER_ROLE==Cookies.get("seshR")?(
               <NavLink exact to="/manage-admins">
               <CDBSidebarMenuItem icon="users">Manage Admins</CDBSidebarMenuItem>
             </NavLink>
            ):(
              <NavLink exact to="/">
             </NavLink>
            )}
            <NavLink exact to="/manage-teachers">
              <CDBSidebarMenuItem icon="home">Manage Teachers</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/manage-courses">
              <CDBSidebarMenuItem icon="columns">Manage Courses</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/manage-scheduling">
              <CDBSidebarMenuItem icon="book">
                Manage Scheduling
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/change-credentials">
              <CDBSidebarMenuItem icon="key">
                Change Credential
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            Admin Panel
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
