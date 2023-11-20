import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./navbar";
import {
  MDBBtn,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBSpinner,
} from "mdb-react-ui-kit";

export default function UpdateUsers() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [submit,setSubmit]=useState(false);

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get("id");
    setId(id);
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:4000/getsingleuser?id=${id}`,
          {
            method: "GET",
            headers: {
              "api-key": process.env.REACT_APP_API_KEY,
            },
          }
        );
    
        if (!response.ok) {
          throw new Error("Request failed.");
        }
        const data = await response.json();
          setFname(
            data.data.filter((item) => item.Id == id).map((item) => item.firstname)
          );
          setLname(
            data.data.filter((item) => item.Id == id).map((item) => item.lastname)
          );
          setEmail(
            data.data.filter((item) => item.Id == id).map((item) => item.email)
          );
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  const handleFname = (event) => {
    setFname(event.target.value);
  };
  const handleLname = (event) => {
    setLname(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const Updateusers = async (event) => {
    event.preventDefault();
    setSubmit(true);
    await fetch(
      `http://localhost:4000/updateUser?firstname=${fname}&lastname=${lname}&email=${email}&id=${id}`,
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
        if(data.message=="updated"){
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
          Update Users
        </h3>
        <center>
          <MDBCol md="7">
            <MDBCard className="my-5">
              <form
                id="addform"
                onSubmit={Updateusers}
              >
                <MDBCardBody className="p-5">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Firstname"
                    name="firstname"
                    id="firstname"
                    value={fname}
                    onChange={handleFname}
                    type="firstname"
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Lastname"
                    value={lname}
                    onChange={handleLname}
                    name="lastname"
                    id="lastname"
                    type="lastname"
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email"
                    id="email"
                    value={email}
                    onChange={handleEmail}
                    name="email"
                    type="email"
                    required
                  />
                  <span
                    id="email-error"
                    style={{ textAlign: "left", marginTop: "-7px" }}
                  ></span>
                  <MDBBtn
                    type="submit"
                    className="w-100 mb-4"
                    size="md"
                    style={{
                      backgroundColor: "#313a50",
                      color: "white",
                    }}
                  >
                    {submit ? <MDBSpinner style={{color:"white"}}></MDBSpinner>: <span>Update User</span>}
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
