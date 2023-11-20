import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./navbar";
import {
  MDBBtn,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBSpinner,
} from "mdb-react-ui-kit";

export default function Adddesks() {
  const [submit, setSubmit] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);
    const roomno=document.getElementById("deskno").value;
    const description=document.getElementById("description").value;

    await fetch(
      `http://localhost:4000/addDesk?deskno=${roomno}&description=${description}`,
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
          window.location.href="/manage-desks";
        }
        else if(data.message=="already"){
          setSubmit(false);
          document.getElementById("desk-error").innerHTML="DESK ALREADY EXIST";
          document.getElementById("desk-error").style.color="red";
          document.getElementById("desk-error").style.display="block";
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
          Add Desk
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
                    label="Desk No"
                    name="desk"
                    id="deskno"
                    type="text"
                    required
                  />
                 <MDBTextArea label='Desk Description' id='description' rows={4} />
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
                    {submit?<MDBSpinner style={{color:"white"}}></MDBSpinner>:<span>Add Desk</span>}
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
