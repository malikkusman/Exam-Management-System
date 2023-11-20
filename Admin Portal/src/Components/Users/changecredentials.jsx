import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./navbar";
import {
  MDBBtn,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import Cookies from "js-cookie";

export default function UserPassword() {
  const [submit,setSubmit]=useState(false);
  const [userid,setUserid]=useState("");

  useEffect(()=>{
    setUserid(hexToText(Cookies.get("seshId")));
  },[])

  function hexToText(hex) {
    let text = '';
    try{
        for (let i = 0; i < hex.length; i += 2) {
            text += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
    }
    catch{
        text="";
    }
    return text;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    var newpass = document.getElementById("newpass").value;
    var current = document.getElementById("current").value;
    var confirmpass = document.getElementById("confirm").value;
    var submit = true;
    if (newpass != confirmpass) {
      submit = false;
      document.getElementById("pass-error").innerHTML =
        "New Password & Confirm Pasword must be same";
      document.getElementById("pass-error").style.display = "block";
      document.getElementById("pass-error").style.color = "red";
    } else if(newpass.length<6) {
      document.getElementById("pass-error").innerHTML =
        "New Password length must be 6 or more";
      document.getElementById("pass-error").style.display = "block";
      document.getElementById("pass-error").style.color = "red";
    }
    else{
      setSubmit(true);
      document.getElementById("pass-error").display="none";
      await fetch(
        `http://localhost:4000/changeuserpass?current=${current}&newpass=${newpass}&id=${userid}`,
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
          setSubmit(false);
          if(data.message=="updated"){
            document.getElementById("addform").reset();
            document.getElementById("pass-error").innerHTML =
            "CREDENTIALS HAS BEEN CHANGED";
            document.getElementById("pass-error").style.display = "block";
            document.getElementById("pass-error").style.color = "green";
          }
          else if(data.message=="invalid"){
            document.getElementById("pass-error").innerHTML =
            "CURRENT PASSWORD IS INCORRECT";
            document.getElementById("pass-error").style.display = "block";
            document.getElementById("pass-error").style.color = "red";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
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
          Change Credentials
        </h3>
        <center>
          <MDBCol md="7">
            <MDBCard className="my-5">
              <form
                onSubmit={handleSubmit}
                method="post"
                id="addform"
              >
                <MDBCardBody className="p-5">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Current Password"
                    name="current"
                    id="current"
                    type="password"
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="New Password"
                    name="newpass"
                    id="newpass"
                    type="password"
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Confirm Password"
                    name="confirm"
                    id="confirm"
                    type="password"
                    required
                  />
                  <span id="pass-error"></span>
                  <br />
                  <MDBBtn
                    type="submit"
                    className="w-100 mb-4"
                    size="md"
                    style={{
                      backgroundColor: "#3c4763",
                      color: "white",
                    }}
                  >
                    {submit?<MDBSpinner style={{color:"white"}}></MDBSpinner>:<span>Change</span>}
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
