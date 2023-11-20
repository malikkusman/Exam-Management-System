import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./navbar";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBTypography,
} from "mdb-react-ui-kit";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function RoomDetailsUser() {
  const [room, setRoom] = useState([]);
  const [occupied,setOccupied]=useState([]);
  const [Id, setId] = useState("");

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get("id");
    setId(id);
    const fetchData = async () => {
      await fetch(
      `http://localhost:4000/getSingleRooms?id=${id}`,
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
        setRoom(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    };

    const fetchOccupied = async () => {
      await fetch(
      `http://localhost:4000/getOccupiedRoom?id=${id}&type=room`,
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
        const current=new Date();
        setOccupied(data.data.filter((item)=>new Date(item.fromTime)>=current));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    };
    fetchOccupied();
    fetchData();
  }, []);

  return (
    <div style={{ width: "100%", display: "flex" }}>
      <div style={{ width: "17%" }}>
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
            Room Details
          </h3>
        </div>
        <center>
          <section
            className="h-100"
            style={{ marginLeft: "7px", width: "80%", marginTop: "40px" }}
          >
            {room.map((card, index) => (
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
                            Room No
                          </MDBTypography>
                          <MDBCardText
                            className="text-muted"
                            style={{ fontFamily: "Bahnschrift" }}
                          >
                            {card.roomno}
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
                            Podium Available?
                          </MDBTypography>
                          <MDBCardText
                            className="text-muted"
                            style={{ fontFamily: "Bahnschrift" }}
                          >
                            {card.ispodium == 1 ? "Yes" : "No"}
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
                           Conference Table Available?
                          </MDBTypography>
                          <MDBCardText
                            className="text-muted"
                            style={{ fontFamily: "Bahnschrift" }}
                          >
                            {card.isctable == 1 ? "Yes" : "No"}
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
                            Projector Available?
                          </MDBTypography>
                          <MDBCardText
                            className="text-muted"
                            style={{ fontFamily: "Bahnschrift" }}
                          >
                            {card.isprojector == 1 ? "Yes" : "No"}
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
                            WhiteBoard Available?
                          </MDBTypography>
                          <MDBCardText
                            className="text-muted"
                            style={{ fontFamily: "Bahnschrift" }}
                          >
                            {card.iswhiteboard == 1 ? "Yes" : "No"}
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
                            Room Status
                          </MDBTypography>
                          <MDBCardText
                            className="text-muted"
                            style={{ fontFamily: "Bahnschrift" }}
                          >
                            {card.status}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="pt-1">
                        <MDBCol size="12" className="mb-3">
                          <MDBTypography
                            tag="h6"
                            style={{
                              fontFamily: "Bahnschrift",
                              color: "#0F0D3D",
                            }}
                          >
                            Description
                          </MDBTypography>
                          <MDBCardText
                            className="text-muted"
                            style={{ fontFamily: "Bahnschrift" }}
                          >
                            {card.description}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            ))}
            <div>
            <div>
              <MDBRow>
                <MDBCol md="6" className="mb-4">
                  <Calendar />
                </MDBCol>
                <MDBCol md="6" className="mb-4">
                  <MDBCard className="mb-3">
                    <div className="data" style={{ margin: "15px" }}>
                      <h5>Desk Occupied Dates</h5>
                      {occupied.map((dates, index) => (
                        <div>
                          <p>
                            From:{" "}
                            {
                              new Date(dates.fromTime).toLocaleString()
                            }
                          </p>
                          <p style={{ marginTop: "-17px" }}>
                            To:{" "}
                            {
                              new Date(dates.toTime).toLocaleString()
                            }
                          </p>
                          <hr />
                        </div>
                      ))}
                    </div>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </div>
            </div>
            <br />
            <br />
          </section>
        </center>
      </div>
    </div>
  );
}
