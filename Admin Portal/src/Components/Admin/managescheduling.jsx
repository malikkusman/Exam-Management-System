import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./navbar";
import axios from "axios";
import { Card, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import {
  MDBCard,
  MDBCardImage,
  MDBBtn,
  MDBInput,
  MDBSpinner,
  MDBCardBody,
  MDBTable, MDBTableBody, MDBTableHead,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

export default function ManageScheduling() {
  const [schedule, setSchedule] = useState([]);
  const [back, setBack] = useState([]);
  const [udata, setudata] = useState([])
  const [showModal, setShowModal] = useState(false);
  const updateHandle = (cour) => {
    setudata(cour)
  }
  useEffect(() => {
    fetchData()
  }, [showModal]);

  const searchQuery = () => {
    var query = document.getElementById("search").value;
    setSchedule(
      schedule.filter((schedule) =>
        (schedule.INSTname + " " + schedule.Course).toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/schedule/delete?id=${id}`);
      window.location.href = "/manage-scheduling";
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function backQuery() {
    var query = document.getElementById("search").value;
    if (query == "") {
      setSchedule(back);
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/schedule/get`);

      if (response.status !== 200) {
        throw new Error("Request failed.");
      }
      setSchedule(response.data);
      setBack(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleActive = async (id, event) => {
    console.log(event.target.name)
    let active = true
    if (event.target.name == 'inactive') {
      active = true
    }
    else {
      active = false
    }
    const data1 = {
      active: active
    }
    try {
      const response = await axios.put(`http://localhost:4000/schedule/update?id=${id}`, data1);
      console.log(response.data)
      if (response.status === 200) {
        window.location.href = "/manage-scheduling";
      } else if (response.data.message === "already") {
        document.getElementById("desk-error").innerHTML = "Course ALREADY EXIST";
        document.getElementById("desk-error").style.color = "red";
        document.getElementById("desk-error").style.display = "block";
      }
    } catch (error) {
      console.error("Error:", error);
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
            Manage Schedule
          </h3>
          <a href="/add-schedule">
            <Button
              style={{
                backgroundColor: "#3c4763",
                border: "none",
                color: "white",
                fontWeight: "bold",
                marginTop: "10px",
                marginRight: "10px",
              }}
            >
              Add Schedule
            </Button>
          </a>
        </div>
        <center>
          <div
            className="search-bar"
            style={{ width: "270px", marginLeft: "15px" }}
          >
            <label htmlFor="search">
              <span className="visually-hidden">Search</span>
            </label>
            <div className="input-group">
              <input
                type="text"
                id="search"
                className="form-control"
                placeholder="Search by Name"
                onChange={backQuery}
              />
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: "#3c4763",
                  color: "white",
                }}
                onClick={searchQuery}
              >
                Search
              </button>
            </div>
          </div>
        </center>
        <Modal data={udata} showModal={showModal} setShowModal={setShowModal} />
        <MDBRow
          className="row-cols-1 row-cols-md-4 g-4"
          style={{
            margin: "20px",
            justifyContent: "center",
            marginLeft: "30px",
          }}
        >
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th>Course</th>
                <th>Instructor</th>
                <th>Day</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {schedule && schedule.map((us, index) => (
                <tr key={us._id}>
                  <td>{us.Course}</td>
                  <td>{us.INSTname}</td>
                  <td>{us.Day}</td>
                  <td>{us.From}</td>
                  <td>{us.To}</td>
                  <td><Button name={us.active ? 'active' : 'inactive'} onClick={(event) => handleActive(us._id, event)}
                    style={{
                      backgroundColor: "#3c4763",
                      border: "none",
                      color: "white",
                      fontWeight: "bold",
                      marginTop: "10px",
                    }}
                  >
                    {us.active ? 'active' : 'inactive'}
                  </Button></td>
                  <td><Button onClick={() => {
                    updateHandle(us);
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
                    Update
                  </Button></td>
                  <td><Button onClick={() => handleDelete(us._id)}
                    style={{
                      backgroundColor: "#3c4763",
                      border: "none",
                      color: "white",
                      fontWeight: "bold",
                      marginTop: "10px",
                    }}
                  >
                    Delete
                  </Button></td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </MDBRow>
      </div>
    </div>
  );
}


const Modal = ({ data, showModal, setShowModal }) => {

  const [submit, setSubmit] = useState(false);
  const [fname, setfname] = useState(data.Course); // Assuming `data.Course` holds initial value
  const [lname, setlname] = useState(data.INSTname); // Assuming `data.INSTname` holds initial value
  const [email, setemail] = useState(data.Day); // Assuming `data.Description` holds initial value
  const [username, setusername] = useState(""); // Assuming `data.Course` holds initial value
  const [password, setpassword] = useState(""); // Assuming `data.INSTname` holds initial value
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const convertStringToTime = (timeString) => {
    if (!timeString || typeof timeString !== 'string') {
      return ''; // Handle the case where timeString is undefined or not a string
    }

    const [hours = '00', minutes = '00'] = timeString.split(':');
    const formattedTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    return formattedTime;
  };

  useEffect(() => {
    setfname(data.Course)
    setlname(data.INSTname)
    setemail(data.Day)
    setusername(convertStringToTime(data.From))
    setpassword(convertStringToTime(data.To))
  }, [showModal])

  const handlefChange = (e) => {
    setfname(e.target.value);
  };

  const handlelChange = (e) => {
    setlname(e.target.value);
  };

  const handleeChange = (e) => {
    setemail(e.target.value);
  };

  const handleuChange = (e) => {
    setusername(e.target.value);
  };

  const handlepChange = (e) => {
    setpassword(e.target.value);
  };
  useEffect(() => {
    teachers()
    courses()
  }, [])

  const [teacher, setTeachers] = useState([])
  const [course, setCourses] = useState([])
  const teachers = async () => {
    const role = "teacher"
    try {
      const response = await axios.get(`http://localhost:4000/user/getall?role=${role}`);

      if (response.status !== 200) {
        throw new Error("Request failed.");
      }
      setTeachers(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const courses = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/course/get`);

      if (response.status !== 200) {
        throw new Error("Request failed.");
      }
      setCourses(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }


  const handleSubmit = async (event) => {
    setShowModal(false)
    event.preventDefault();
    setSubmit(true);
    const data1 = {
      Course: fname,
      INSTname: lname,
      Day: email,
      From: username,
      To: password,
    }
    try {
      const response = await axios.put(`http://localhost:4000/schedule/update?id=${data._id}`, data1);
      console.log(response.data)
      if (response.status === 200) {
        window.location.href = "/manage-scheduling";
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
                  <select
                    className="form-select mb-4"
                    id="fname"
                    name="fname"
                    required
                    value={fname}
                    onChange={handlefChange}
                  >
                    <option value="">Select Course</option>
                    {course && course.map((instructor, index) => (
                      <option key={instructor._id} value={instructor.Course}>
                        {instructor.Course}
                      </option>
                    ))}
                    {/* Add more options as needed */}
                  </select>
                  <select
                    className="form-select mb-4"
                    id="instructor"
                    name="instructor"
                    required
                    value={lname}
                    onChange={handlelChange}
                  >
                    <option value="">Select Instructor</option>
                    {teacher && teacher.map((instructor, index) => (
                      <option key={instructor._id} value={instructor.Username}>
                        {instructor.Username}
                      </option>
                    ))}
                    {/* Add more options as needed */}
                  </select>
                  <select
                    className="form-select mb-4"
                    id="instructor"
                    name="instructor"
                    required
                    value={email}
                    onChange={handleeChange}
                  >
                    <option value="">Select Day</option>
                    {daysOfWeek && daysOfWeek.map((instructor, index) => (
                      <option key={index} value={instructor}>
                        {instructor}
                      </option>
                    ))}
                    {/* Add more options as needed */}
                  </select>
                  <MDBInput
                    value={username}
                    onChange={handleuChange}
                    wrapperClass="mb-4"
                    label="From"
                    name="course"
                    id="course"
                    type="time"
                    required
                  />
                  <MDBInput
                    value={password}
                    onChange={handlepChange}
                    wrapperClass="mb-4"
                    label="To"
                    name="course"
                    id="course"
                    type="time"
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
                    {submit ? <MDBSpinner style={{ color: "white" }}></MDBSpinner> : <span>Update Teacher</span>}
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