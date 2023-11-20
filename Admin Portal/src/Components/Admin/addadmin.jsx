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

export default function AddAdmin() {
  const [submit,setSubmit]=useState(false);
  const [role,setRole]=useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);
    const email=document.getElementById("email").value;
    await fetch(
      `http://localhost:4000/addadmin?email=${email}&role=${role}`,
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
          window.location.href="/manage-admins";
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

  const handleRole=(event)=>{
    setRole(event.target.value);
  }
  
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
          Add Admin
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
                  <div class="mb-4">
                    <select class="form-select" id="dropdown" name="dropdown" required value={role} onChange={handleRole}>
                        <option value="">-- Select Role --</option>
                        <option value="Super Admin">Super Admin</option>
                        <option value="Simple Admin">Simple Admin</option>
                    </select>
                    </div>
                  <MDBBtn
                    className="w-100 mb-4"
                    size="md"
                    style={{
                      backgroundColor: "#3c4763",
                      color: "white",
                    }}
                  >
                    {submit? <MDBSpinner style={{color:"white"}}></MDBSpinner>:<span>Add Admin</span>}
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
