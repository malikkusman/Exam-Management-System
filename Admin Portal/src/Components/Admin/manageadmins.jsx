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

export default function Mangaeadmins() {
  const [users, setUsers] = useState([]);
  const [back, setBack] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch(
    `http://localhost:4000/getadmins`,
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
      setUsers(data.data.filter((item)=>item.role=="Simple Admin"));
      setBack(data.data.filter((item)=>item.role=="Simple Admin"));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  const searchQuery = () => {
    var query = document.getElementById("search").value;
    setUsers(
      users.filter((user) =>
        (user.email)
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
      `http://localhost:4000/deleteadmin?id=${id}`,
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
            Manage Admins
          </h3>
          <a href="/add-admin">
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
              Add Admin
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
                placeholder="Search By Email"
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
                  {user.email}
                  </MDBCardTitle>
                  <MDBCardText>
                    <span>{user.role}</span>
                    <br />
                    <br />
                    <a href={`/update-admin?id=${user.Id}`}>
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
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </div>
    </div>
  );
}
