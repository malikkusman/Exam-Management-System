import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./navbar";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from "axios";
import {
  MDBCard,
  MDBBtn,
  MDBSpinner,
  MDBCardBody,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBInput
} from "mdb-react-ui-kit";
import Cookies from "js-cookie";

export default function CreateAssignment() {
  const [data2, setdata] = useState([]);
  const [back, setBack] = useState([]);
  const [udata, setudata] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [check, setCheck] = useState(false);

  useEffect(() => {
    fetchData()
  }, [showModal]);


  const fetchData = async () => {
    const username = localStorage.getItem("teacher")
    try {
      const response = await axios.get(`http://localhost:4000/assignment/getbyusername?username=${username}`);
      if (response.status !== 200) {
        throw new Error("Request failed.");
      }
      setdata(response.data);
      setBack(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/assignment/delete?id=${id}`);
      window.location.href = "/create-assignment";
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const updateHandle = (cour) => {
    setudata(cour)
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
            Assignments
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
                  <th>Name</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>File</th>
                  <th>marks</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {data2 && data2.map((us, index) => (
                  <tr key={us._id}>
                    <td>{us.Name}</td>
                    <td>{us.Category}</td>
                    <td>{us.Description}</td>
                    <td>{us.Date}</td>
                    <td><a href={`http://localhost:4000/images/${us.File}`} width="100%" height="500px">
                      file
                    </a>
                    </td>
                    <td>{us.Marks}</td>
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
          </div>
        </MDBRow>
      </div >
    </div >
  );
}



const Modal = ({ data, showModal, setShowModal }) => {

  const [submit, setSubmit] = useState(false);
  const [name, setname] = useState(""); // Assuming `data.Course` holds initial value
  const [category, setcategory] = useState(""); // Assuming `data.INSTname` holds initial value
  const [description, setdescription] = useState(""); // Assuming `data.Description` holds initial value
  const [date, setdate] = useState(""); // Assuming `data.Course` holds initial value
  const [file, setfile] = useState(data.File); // Assuming `data.INSTname` holds initial value
  const [number, setnumber] = useState(""); // Assuming `data.INSTname` holds initial value

  function convertMongoDBDateToInputValue(mongoDBDateString) {
    try {
      const date = new Date(mongoDBDateString);
      if (isNaN(date)) {
        throw new Error('Invalid date');
      }

      const year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, '0');
      let day = date.getDate().toString().padStart(2, '0');

      // Format the date as 'YYYY-MM-DD'
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    } catch (error) {
      console.error('Error converting date:', error.message);
      return ''; // Return an empty string or handle the error accordingly
    }
  }


  useEffect(() => {
    setname(data.Name)
    setcategory(data.Category)
    setdescription(data.Description)
    setdate(convertMongoDBDateToInputValue(data.Date))
    setfile(data.File)
    setnumber(data.Marks)
  }, [showModal])

  const handlenChange = (e) => {
    setname(e.target.value);
  };

  const handlecChange = (e) => {
    setcategory(e.target.value);
  };

  const handledesChange = (e) => {
    setdescription(e.target.value);
  };

  const handledChange = (e) => {
    date(e.target.value);
  };

  const handlefChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile.name); // Display the name of the selected file
    setfile(selectedFile); // Store the selected file in state if needed
  };
  const handlenuChange = (e) => {
    setnumber(e.target.value);
  };


  const handleSubmit = async (event) => {
    setShowModal(false)
    event.preventDefault();
    setSubmit(true);
    const username = localStorage.getItem("teacher")
    const data1 = {
      Name: name,
      Category: category,
      Description: description,
      Date: date,
      Marks: number,
      file: file,
      teacher: username
    }
    try {
      const response = await axios.put(`http://localhost:4000/assignment/update?id=${data._id}`, data1, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data)
      if (response.status == 200) {
        window.location.href = "/create-assignment";
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
                    id="category"
                    name="category"
                    required
                    value={category}
                    onChange={handlecChange}
                  >
                    <option value="">Select Category</option>
                    <option value="assignment">Assignment</option>
                    <option value="quiz">Quiz</option>
                    {/* Add more options as needed */}
                  </select>
                  <MDBInput
                    value={name}
                    onChange={handlenChange}
                    wrapperClass="mb-4"
                    label="Name"
                    name="name"
                    id="name"
                    type="text"
                    required
                  />
                  <MDBInput
                    value={description}
                    onChange={handledesChange}
                    wrapperClass="mb-4"
                    label="Description"
                    name="description"
                    id="description"
                    type="text"
                    required
                  />
                  <MDBInput
                    value={date}
                    onChange={handledChange}
                    wrapperClass="mb-4"
                    label="Date"
                    name="date"
                    id="date"
                    type="date"
                    required
                  />
                  <MDBInput
                    onChange={handlefChange}
                    wrapperClass="mb-4"
                    label={data.File}
                    name="file"
                    id="file"
                    type="file"
                  />
                  <MDBInput
                    value={number}
                    onChange={handlenuChange}
                    wrapperClass="mb-4"
                    label="Number"
                    name="number"
                    id="number"
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
                    {submit ? <MDBSpinner style={{ color: "white" }}></MDBSpinner> : <span>Update Assignment</span>}
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