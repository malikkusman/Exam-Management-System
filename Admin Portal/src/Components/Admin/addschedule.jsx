import React, { useEffect, useState } from "react";
import axios from 'axios';
import Sidebar from "./sidebar";
import Header from "./navbar";
import {
  MDBBtn,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBSpinner,
} from "mdb-react-ui-kit";

export default function Addschedule() {
  const [submit, setSubmit] = useState(false);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);
    const course = document.getElementById("course").value;
    const instname = document.getElementById("instructor").value;
    const day = document.getElementById("day").value;
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;

    try {
      const response = await axios.post('http://localhost:4000/schedule/add', {
        course,
        instname,
        day,
        from,
        to,
      });
      console.log(response.data.message)
      if (response.data.message === "added") {
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
          Add Schedule
        </h3>
        <center>
          <MDBCol md="7">
            <MDBCard className="my-5">
              <form
                onSubmit={handleSubmit}
              >
                <MDBCardBody className="p-5">
                  <select
                    className="form-select mb-4"
                    id="instructor"
                    name="instructor"
                    required
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
                    id="course"
                    name="course"
                    required
                  >
                    <option value="">Select Course</option>
                    {course && course.map((course, index) => (
                      <option key={course._id} value={course.Course}>
                        {course.Course}
                      </option>
                    ))}
                    {/* Add more options as needed */}
                  </select>
                  <select
                    className="form-select mb-4"
                    id="day"
                    name="day"
                    required
                  >
                    <option value="">Select Day</option>
                    {daysOfWeek && daysOfWeek.map((day, index) => (
                      <option key={index} value={day}>
                        {day}
                      </option>
                    ))}
                    {/* Add more options as needed */}
                  </select>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="From"
                    name="from"
                    id="from"
                    type="time"
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="To"
                    name="to"
                    id="to"
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
                    {submit ? <MDBSpinner style={{ color: "white" }}></MDBSpinner> : <span>Add Schedule</span>}
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


