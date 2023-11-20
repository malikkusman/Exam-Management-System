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
import Cookies from "js-cookie";

export default function Bookdesk() {
  const [submit, setSubmit] = useState(false);
  const [Id, setId] = useState("");
  const [userId,setUserId]=useState("");
  const [booking,setBooking]=useState([]);

  useEffect(()=>{
    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get("id");
    setUserId(hexToText(Cookies.get("seshId")));
    fetchBooking();
    setId(id);
  },[])

  function hexToText(hex) {
    let text = '';
    for (let i = 0; i < hex.length; i += 2) {
      text += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return text;
  }

  function isEndBeforeStart(startDateTime, endDateTime) {
    const startTime = new Date(startDateTime).getTime();
    const endTime = new Date(endDateTime).getTime();
    
    return endTime < startTime;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const from=document.getElementById("from").value;
    const to=document.getElementById("to").value;

    if(!isEndBeforeStart(from,to)){
      const color=checker(from,to);
      if(color=="white"){
        setSubmit(true);
        await fetch(
        `http://localhost:4000/bookdesk?id=${Id}&from=${from}&to=${to}&userId=${userId}`,
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
            window.location.href="/available-desks";
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
      }  
      else{
        document.getElementById("error").innerHTML="SLOT IS ALREADY BOOKED";
        document.getElementById("error").style.color="red";
        document.getElementById("error").style.display="block";
      } 
    }
    else{
        document.getElementById("error").innerHTML="START TIME MUST BE GREATER THAN END TIME";
        document.getElementById("error").style.color="red";
        document.getElementById("error").style.display="block";
    }
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
      setBooking(data.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  function checker(from,To) {
    const start = formatDate(from);
    const to = formatDate(To);
    if(booking.length==0){
      return "white";
    }
    else{
      for (let i = 0; i < booking.length; i++) {
        const bookingStart = formatDate(booking[i].fromTime);
        const bookingEnd = formatDate(booking[i].toTime);
        if (!(to <= bookingStart || start >= bookingEnd) && (booking[i].userid == parseInt(userId) && booking[i].id == Id)) {
          return "green";
        }
        if (!(to <= bookingStart || start >= bookingEnd) && (booking[i].userid != parseInt(userId) && booking[i].id == Id)) {
          return "red";
        }
        return "white";
      }
  }
  }

  return (
    <div style={{ width: "100%", display: "flex" }}>
      <div style={{ width: "17%" }}>
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
          Book Desk
        </h3>
        <center>
          <MDBCol md="7">
            <MDBCard className="my-5">
              <form
                onSubmit={handleSubmit}
              >
                <MDBCardBody className="p-5">
                <label htmlFor="from" className="pr-2" style={{textAlign:"left"}}>From</label>
                <MDBInput
                    wrapperClass="mb-4"
                    name="date"
                    id="from"
                    type="datetime-local"
                    required
                />
                <label htmlFor="to" className="pr-2" style={{textAlign:"left"}}>To</label>
                <MDBInput
                    wrapperClass="mb-4"
                    name="date"
                    id="to"
                    type="datetime-local"
                    required
                />
                <span id="error"></span>
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
                    {submit?<MDBSpinner style={{color:"white"}}></MDBSpinner>:<span>Confirm Booking</span>}
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
