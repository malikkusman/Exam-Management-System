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

export default function Updaterooms() {
  const [id, setId] = useState("");
  const [submit, setSubmit] = useState(false);
  const [roomno, setRoomno] = useState("");
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
      `http://localhost:4000/getSingleRooms?id=${id}`,
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
        setRoomno(
          data.data.filter((item) => item.Id == id).map((item) => item.roomno)
        );
        setDescription(
          data.data.filter((item) => item.Id == id).map((item) => item.description)
        );
        setIspodium(
          data.data.filter((item) => item.Id == id).map((item) => item.ispodium)
        );
        setIsProjector(
          data.data.filter((item) => item.Id == id).map((item) => item.isprojector)
        );
        setIsctable(data.data.filter((item) => item.Id == id).map((item) => item.isctable));
        setIswhiteboard(data.data.filter((item) => item.Id == id).map((item) => item.iswhiteboard));
        setStatus(
          data.data.filter((item) => item.Id == id).map((item) => item.status)
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
      `http://localhost:4000/updateroom?roomno=${roomno}&description=${description}&ispodium=${Ispodium}&isctable=${Isctable}&isprojector=${Isprojector}&iswhiteboard=${Iswhiteboard}&id=${id}`,
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
          window.location.href="/manage-rooms";
        }
        else if(data.message=="already"){
          setSubmit(false);
          document.getElementById("room-error").innerHTML="ROOM ALREADY EXIST";
          document.getElementById("room-error").style.color="red";
          document.getElementById("room-error").style.display="block";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleRoomno=(event)=>{
    setRoomno(event.target.value);
  }

  const handleDescription=(event)=>{
    setDescription(event.target.value);
  }

  const handlePodium=(event)=>{
    if(event.target.checked==false){
      setIspodium(false);
    }
    else{
      setIspodium(true);
    }
  }

  const handleCTable=(event)=>{
    if(event.target.checked==false){
      setIsctable(false);
    }
    else{
      setIsctable(true);
    }
  }

  const handleProjector=(event)=>{
    if(event.target.checked==false){
      setIsProjector(false);
    }
    else{
      setIsProjector(true);
    }
  }

  const handleWhiteboard=(event)=>{
    if(event.target.checked==false){
      setIswhiteboard(false);
    }
    else{
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
          Update Room
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
                    label="Room No"
                    name="roomno"
                    id="roomno"
                    value={roomno}
                    onChange={handleRoomno}
                    type="text"
                    required
                  />
                  <span id="room-error"></span>
                 <MDBTextArea label='Room Description' id='description' rows={4} value={description} onChange={handleDescription}/>
                 <br />
                 <p style={{textAlign:"left"}}>Available Equipments</p>
                 <div class="custom-form-check">
                  <input class="form-check-input" type="checkbox" id="flexCheckChecked" checked={Ispodium  == 1 ? true : false} onClick={handlePodium}/>
                  <label class="form-check-label label-left" for="flexCheckChecked" >Podium</label>
                </div>
                 <div class="custom-form-check">
                  <input class="form-check-input" type="checkbox" id="flexCheckChecked" checked={Isctable  == 1 ? true : false} onClick={handleCTable}/>
                  <label class="form-check-label label-left" for="flexCheckChecked" >Conference Table</label>
                </div>
                 <div class="custom-form-check">
                  <input class="form-check-input" type="checkbox" id="flexCheckChecked" checked={Iswhiteboard == 1 ? true : false} onClick={handleWhiteboard}/>
                  <label class="form-check-label label-left" for="flexCheckChecked" >White Board</label>
                </div>
                 <div class="custom-form-check">
                  <input class="form-check-input" type="checkbox" id="flexCheckChecked" checked={Isprojector  == 1 ? true : false} onClick={handleProjector} />
                  <label class="form-check-label label-left" for="flexCheckChecked" >Projector</label>
                </div>
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
                    {submit?(<MDBSpinner style={{color:"white"}}></MDBSpinner>):<span>Update Room</span>}
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
