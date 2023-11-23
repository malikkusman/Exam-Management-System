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
            src="/Assets/logo4.svg"
            alt="Booking Tool"
            id="mainlogo"
            style={{ width: "200px", height: "100px", marginTop: "-10px" }}
          />
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/teacher-home">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/attendance">
              <CDBSidebarMenuItem icon="home">Attendance</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/create-assignment">
              <CDBSidebarMenuItem icon="columns">Manage Assignment</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/assign-marks">
              <CDBSidebarMenuItem icon="book">
                Assign Marks
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/generate-reports">
              <CDBSidebarMenuItem icon="book">
                Generate Reports
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/user-credentials">
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
