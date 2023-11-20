import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import {
  MDBNavbarBrand,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import Cookies from "js-cookie";

export default function Header() {
  const [name, setName] = useState("");
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const isMobileView = window.innerWidth <= 768;
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  return (
    <div style={{ width: "100%" }}>
      <Navbar>
        <Container>
          <Navbar.Brand
            href="#home"
            style={{
              textAlign: "center",
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <MDBNavbarBrand
              href="#"
              style={{
                color: "#3c4763",
                marginLeft: "25px",
                fontFamily: "Bahnschrift",
                fontSize: "30px",
              }}
            >
              Dashboard
            </MDBNavbarBrand>
            <p
              style={{
                color: "#3c4763",
                fontWeight: "normal",
                fontSize: "14px",
                marginTop: "-10px",
                marginLeft: "25px",
              }}
            >
              {formattedDate}
            </p>
          </Navbar.Brand>
          <div className="d-flex align-items-center">
            <div className="dropdown">
              {!isMobileView && ( // Check if it's not mobile view
                <span
                  style={{
                    marginRight: "5px",
                    color: "#223351",
                    marginTop: "-5px",
                    fontWeight: "bold",
                    fontFamily: "Bahnschrift",
                  }}
                >
                  {name}
                </span>
              )}
              <img
                src="/Assets/adminfavicon.png"
                className="rounded-circle"
                height="30"
                width="30"
                alt="publisher"
                loading="lazy"
              />
            </div>
            <MDBDropdown>
              <MDBDropdownToggle
                tag="a"
                className="nav-link"
                role="button"
                style={{ marginRight: "5px" }}
              ></MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem
                  link
                  onClick={() => {
                   Cookies.remove("seshad");
                    window.location.href = "/";
                  }}
                >
                  Logout
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}
