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
  MDBBtn,
  MDBTypography,
  MDBIcon,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdb-react-ui-kit";

export default function Bookingdetails() {
  const [staticModal, setStaticModal] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selected, setSelected] = useState("");
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");

  const toggleShow = () => setStaticModal(!staticModal);
  useEffect(() => {
    const fetchData = async () => {
      const responses1 = await fetch(
        `https://bird-cyan-moose.glitch.me/getadmin?token=${localStorage.getItem(
          "ad-sesh"
        )}`
      );
      const responseDatas1 = await responses1.json();
      if (responseDatas1.length > 0) {
        if (responseDatas1[0].ManageBookings == 0) {
          window.location.href = "/not-permission";
        }
      }
      const response = await fetch(
        "https://bird-cyan-moose.glitch.me/getbookings"
      );
      const responseData = await response.json();
      setBookings(responseData.filter((item) => item.Id == id));
      const responses = await fetch(
        "https://bird-cyan-moose.glitch.me/getrooms"
      );
      const responseDatas = await responses.json();
      const roomNumbers = responseDatas
        .filter((item) => item.availability === "Available")
        .map((item) => item.roomno);
      const firstRoomNumber = roomNumbers[0];
      setRooms(roomNumbers);
      setSelected(firstRoomNumber);
    };
    fetchData();
  }, []);

  const handleSelected = (event) => {
    setSelected(event.target.value);
  };

  function calculateTimeDifference(date1, date2) {
    const diffInMilliseconds = Math.abs(date2 - date1);

    // Calculate individual units
    const seconds = Math.floor(diffInMilliseconds / 1000) % 60;
    const minutes = Math.floor(diffInMilliseconds / (1000 * 60)) % 60;
    const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    // Construct the result
    let result = "";
    if (days > 0) {
      result += `${days} day(s) `;
    }
    if (hours > 0) {
      result += `${hours} hour(s) `;
    }
    if (minutes > 0) {
      result += `${minutes} minute(s) `;
    }
    if (seconds > 0) {
      result += `${seconds} second(s) `;
    }

    return result.trim();
  }

  function convertToGermanDateTimeFormat(datetime) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const germanDateTime = datetime.toLocaleString("de-DE", options);
    return germanDateTime;
  }

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
            Booking Details
          </h3>
        </div>
        <center>
          <section
            className="h-100"
            style={{ marginLeft: "7px", width: "80%", marginTop: "40px" }}
          >
            {bookings.map((card, index) => (
              <MDBCard
                className="mb-3"
                style={{ borderRadius: ".5rem", marginLeft: "15px" }}
              >
                <MDBRow className="g-0">
                  <MDBCol md="12">
                    <MDBCardBody className="p-4">
                      <MDBTypography
                        tag="h6"
                        style={{ fontFamily: "Bahnschrift", color: "#0F0D3D" }}
                      >
                        Information
                      </MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography
                            tag="h6"
                            style={{
                              fontFamily: "Bahnschrift",
                              color: "#0F0D3D",
                            }}
                          >
                            Name
                          </MDBTypography>
                          <MDBCardText
                            className="text-muted"
                            style={{ fontFamily: "Bahnschrift" }}
                          >
                            {card.name}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography
                            tag="h6"
                            style={{
                              fontFamily: "Bahnschrift",
                              color: "#0F0D3D",
                            }}
                          >
                            Email
                          </MDBTypography>
                          <MDBCardText
                            className="text-muted"
                            style={{ fontFamily: "Bahnschrift" }}
                          >
                            {card.email}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography
                            tag="h6"
                            style={{
                              fontFamily: "Bahnschrift",
                              color: "#0F0D3D",
                            }}
                          >
                            Contact
                          </MDBTypography>
                          <MDBCardText
                            className="text-muted"
                            style={{ fontFamily: "Bahnschrift" }}
                          >
                            {card.telephone}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography
                            tag="h6"
                            style={{
                              fontFamily: "Bahnschrift",
                              color: "#0F0D3D",
                            }}
                          >
                            Arrival
                          </MDBTypography>
                          <MDBCardText
                            className="text-muted"
                            style={{ fontFamily: "Bahnschrift" }}
                          >
                            {convertToGermanDateTimeFormat(
                              new Date(card.arrival)
                            )}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography
                            tag="h6"
                            style={{
                              fontFamily: "Bahnschrift",
                              color: "#0F0D3D",
                            }}
                          >
                            Departure
                          </MDBTypography>
                          <MDBCardText
                            className="text-muted"
                            style={{ fontFamily: "Bahnschrift" }}
                          >
                            {convertToGermanDateTimeFormat(
                              new Date(card.departure)
                            )}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography
                            tag="h6"
                            style={{
                              fontFamily: "Bahnschrift",
                              color: "#0F0D3D",
                            }}
                          >
                            Stay
                          </MDBTypography>
                          <MDBCardText
                            className="text-muted"
                            style={{ fontFamily: "Bahnschrift" }}
                          >
                            {calculateTimeDifference(
                              new Date(card.arrival),
                              new Date(card.departure)
                            )}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <Button
                        size="sm"
                        variant="success"
                        style={{ marginRight: "2px", marginTop: "2px" }}
                        onClick={toggleShow}
                      >
                        Allocate
                      </Button>
                      <a
                        href={`https://bird-cyan-moose.glitch.me/rejectbooking?id=${id}`}
                      >
                        <Button
                          size="sm"
                          variant="danger"
                          style={{ marginRight: "2px", marginTop: "2px" }}
                        >
                          Reject
                        </Button>
                      </a>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            ))}
          </section>
        </center>
      </div>
      <MDBModal
        staticBackdrop
        tabIndex="-1"
        show={staticModal}
        setShow={setStaticModal}
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Allocate Room</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            {rooms.length == 0 ? (
              <h4 style={{ fontFamily: "bahnschrift", margin: "20px" }}>
                Curently No Room Available
              </h4>
            ) : (
              <form
                action={`https://bird-cyan-moose.glitch.me/allocateroom?id=${id}&room=${selected}`}
                method="post"
              >
                <MDBModalBody>
                  <select
                    className="form-select form-select-lg mb-3"
                    name="rooms"
                    id="room"
                    md="12"
                  >
                    {rooms.map((room, index) => (
                      <option value={room[index]} onChange={handleSelected}>
                        {room}
                      </option>
                    ))}
                  </select>
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={toggleShow}>
                    Close
                  </MDBBtn>
                  <MDBBtn type="submit">Allocate</MDBBtn>
                </MDBModalFooter>
              </form>
            )}
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}
