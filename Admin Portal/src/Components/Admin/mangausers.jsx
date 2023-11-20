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

export default function Mangaeusers() {
  const [users, setUsers] = useState([]);
  const [back, setBack] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch(
    `http://localhost:4000/getUsers`,
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
      setUsers(data.data);
      setBack(data.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  const searchQuery = () => {
    var query = document.getElementById("search").value;
    setUsers(
      users.filter((user) =>
        (user.firstname + user.lastname)
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    );
  };

  function backQuery() {
    var query = document.getElementById("search").value;
    if (query == "") {
      setUsers(back);
    }
  }

  const Deleteusers = async (id) => {
    await fetch(
      `http://localhost:4000/deleteuser?id=${id}`,
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
          fetchData();
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
            Manage Users
          </h3>
          <a href="/add-users">
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
              Add User
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
                placeholder="Search By Name"
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
          {users.map((user, index) => (
            <MDBCol>
              <MDBCard className="h-100">
                <MDBCardBody
                  style={{ fontFamily: "bahnschrift", textAlign: "center" }}
                >
                  <MDBCardTitle>
                    {user.firstname.toUpperCase()} {user.lastname.toUpperCase()}
                  </MDBCardTitle>
                  <MDBCardText>
                    <span>{user.email}</span>
                    <br />
                    <span>
                      <b>Created At:</b>{" "}
                      {new Date(user.createdAt).toLocaleString()}
                    </span>
                    <br />
                    <br />
                    <a href={`/update-users?id=${user.Id}`}>
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
                          if(window.confirm("Are you sure you want to delete this user?")){
                            Deleteusers(user.Id);
                          }
                        }}
                      >
                        Delete
                      </Button>
                  </MDBCardText>
                </MDBCardBody>
                <MDBCardFooter>
                  <small className="text-muted">
                    Updated At:{" "}
                    {new Date(user.updatedAt).toLocaleString()}
                  </small>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </div>
    </div>
  );
}
