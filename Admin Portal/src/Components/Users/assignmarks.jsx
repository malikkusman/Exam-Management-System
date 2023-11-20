import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./navbar";
import { Button } from "react-bootstrap";     
import {
  MDBTable, 
  MDBTableHead, 
  MDBTableBody,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBInput,
  MDBCardBody,
  MDBSpinner
} from 'mdb-react-ui-kit';
import Cookies from "js-cookie";

export default function AssignMarks() {
  const [booking, setBookings] = useState([]);
  const [userId,setUserId]=useState("");
  const [submit,setSubmit]=useState(false);
  const [basicModal, setBasicModal] = useState(false);
  const [from,setFrom]=useState();
  const [to,setTo]=useState();
  const [bookid,setBookId]=useState("");
  const [type,setType]=useState("");
  const [Id,setId]=useState("");
  const [all,setAll]=useState([]);


  const toggleShow=(booking)=>{
    setBasicModal(true);
    setFrom(new Date(booking.fromTime).toISOString().slice(0, 16));
    setTo(new Date(booking.toTime).toISOString().slice(0, 16));
    console.log(booking.roomno,booking.deskno)
    if(booking.roomno==undefined){
      setType("Desk");
      setId(booking.deskid);
    }
    else if(booking.deskno==undefined){
      setType("Room");
      setId(booking.roomid);
    }
    setBookId(booking.bookingid);
  }

  useEffect(() => {
    document.body.style.backgroundColor="white";
    setUserId(hexToText(Cookies.get("seshId")));
    fetchBooking(hexToText(Cookies.get("seshId")));
    fetchRoomBooking();
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

  const fetchBooking = async (id) => {
    await fetch(
    `http://localhost:4000/getMyBookings?id=${id}`,
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
        const current=new Date();
        setBookings(data.data.filter(item=>new Date(item.fromTime)>current));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  const CancelBooking = async (id,type) => {
    await fetch(
    `http://localhost:4000/cancelbooking?id=${id}&type=${type}`,
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
        if(data.message=="deleted"){
          fetchBooking(userId);
        }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  const fetchRoomBooking = async () => {
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
      setAll(data.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  function isEndBeforeStart(startDateTime, endDateTime) {
    const startTime = new Date(startDateTime).getTime();
    const endTime = new Date(endDateTime).getTime();
    
    return endTime < startTime;
  }

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  function checker(from,To) {
    const start = formatDate(from);
    const to = formatDate(To);
    if(all.length==0){
      return "white";
    }
    else{
      for (let i = 0; i < all.length; i++) {
        const bookingStart = formatDate(all[i].fromTime);
        const bookingEnd = formatDate(all[i].toTime);
        if(type=="Desk"){
          if (!(to <= bookingStart || start >= bookingEnd) && (all[i].userid == parseInt(userId) && all[i].deskid == Id) && all[0].id!=bookid) {
            return "green";
          }
          if (!(to <= bookingStart || start >= bookingEnd) && (all[i].userid != parseInt(userId) && all[i].deskid == Id) && all[0].id!=bookid) {
            return "red";
          }
        }
        else if(type=="Room"){
          if (!(to <= bookingStart || start >= bookingEnd) && (all[i].userid == parseInt(userId) && all[i].roomid == Id) && all[0].id!=bookid) {
            return "green";
          }
          if (!(to <= bookingStart || start >= bookingEnd) && (all[i].userid != parseInt(userId) && all[i].roomid == Id) && all[0].id!=bookid) {
            return "red";
          }
        }
      }
      return "white";
  }
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
        `http://localhost:4000/updatebooking?id=${bookid}&from=${from}&to=${to}&userId=${userId}&type=${type}`,
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
              if(data.back=="room"){
                window.location.href="/available-room";
              }
              else if(data.back=="desk"){
                window.location.href="/available-desks";
              }
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

  function convertAndSetDate(inputValue) {
    const inputDate = new Date(inputValue);
    inputDate.setMinutes(inputDate.getMinutes() - inputDate.getTimezoneOffset());
  
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    const hours = String(inputDate.getHours()).padStart(2, '0');
    const minutes = String(inputDate.getMinutes()).padStart(2, '0');
  
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    return formattedDate
  }

  const handleFrom=(event)=>{
    console.log(event.target.value);
    setFrom(convertAndSetDate(event.target.value));
  }

  const handleTo=(event)=>{
    setTo(convertAndSetDate(event.target.value));
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
            Assign Marks
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
              Add Assignment Marks
            </Button>
          </a>
        </div>

        <MDBRow
          className="row-cols-1 row-cols-md-4 g-4"
          style={{
            margin: "20px",
            justifyContent: "center",
            marginLeft: "30px",
          }}
        >
          <div style={{overflowX:"auto",width:"100%"}}>
            <MDBTable hover style={{margin:"10px"}}>
                <MDBTableHead>
                    <tr>
                    <th scope='col'>Sr</th>
                    <th scope='col'>Assignment Name</th>
                    <th scope='col'>Total Marks</th>
                    <th scope='col'>From</th>
                    <th scope='col'>To</th>
                    <th scope='col'>Student Name</th>
                    <th scope='col'>Obtain marks</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                {booking.map((book,index)=>(
                    <tr>
                        <th scope='row'>{index+1}</th>
                        <td>{book.roomno!=undefined ? "Room" : "Desk" }</td>
                        <td>{book.roomno!=undefined ? book.roomno : book.deskno }</td>
                        <td>{new Date(book.fromTime).toLocaleString()}</td>
                        <td>{new Date(book.toTime).toLocaleString()}</td>
                        <td><i className="fa fa-edit" style={{color:"green"}} onClick={()=>{toggleShow(book)}}></i></td>
                        <td><i className="fa fa-trash" style={{color:"red"}} onClick={()=>{
                          if(window.confirm("Are you sure you want to Cancel Booking")){
                            CancelBooking(book.bookingid, book.roomno!=undefined ? "room" : "desk");
                          }
                        }}></i></td>
                    </tr>
                ))}       
                </MDBTableBody>
                </MDBTable>
                </div>
          </MDBRow>
      </div>

      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Booking</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={()=>{setBasicModal(false)}}></MDBBtn>
            </MDBModalHeader>
            <form
                onSubmit={handleSubmit}
              >
            <MDBModalBody>
                <MDBCardBody className="p-5">
                <label htmlFor="from" className="pr-2" style={{textAlign:"left"}}>From</label>
                <MDBInput
                    wrapperClass="mb-4"
                    name="date"
                    id="from"
                    type="datetime-local"
                    value={from}
                    onChange={handleFrom}
                    required
                />
                <label htmlFor="to" className="pr-2" style={{textAlign:"left"}}>To</label>
                <MDBInput
                    wrapperClass="mb-4"
                    name="date"
                    id="to"
                    value={to}
                    onChange={handleTo}
                    type="datetime-local"
                    required
                />
                <span id="error"></span>
                </MDBCardBody>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn>{submit?<MDBSpinner style={{color:"white"}}></MDBSpinner>:<span>Update</span>}</MDBBtn>
            </MDBModalFooter>
              </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}
