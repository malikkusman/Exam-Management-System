import React, { useEffect, useState } from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon } from "mdbreact";
import axios from "axios";
import Sidebar from "./sidebar";
import Header from "./navbar";

export default function Home() {
  const [dashboard, setDashbord] = useState({});
  useEffect(() => {
    teachers()
    courses()
    students()
  }, [])

  const [teacher, setTeachers] = useState([])
  const [student, setStudents] = useState([])
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
  const students = async () => {
    const role = "student"
    try {
      const response = await axios.get(`http://localhost:4000/user/getall?role=${role}`);

      if (response.status !== 200) {
        throw new Error("Request failed.");
      }
      setStudents(response.data);
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
        <div>
          <center>
            <h1 style={{ marginTop: "25px",color:'#3c4763' }}>Welcome to Admin Dashboard!</h1>
          </center>
          <MDBRow style={{ margin: "30px" }}>
            <MDBCol md="4">
              <MDBCard style={{ marginTop: "5px" }} className={`allcards`}>
                <MDBCardBody>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <MDBIcon
                        icon="user"
                        className="mr-2"
                        style={{ marginRight: "5px" }}
                      />
                      Total Teachers
                    </div>
                    <h2>{teacher.length}</h2>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol md="4">
              <MDBCard style={{ marginTop: "5px" }}>
                <MDBCardBody>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <MDBIcon
                        icon="users"
                        className="mr-2"
                        style={{ marginRight: "5px" }}
                      />
                      Total Students
                    </div>
                    <h2>{student.length}</h2>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="4">
              <MDBCard style={{ marginTop: "5px" }}>
                <MDBCardBody>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <MDBIcon
                        icon="book"
                        className="mr-2"
                        style={{ marginRight: "5px" }}
                      />
                      Total Courses
                    </div>
                    <h2>{course.length}</h2>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
    </div>
  );
}
