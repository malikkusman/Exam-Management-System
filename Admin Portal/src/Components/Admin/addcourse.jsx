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

export default function Adddcourse() {
  const [submit, setSubmit] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);
    const course = document.getElementById("course").value;
    const instname = document.getElementById("instructor").value;
    const description = document.getElementById("description").value;

    try {
      const response = await axios.post('http://localhost:4000/course/add', {
        course,
        instname,
        description,
      });
      console.log(response.data.message)
      if (response.data.message === "added") {
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

  useEffect(() => {
    teachers()
  }, [])

  const [teacher, setTeachers] = useState([])
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
          Add Course
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
                  >
                    <option value="">Select Instructor</option>
                    {teacher && teacher.map((instructor, index) => (
                      <option key={instructor._id} value={instructor.Username}>
                        {instructor.Username}
                      </option>
                    ))}
                    {/* Add more options as needed */}
                  </select>
                  <MDBTextArea label='Desk Description' id='description' rows={4} />
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
                    {submit ? <MDBSpinner style={{ color: "white" }}></MDBSpinner> : <span>Add Course</span>}
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
