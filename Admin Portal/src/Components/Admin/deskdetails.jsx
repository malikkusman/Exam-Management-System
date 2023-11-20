import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./navbar";
import { Button } from "react-bootstrap";
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

export default function Deskdetails() {
  const [desk, setDesks] = useState([]);
  const [occupied, setOccupied] = useState([]);

  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");
  useEffect(() => {
    const fetchData = async () => {
      await fetch(
      `http://localhost:4000/getSingledesk?id=${id}`,
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
        setDesks(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    };

    const fetchOccupied = async () => {
      await fetch(
      `http://localhost:4000/getOccupiedRoom?id=${id}&type=desk`,
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


  const DeleteDesks = async (id) => {
    await fetch(
      `http://localhost:4000/deleteDesk?id=${id}`,
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
        if(data.message=="deleted"){
          window.location.href="/manage-desks";
        }
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
            Desk Details
          </h3>
        </div>
        <center>
          <section
            className="h-100"
            style={{ marginLeft: "7px", width: "80%", marginTop: "40px" }}
          >
            {desk.map((card, index) => (
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
                            {card.deskno}
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
                      <a href={`/update-desk?id=${card.Id}`}>
                        <Button
                          size="sm"
                          variant="success"
                          style={{ marginRight: "2px", marginTop: "2px" }}
                        >
                          Update
                        </Button>
                      </a>
                        <Button
                          size="sm"
                          variant="danger"
                          style={{ marginRight: "2px", marginTop: "2px" }}
                          onClick={()=>{
                            if(window.confirm("Are you sure you want to delete this desk?")){
                                DeleteDesks(card.Id)
                            }
                          }}
                        >
                          DELETE
                        </Button>
                      <a href={`/desk-history?id=${id}`}>
                        <Button
                          size="sm"
                          variant="primary"
                          style={{ marginRight: "2px", marginTop: "2px" }}
                        >
                          Desk History
                        </Button>
                      </a>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            ))}
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
            <br />
            <br />
          </section>
        </center>
      </div>
    </div>
  );
}
