import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import axios from "axios";
import Header from "./navbar";
import {
  MDBBtn,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBSpinner,
} from "mdb-react-ui-kit";
import Alert from "react-bootstrap/Alert";

export default function Addusers() {
  const [submit, setSubmit] = useState(false);
  const [Ispodium, setIspodium] = useState(false);
  const [Isctable, setIsctable] = useState(false);
  const [Isprojector, setIsProjector] = useState(false);
  const [Iswhiteboard, setIswhiteboard] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);
    const Data = {
      Firstname: document.getElementById("fname").value,
      Lastname: document.getElementById("lname").value,
      email: document.getElementById("email").value,
      Username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      role: "student"
    }
    console.log(Data)
    const role = "student"
    const existingUsers = await axios.get(`http://localhost:4000/user/getall?role=${role}`);
    console.log('Existing Users:', existingUsers.data);
    const duplicateEmail = existingUsers.data.some(user => user.email === document.getElementById("email").value);
    const duplicateUsername = existingUsers.data.some(user => user.Username === document.getElementById("username").value);

    if (duplicateEmail || duplicateUsername) {
      alert("Email or Username already exists");
    }
    else {
      axios.post('http://localhost:4000/user/register', Data)
        .then((response) => {
          console.log('Response:', response.data);
          if (response.data.message == "data added") {
            window.location.href = "manage-users";
          }
          else if (response.data == "already") {
            setSubmit(false);
            document.getElementById("room-error").innerHTML = "ROOM ALREADY EXIST";
            document.getElementById("room-error").style.color = "red";
            document.getElementById("room-error").style.display = "block";
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  const handleSubmit1 = async (event) => {
    event.preventDefault();
    setSubmit(true);
    const roomno = document.getElementById("roomno").value;
    const description = document.getElementById("description").value;

    await fetch(
      `http://localhost:4000/addRoom?roomno=${roomno}&description=${description}&ispodium=${Ispodium}&isctable=${Isctable}&isprojector=${Isprojector}&iswhiteboard=${Iswhiteboard}`,
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
        if (data.message == "added") {
          window.location.href = "/manage-rooms";
        }
        else if (data.message == "already") {
          setSubmit(false);
          document.getElementById("room-error").innerHTML = "ROOM ALREADY EXIST";
          document.getElementById("room-error").style.color = "red";
          document.getElementById("room-error").style.display = "block";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handlePodium = (event) => {
    if (event.target.checked == false) {
      setIspodium(false);
    }
    else {
      setIspodium(true);
    }
  }

  const handleCTable = (event) => {
    if (event.target.checked == false) {
      setIsctable(false);
    }
    else {
      setIsctable(true);
    }
  }

  const handleProjector = (event) => {
    if (event.target.checked == false) {
      setIsProjector(false);
    }
    else {
      setIsProjector(true);
    }
  }

  const handleWhiteboard = (event) => {
    if (event.target.checked == false) {
      setIswhiteboard(false);
    }
    else {
      setIswhiteboard(true);
    }
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
          Add Student
        </h3>
        <center>
          <MDBCol md="7">
            <MDBCard className="my-5">
              <form
                onSubmit={handleSubmit}
              >
                <MDBCardBody className="p-5">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="First Name"
                    name="fname"
                    id="fname"
                    type="text"
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Last Name"
                    name="lname"
                    id="lname"
                    type="text"
                    required
                  />
                  <span id="room-error"></span>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Username"
                    name="username"
                    id="username"
                    type="text"
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    name="password"
                    id="password"
                    type="password"
                    required
                  />
                  <MDBBtn
                    type="submit"
                    className="w-100 mb-4"
                    size="md"
                    style={{
                      backgroundColor: "#3c4763",
                      color: "white",
                    }}
                  >
                    {submit ? <MDBSpinner style={{ color: "white" }}></MDBSpinner> : <span>Add Student</span>}
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
