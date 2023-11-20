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

export default function CreateAssignment() {
  const [desks, setDesks] = useState([]);
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
    `http://localhost:4000/getDesks`,
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
      setDesks(data.data);
      setBack(data.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  const fetchBooking = async () => {
    await fetch(
    `http://localhost:4000/getDeskbooking`,
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

  function color(userId, deskid) {
    const start = formatDate(document.getElementById("from").value);
    const to = formatDate(document.getElementById("to").value);
    if(booking.length==0){
      return "white";
    }
    else{
    for (let i = 0; i < booking.length; i++) {
      const bookingStart = formatDate(booking[i].fromTime);
      const bookingEnd = formatDate(booking[i].toTime);
      if (!(to <= bookingStart || start >= bookingEnd) && (booking[i].userid == parseInt(userId) && booking[i].deskid == deskid)) {
        return "green";
      }
      if (!(to <= bookingStart || start >= bookingEnd) && (booking[i].userid != parseInt(userId) && booking[i].deskid == deskid)) {
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
            Create Assignment
          </h3>
          <a href="/add-assignment">
            <Button
              style={{
                border: "none",
                color: "white",
                fontWeight: "bold",
                marginTop: "10px",
                marginRight: "10px",
              }}
            >
              Add Assignment
            </Button>
          </a>
        </div>

        <div className="d-flex justify-content-center align-items-center">
         <div>
            <p className="text-center">Check created Assignments</p>
            <div className="d-lg-flex justify-content-center align-items-center">
              <div className="mb-4 mb-lg-0 mr-lg-2">
                <MDBInput
                  name="date"
                  id="from"
                  type="input"
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
            desks.map((desk, index) => (
              <MDBCol>
                <MDBCard className="h-100" style={{backgroundColor:check ? color(userId,desk.Id):"white"}}>
                  <MDBCardBody style={{ textAlign: "center" }}>
                    <MDBCardTitle>Desk No: {desk.deskno}</MDBCardTitle>
                    <MDBCardText>
                      <span>
                        <b>Status: </b>
                        {console.log(color(userId,desk.Id))}
                        {console.log(color(userId,desk.Id))}
                        {color(userId,desk.Id)=="white"?"Available":"Occupied"}
                      </span>
                      <br />
                      <b>
                        <a href={`/desk-details-user?id=${desk.Id}`}>More Details</a>
                      </b>
                      <br />
                      {color(userId,desk.Id)=="white"?(
                          <Link to={`/book-desk?id=${desk.Id}`}>
                          <Button
                          size="sm"
                          variant="primary"
                          style={{ marginRight: "2px", marginTop: "2px" }}
                          >
                              Book desk
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
            desks.map((desk, index) => (
              <MDBCol>
                <MDBCard className="h-100">
                  <MDBCardBody style={{ textAlign: "center" }}>
                    <MDBCardTitle>Desk No: {desk.deskno}</MDBCardTitle>
                    <MDBCardText>
                      <span>
                        <b>Status: </b>
                        Check Availability
                      </span>
                      <br />
                      <b>
                        <a href={`/desk-details-user?id=${desk.Id}`}>More Details</a>
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
