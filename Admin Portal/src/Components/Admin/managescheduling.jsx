import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./navbar";
import { Card, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

export default function ManageScheduling() {
  const [bookings, setBookings] = useState([]);
  const [back, setBack] = useState([]);
  useEffect(() => {
    fetchBooking();
  }, []);

  const searchQuery = () => {
    var query = document.getElementById("search").value;
    setBookings(
      bookings.filter((user) =>
        (user.firstname + " "+ user.lastname).toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  function backQuery() {
    var query = document.getElementById("search").value;
    if (query == "") {
      setBookings(back);
    }
  }

  const fetchBooking = async () => {
    await fetch(
    `http://localhost:4000/getAdminbooking`,
    {
      method: "GET",
      headers: {
        "api-key": process.env.REACT_APP_API_KEY,
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed.");
      }
      return response.json();
    })
    .then((data) => {
        setBookings(data.data);
        setBack(data.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return (
    <div style={{ width: "100%", display: "flex" }}>
      <div style={{ width: "22%" }}>
        <Sidebar />
      </div>
      <div style={{ width: "83%" }}>
        <Header />
        <div
          className="head"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h3
            style={{
              fontWeight: "bold",
              fontFamily: "Bahnschrift",
              textAlign: "left",
              marginTop: "15px",
              marginLeft: "30px",
            }}
          >
            Manage Schedule
          </h3>
          <a href="/add-desks">
            <Button
              style={{
                backgroundColor: "#3c4763",
                border: "none",
                color: "white",
                fontWeight: "bold",
                marginTop: "10px",
                marginRight: "10px",
              }}
            >
              Add Schedule
            </Button>
          </a>
        </div>
        <center>
          <div
            className="search-bar"
            style={{ width: "270px", marginLeft: "15px" }}
          >
            <label htmlFor="search">
              <span className="visually-hidden">Search</span>
            </label>
            <div className="input-group">
              <input
                type="text"
                id="search"
                className="form-control"
                placeholder="Search by Name"
                onChange={backQuery}
              />
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: "#3c4763",
                  color: "white",
                }}
                onClick={searchQuery}
              >
                Search
              </button>
            </div>
          </div>
        </center>
        <MDBRow
          className="row-cols-1 row-cols-md-4 g-4"
          style={{
            margin: "20px",
            justifyContent: "center",
            marginLeft: "30px",
          }}
        >
          {bookings.map((booking,index)=>(
              <MDBCol>
              <MDBCard
                className="h-100"
              >
                <MDBCardBody style={{ textAlign: "center" }}>
                  <MDBCardTitle>{booking.firstname} {booking.lastname}</MDBCardTitle>
                  <MDBCardText>
                    <span>{booking.email}</span>
                    <br />
                    <span>
                      <b>{booking.roomno!=undefined?"Room No: ": "Desk No: "}:</b> {booking.roomno!=undefined? booking.roomno : booking.deskno}
                      <br />
                      <b>From:</b> {new Date(booking.fromTime).toLocaleString()}
                      <br />
                      <b>To:</b> {new Date(booking.toTime).toLocaleString()}
                    </span>
                    <br />
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </div>
    </div>
  );
}
