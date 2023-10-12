import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import axios from 'axios'
import Header from "./navbar";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from "react-bootstrap";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBCard,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCardBody,
  MDBSpinner
} from 'mdb-react-ui-kit';
import Cookies from "js-cookie";

export default function AssignMarks() {
  const [booking, setBookings] = useState([]);
  const [userId, setUserId] = useState("");
  const [submit, setSubmit] = useState(false);
  const [basicModal, setBasicModal] = useState(false);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [bookid, setBookId] = useState("");
  const [type, setType] = useState("");
  const [Id, setId] = useState("");
  const [all, setAll] = useState([]);
  const [udata, setudata] = useState([])
  const [showModal, setShowModal] = useState(false);

  const [data, setdata] = useState([])
  useEffect(() => {
    fetchData()
  }, [showModal]);



  const fetchData = async () => {
    const username = localStorage.getItem("teacher")
    try {
      const response = await axios.get(`http://localhost:4000/stuassignment/getbyteacher?username=${username}`);
      if (response.status !== 200) {
        throw new Error("Request failed.");
      }
      setdata(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const toggleShow = (booking) => {
    setBasicModal(true);
    setFrom(new Date(booking.fromTime).toISOString().slice(0, 16));
    setTo(new Date(booking.toTime).toISOString().slice(0, 16));
    console.log(booking.roomno, booking.deskno)
    if (booking.roomno == undefined) {
      setType("Desk");
      setId(booking.deskid);
    }
    else if (booking.deskno == undefined) {
      setType("Room");
      setId(booking.roomid);
    }
    setBookId(booking.bookingid);
  }


  function hexToText(hex) {
    let text = '';
    try {
      for (let i = 0; i < hex.length; i += 2) {
        text += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      }
    }
    catch {
      text = "";
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
        const current = new Date();
        setBookings(data.data.filter(item => new Date(item.fromTime) > current));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const CancelBooking = async (id, type) => {
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
        if (data.message == "deleted") {
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

  function checker(from, To) {
    const start = formatDate(from);
    const to = formatDate(To);
    if (all.length == 0) {
      return "white";
    }
    else {
      for (let i = 0; i < all.length; i++) {
        const bookingStart = formatDate(all[i].fromTime);
        const bookingEnd = formatDate(all[i].toTime);
        if (type == "Desk") {
          if (!(to <= bookingStart || start >= bookingEnd) && (all[i].userid == parseInt(userId) && all[i].deskid == Id) && all[0].id != bookid) {
            return "green";
          }
          if (!(to <= bookingStart || start >= bookingEnd) && (all[i].userid != parseInt(userId) && all[i].deskid == Id) && all[0].id != bookid) {
            return "red";
          }
        }
        else if (type == "Room") {
          if (!(to <= bookingStart || start >= bookingEnd) && (all[i].userid == parseInt(userId) && all[i].roomid == Id) && all[0].id != bookid) {
            return "green";
          }
          if (!(to <= bookingStart || start >= bookingEnd) && (all[i].userid != parseInt(userId) && all[i].roomid == Id) && all[0].id != bookid) {
            return "red";
          }
        }
      }
      return "white";
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    if (!isEndBeforeStart(from, to)) {
      const color = checker(from, to);
      if (color == "white") {
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
            if (data.message == "updated") {
              if (data.back == "room") {
                window.location.href = "/available-room";
              }
              else if (data.back == "desk") {
                window.location.href = "/available-desks";
              }
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
      else {
        document.getElementById("error").innerHTML = "SLOT IS ALREADY BOOKED";
        document.getElementById("error").style.color = "red";
        document.getElementById("error").style.display = "block";
      }
    }
    else {
      document.getElementById("error").innerHTML = "START TIME MUST BE GREATER THAN END TIME";
      document.getElementById("error").style.color = "red";
      document.getElementById("error").style.display = "block";
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

  const handleFrom = (event) => {
    console.log(event.target.value);
    setFrom(convertAndSetDate(event.target.value));
  }

  const handleTo = (event) => {
    setTo(convertAndSetDate(event.target.value));
  }

  const updateHandle = (cour) => {
    setudata(cour)
  }

  const generatePDF = (dataArray) => {
    const doc = new jsPDF();

    const tableHeaders = ['Question', 'Total Number', 'Obtain Number', 'Answer'];
    const tableData = [];

    dataArray.forEach((item) => {
      const { question, totalnumber, obtainnumber, answer } = item;
      tableData.push([question, totalnumber.toString(), obtainnumber.toString(), answer]);
    });

    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
    });

    doc.save('exam.pdf');
  };

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
        </div>
        <Modal data={udata} showModal={showModal} setShowModal={setShowModal} />
        <MDBRow
          className="row-cols-1 row-cols-md-4 g-4"
          style={{
            margin: "20px",
            justifyContent: "center",
            marginLeft: "30px",
          }}
        >
          <div style={{ overflowX: "auto", width: "100%" }}>
            <MDBTable hover style={{ margin: "10px" }}>
              <MDBTableHead>
                <tr>
                  <th scope='col'>Sr</th>
                  <th scope='col'>Assignment Name</th>
                  <th scope='col'>Work</th>
                  <th scope='col'>Total Marks</th>
                  <th scope='col'>Student Name</th>
                  <th scope='col'>Obtain marks</th>
                  <th scope='col'>Add marks</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {data && data.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index}</td>
                    <td>{user.Name}</td>
                    <td>
                      {user.File ? (
                        <a href={`http://localhost:4000/images/${user.File}`} target="_blank" rel="noopener noreferrer">
                          File
                        </a>
                      ) : (<label onClick={() => generatePDF(user.Questions)} className="text-blue-400 cursor-pointer">File</label>)}
                    </td>
                    <td>{user.Marks}</td>
                    <td>{user.StudentName}</td>
                    <td>{user.ObtainMarks}</td>
                    <td><Button onClick={() => {
                      updateHandle(user);
                      setShowModal(true);
                    }}
                      style={{
                        backgroundColor: "#3c4763",
                        border: "none",
                        color: "white",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Add
                    </Button></td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>
        </MDBRow>
      </div>
    </div>
  );
}


const Modal = ({ data, showModal, setShowModal }) => {

  const [submit, setSubmit] = useState(false);
  const [marks, setMarks] = useState(data.ObtainMarks); // Assuming `data.Description` holds initial value

  useEffect(() => {
    setMarks(data.ObtainMarks)
  }, [showModal])

  const handleMarksChange = (e) => {
    setMarks(e.target.value);
  };

  const handleSubmit = async (event) => {
    setShowModal(false)
    event.preventDefault();
    setSubmit(true);
    const data1 = {
      ObtainMarks: marks,
    }
    try {
      const response = await axios.put(`http://localhost:4000/stuassignment/update?id=${data._id}`, data1);
      if (response.status == 200) {
        setSubmit(false)
        window.location.href = "/assign-marks";
      } else if (response.data.message === "already") {
        setSubmit(false);
        document.getElementById("desk-error").innerHTML = "Course ALREADY EXIST";
        document.getElementById("desk-error").style.color = "red";
        document.getElementById("desk-error").style.display = "block";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // You can customize the modal content here
  //   
  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black z-10 bg-opacity-50 flex justify-center items-center ${showModal ? '' : 'hidden'}`}>
      <div>
        <center>
          <MDBCol md="7" className="w-100">
            <MDBCard className="my-5">
              <form
                onSubmit={handleSubmit}
              >
                <MDBCardBody className="p-5">
                  <MDBInput
                    value={marks}
                    onChange={handleMarksChange}
                    wrapperClass="mb-4"
                    label="Obtain marks"
                    name="course"
                    id="course"
                    type="text"
                    required
                  />
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
                    {submit ? <MDBSpinner style={{ color: "white" }}></MDBSpinner> : <span>Add Marks</span>}
                  </MDBBtn>
                </MDBCardBody>
              </form>
            </MDBCard>
          </MDBCol>
        </center>
      </div>
    </div >
  );
};