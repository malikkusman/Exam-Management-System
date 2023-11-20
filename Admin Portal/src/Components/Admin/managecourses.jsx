import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Sidebar from "./sidebar";
import Header from "./navbar";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

export default function ManageCourses() {
  const [desks, setdesks] = useState([]);
  const [back, setBack] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch(
    `http://localhost:4000/getDesks`,
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
      setdesks(data.data);
      setBack(data.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  function backQuery() {
    var query = document.getElementById("search").value;
    if (query == "") {
      setdesks(back);
    }
  }


  const searchQuery = () => {
    var query = document.getElementById("search").value;
    setdesks(
      desks.filter((user) =>
        user.deskno.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  function backQuery() {
    var query = document.getElementById("search").value;
    if (query == "") {
      setdesks(back);
    }
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
            Manage Courses
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
              Add Courses
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
                placeholder="By Desk No e.g 01"
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
          {desks.map((desk, index) => (
            <MDBCol>
              <MDBCard className="h-100">
                <MDBCardBody style={{ textAlign: "center" }}>
                  <MDBCardTitle>Desk No: {desk.deskno}</MDBCardTitle>
                  <MDBCardText>
                    <br />
                    <b>
                      <a href={`/desk-details?id=${desk.Id}`}>More Details</a>
                    </b>
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
