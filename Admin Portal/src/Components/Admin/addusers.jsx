import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./navbar";
import {
  MDBBtn,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBSpinner
} from "mdb-react-ui-kit";

export default function Addusers() {
  const [submit,setSubmit]=useState(false);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);
    const firstName=document.getElementById("firstname").value;
    const lastName=document.getElementById("lastname").value;
    const email=document.getElementById("email").value;
    await fetch(
      `http://localhost:4000/addUser?firstname=${firstName}&lastname=${lastName}&email=${email}`,
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
        if(data.message=="added"){
          window.location.href="/manage-users";
        }
        else if(data.message=="already"){
          setSubmit(false);
          document.getElementById("email-error").innerHTML="EMAIL ALREADY EXIST";
          document.getElementById("email-error").style.color="red";
          document.getElementById("email-error").style.display="block";
        }
        else if(data.message=="invalid"){
          setSubmit(false);
          document.getElementById("email-error").innerHTML="INVALID EMAIL";
          document.getElementById("email-error").style.color="red";
          document.getElementById("email-error").style.display="block";
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
        <h3
          style={{
            fontWeight: "bold",
            fontFamily: "Bahnschrift",
            textAlign: "left",
            marginTop: "15px",
            marginLeft: "30px",
          }}
        >
          Add Users
        </h3>
        <center>
          <MDBCol md="7">
            <MDBCard className="my-5">
              <form
                id="addform"
                onSubmit={handleSubmit}
              >
                <MDBCardBody className="p-5">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Firstname"
                    name="firstname"
                    id="firstname"
                    type="firstname"
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Lastname"
                    name="lastname"
                    id="lastname"
                    type="lastname"
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    required
                  />
                  <span
                    id="email-error"
                    style={{ textAlign: "left", marginTop: "-12zpx" }}
                  ></span>
                  <MDBBtn
                    className="w-100 mb-4"
                    size="md"
                    style={{
                      backgroundColor: "#3c4763",
                      color: "white",
                    }}
                  >
                    {submit? <MDBSpinner style={{color:"white"}}></MDBSpinner>:<span>Add User</span>}
                  </MDBBtn>
                </MDBCardBody>
              </form>
            </MDBCard>
          </MDBCol>
        </center>
      </div>
    </div>
  );
}
