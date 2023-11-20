import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./navbar";
import { Button } from "react-bootstrap";
import {Link} from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBInput
} from "mdb-react-ui-kit";
import Cookies from "js-cookie";

export default function Attendance() {
  const [rooms, setRooms] = useState([]);
  const [booking, setBookings] = useState([]);
  const [back, setBack] = useState([]);
  const [userId,setUserId]=useState("");
  const [check,setCheck]=useState(false);

  useEffect(() => {
    document.body.style.backgroundColor="white";
    setUserId(hexToText(Cookies.get("seshId")));
    fetchData();
    fetchBooking();
  }, []);

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

  const fetchData = async () => {
    await fetch(
    `http://localhost:4000/getRooms`,
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
      setRooms(data.data);
      setBack(data.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  const fetchBooking = async () => {
    await fetch(
    `http://localhost:4000/getbooking`,
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
        setBookings(data.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }


  function color(userId, roomid) {
    const start = formatDate(document.getElementById("from").value);
    const to = formatDate(document.getElementById("to").value);
    if(booking.length==0){
      return "white";
    }
    else{
    for (let i = 0; i < booking.length; i++) {
      const bookingStart = formatDate(booking[i].fromTime);
      const bookingEnd = formatDate(booking[i].toTime);
      if (!(to <= bookingStart || start >= bookingEnd) && (booking[i].userid == parseInt(userId) && booking[i].roomid == roomid)) {
        return "green";
      }
      if (!(to <= bookingStart || start >= bookingEnd) && (booking[i].userid != parseInt(userId) && booking[i].roomid == roomid)) {
        return "red";
      }
    }
    return "white";
   }
  }
  


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
            Attendance
          </h3>
        </div>
        <div style={{display:"flex",marginLeft:"30px"}}>
            <div style={{width:"10px",height:"10px",border:"1px solid black",marginTop:"8px",marginRight:"3px"}}></div> <span style={{marginRight:"10px"}}>Present</span>
            <div style={{backgroundColor:"red",width:"10px",height:"10px",marginTop:"8px",marginRight:"3px"}}></div> <span style={{marginRight:"10px"}}>Absent</span>
            <div style={{backgroundColor:"green",width:"10px",height:"10px",marginTop:"8px",marginRight:"3px"}}></div><span style={{marginRight:"10px"}}>Leave</span>
        </div>
        <div className="d-flex justify-content-center align-items-center">
         <div>
            <p className="text-center">Check Student Attendnace</p>
            <div className="d-lg-flex justify-content-center align-items-center">
              <div className="mb-4 mb-lg-0 mr-lg-2">
                <MDBInput
                  name="date"
                  id="from"
                  type="datetime-local"
                  onChange={()=>{setCheck(false)}}
                  required
                />
              </div>
              <div className="mb-4 mb-lg-0">
                <MDBInput
                  name="date"
                  id="to"
                  type="datetime-local"
                  onChange={()=>{setCheck(false)}}
                  required
                />
              </div>
              <div className="mb-4 mb-lg-0">
                <Button
                  size="sm"
                  variant="primary"
                  style={{ height: "35px" }}
                  onClick={()=>{
                    if(document.getElementById("from").value=="" || document.getElementById("to").value==""){
                      alert("Select start and end date");
                    }
                    else{
                      setCheck(true);
                    }
                  }}
                >
                  Check
                </Button>
              </div>
            </div>
          </div>
        </div>


        <MDBRow
          className="row-cols-1 row-cols-md-4 g-4"
          style={{
            margin: "20px",
            justifyContent: "center",
            marginLeft: "30px",
          }}
        >
          {check?(
            rooms.map((room, index) => (
              <MDBCol>
                <MDBCard className="h-100" style={{backgroundColor:check ? color(userId,room.Id):"white"}}>
                  <MDBCardBody style={{ textAlign: "center" }}>
                    <MDBCardTitle>Room No: {room.roomno}</MDBCardTitle>
                    <MDBCardText>
                      <span>
                        <b>Status: </b>
                        {color(userId,room.Id)=="white"?"Available":"Occupied"}
                      </span>
                      <br />
                      <b>
                        <a href={`/room-details-user?id=${room.Id}`}>More Details</a>
                      </b>
                      <br />
                      {color(userId,room.Id)=="white"?(
                          <Link to={`/book-room?id=${room.Id}`}>
                          <Button
                          size="sm"
                          variant="primary"
                          style={{ marginRight: "2px", marginTop: "2px" }}
                          >
                              Book Room
                          </Button>
                          </Link>
                       ):(
                          null
                      )} 
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))
          ):(
            rooms.map((room, index) => (
              <MDBCol>
                <MDBCard className="h-100">
                  <MDBCardBody style={{ textAlign: "center" }}>
                    <MDBCardTitle>Room No: {room.roomno}</MDBCardTitle>
                    <MDBCardText>
                      <span>
                        <b>Status: </b>
                        Check Availability
                      </span>
                      <br />
                      <b>
                        <a href={`/room-details-user?id=${room.Id}`}>More Details</a>
                      </b>
                      <br />
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))
          )}
        </MDBRow>
      </div>
    </div>
  );
}
