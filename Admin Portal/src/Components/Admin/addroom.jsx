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
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import Alert from "react-bootstrap/Alert";

export default function Addrooms() {
  const [submit, setSubmit] = useState(false);
  const [Ispodium, setIspodium] = useState(false);
  const [Isctable, setIsctable] = useState(false);
  const [Isprojector, setIsProjector] = useState(false);
  const [Iswhiteboard, setIswhiteboard] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);
    const roomno=document.getElementById("roomno").value;
    const description=document.getElementById("description").value;

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
        if(data.message=="added"){
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
          Add Room
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
                    type="text"
                    required
                  />
                  <span id="room-error"></span>
                 <MDBTextArea label='Room Description' id='description' rows={4} />
                 <br />
                 <p style={{textAlign:"left"}}>Available Equipments</p>
                 <div class="custom-form-check">
                  <input class="form-check-input" type="checkbox" id="flexCheckChecked" onClick={handlePodium}/>
                  <label class="form-check-label label-left" for="flexCheckChecked" >Podium</label>
                </div>
                 <div class="custom-form-check">
                  <input class="form-check-input" type="checkbox" id="flexCheckChecked" onClick={handleCTable}/>
                  <label class="form-check-label label-left" for="flexCheckChecked" >Conference Table</label>
                </div>
                 <div class="custom-form-check">
                  <input class="form-check-input" type="checkbox" id="flexCheckChecked" onClick={handleWhiteboard}/>
                  <label class="form-check-label label-left" for="flexCheckChecked" >White Board</label>
                </div>
                 <div class="custom-form-check">
                  <input class="form-check-input" type="checkbox" id="flexCheckChecked" onClick={handleProjector} />
                  <label class="form-check-label label-left" for="flexCheckChecked" >Projector</label>
                </div>
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
                    {submit?<MDBSpinner style={{color:"white"}}></MDBSpinner>:<span>Add Room</span>}
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
