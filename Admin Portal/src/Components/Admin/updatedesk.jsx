import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./navbar";
import { Card, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import {
  MDBBtn,
  MDBTextArea,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBSpinner,
} from "mdb-react-ui-kit";

export default function UpdateDesk() {
  const [id, setId] = useState("");
  const [submit, setSubmit] = useState(false);
  const [deskno, setDeskno] = useState("");
  const [Ispodium, setIspodium] = useState("");
  const [description, setDescription] = useState(false);
  const [Isctable, setIsctable] = useState(false);
  const [Isprojector, setIsProjector] = useState(false);
  const [Iswhiteboard, setIswhiteboard] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get("id");
    setId(id);
    const fetchData = async () => {
      await fetch(
      `http://localhost:4000/getSingleDesk?id=${id}`,
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
        setDeskno(
          data.data.filter((item) => item.Id == id).map((item) => item.deskno)
        );
        setDescription(
          data.data.filter((item) => item.Id == id).map((item) => item.description)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);
    await fetch(
      `http://localhost:4000/updateDesk?deskno=${deskno}&description=${description}&id=${id}`,
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

  const handleDeskno=(event)=>{
    setDeskno(event.target.value);
  }

  const handleDescription=(event)=>{
    setDescription(event.target.value);
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
          Update Desk
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
                    name="deskno"
                    id="deskno"
                    value={deskno}
                    onChange={handleDeskno}
                    type="text"
                    required
                  />
                  <span id="desk-error" style={{marginTop:"-20px",marginBottom:"5px"}}></span>
                 <MDBTextArea label='Desk Description' id='description' rows={4} value={description} onChange={handleDescription}/>
                  <br />
                  <MDBBtn
                    type="submit"
                    className="w-100 mb-4"
                    size="md"
                    style={{
                      backgroundColor: "#313a50",
                      color: "white",
                    }}
                  >
                    {submit?(<MDBSpinner style={{color:"white"}}></MDBSpinner>):<span>Update Desk</span>}
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
