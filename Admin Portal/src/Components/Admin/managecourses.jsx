import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Sidebar from "./sidebar";
import Header from "./navbar";
import axios from 'axios';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBTextArea,
  MDBSpinner,
} from "mdb-react-ui-kit";

export default function ManageCourses() {
  const [course, setcourse] = useState([]);
  const [back, setBack] = useState([]);
  const [udata, setudata] = useState([])
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    fetchData();
  }, [showModal]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/course/delete?id=${id}`);
      window.location.href = "/manage-courses";
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const updateHandle = (cour) => {
    setudata(cour)
  }

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/course/get');

      if (response.status !== 200) {
        throw new Error("Request failed.");
      }
      setcourse(response.data);
      setBack(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function backQuery() {
    var query = document.getElementById("search").value;
    if (query == "") {
      setcourse(back);
    }
  }


  const searchQuery = () => {
    var query = document.getElementById("search").value;
    setcourse(
      course.filter((course) =>
        course.course.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  function backQuery() {
    var query = document.getElementById("search").value;
    if (query == "") {
      setcourse(back);
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
            Manage Courses
          </h3>
          <a href="/add-course">
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
              Add Courses
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
                placeholder="By Desk No e.g 01"
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
          className="row-cols-1 z-[-1] row-cols-md-4 g-4"
          style={{
            margin: "20px",
            justifyContent: "center",
            marginLeft: "30px",
          }}
        >
          {Array.isArray(course) && course.map((course, index) => (
            <MDBCol>
              <MDBCard className="h-100">
                <MDBCardBody style={{ textAlign: "center" }}>
                  <MDBCardTitle>{course.Course}</MDBCardTitle>
                  <MDBCardText>
                    <br />
                    <b>
                      <p>Instructor: {course.INSTname}</p>
                      <p>{course.Description}</p>
                      <div style={{ display: 'flex', gap: '5px', textAlign: "center", justifyContent: "center" }}>
                        <Button onClick={() => {
                          updateHandle(course);
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
                        </Button>
                        <Button onClick={() => handleDelete(course._id)}
                          style={{
                            backgroundColor: "#3c4763",
                            border: "none",
                            color: "white",
                            fontWeight: "bold",
                            marginTop: "10px",
                          }}
                        >
                          Delete
                        </Button>
                      </div>

                    </b>
                    <br />
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </div>
    </div>
  );
}

const Modal = ({ data, showModal, setShowModal }) => {

  const [submit, setSubmit] = useState(false);
  const [course, setCourse] = useState(data.Course); // Assuming `data.Course` holds initial value
  const [instructor, setInstructor] = useState(data.INSTname); // Assuming `data.INSTname` holds initial value
  const [description, setDescription] = useState(data.Description); // Assuming `data.Description` holds initial value

  useEffect(() => {
    console.log("hello")
    setCourse(data.Course)
    setDescription(data.Description)
    setInstructor(data.INSTname)
  },[showModal])

  const handleCourseChange = (e) => {
    setCourse(e.target.value);
  };

  const handleInstructorChange = (e) => {
    setInstructor(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (event) => {
    setShowModal(false)
    event.preventDefault();
    setSubmit(true);
    const data1 = {
      Course: course,
      INSTname: instructor,
      Description: description
    }
    try {
      const response = await axios.put(`http://localhost:4000/course/update?id=${data._id}`, data1);
      console.log(response.data)
      if (response.data.message === "updated") {
        window.location.href = "/manage-courses";
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
                    value={course}
                    onChange={handleCourseChange}
                    wrapperClass="mb-4"
                    label="Course Name"
                    name="course"
                    id="course"
                    type="text"
                    required
                  />
                  <select
                    className="form-select mb-4"
                    id="instructor"
                    name="instructor"
                    required
                    value={instructor}
                    onChange={handleInstructorChange}
                  >
                    <option value="">Select</option>
                    <option value="instructor1">Instructor 1</option>
                    <option value="instructor2">Instructor 2</option>
                    {/* Add more options as needed */}
                  </select>
                  <MDBTextArea
                    value={description}
                    label='Desk Description'
                    id='description'
                    rows={4}
                    onChange={handleDescriptionChange}
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
                  {submit ? <MDBSpinner style={{ color: "white" }}></MDBSpinner> : <span>Update Course</span>}
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