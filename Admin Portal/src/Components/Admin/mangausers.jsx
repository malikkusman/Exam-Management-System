import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./navbar";
import axios from "axios";
import { Button } from "react-bootstrap";
import {
  MDBCard,
  MDBInput,
  MDBBtn,
  MDBSpinner,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBTable, MDBTableBody, MDBTableHead,
  MDBCardText,
  MDBCardFooter,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

export default function Mangaeusers() {
  const [users, setUsers] = useState([]);
  const [back, setBack] = useState([]);
  const [udata, setudata] = useState([])
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    fetchData();
  }, [showModal]);

  const updateHandle = (cour) => {
    setudata(cour)
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/user/delete?id=${id}`);
      window.location.href = "/manage-users";
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const fetchData = async () => {
    const role = "student"
    try {
      const response = await axios.get(`http://localhost:4000/user/getall?role=${role}`);

      if (response.status !== 200) {
        throw new Error("Request failed.");
      }
      setUsers(response.data);
      setBack(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function backQuery() {
    var query = document.getElementById("search").value;
    if (query == "") {
      setUsers(back);
    }
  }


  const searchQuery = () => {
    var query = document.getElementById("search").value;
    setUsers(
      users.filter((user) =>
        user.roomno.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  function backQuery() {
    var query = document.getElementById("search").value;
    if (query == "") {
      setUsers(back);
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
            Manage Students
          </h3>
          <a href="/add-users">
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
              Add Student
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
                placeholder="By Room No e.g 01"
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
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {users && users.map((user, index) => (
                <tr key={user._id}>
                  <td>{user.Firstname}</td>
                  <td>{user.Lastname}</td>
                  <td>{user.Username}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
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
                          Update
                        </Button></td>
                  <td><Button onClick={() => handleDelete(user._id)}
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
  const [fname, setfname] = useState(data.Firstname); // Assuming `data.Course` holds initial value
  const [lname, setlname] = useState(data.Lastname); // Assuming `data.INSTname` holds initial value
  const [email, setemail] = useState(data.email); // Assuming `data.Description` holds initial value
  const [username, setusername] = useState(data.Username); // Assuming `data.Course` holds initial value
  const [password, setpassword] = useState(data.password); // Assuming `data.INSTname` holds initial value

  useEffect(() => {
    setfname(data.Firstname)
    setlname(data.Lastname)
    setemail(data.email)
    setusername(data.Username)
    setpassword(data.password)
    console.log("hello",username)
  },[showModal])

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

  const handleSubmit = async (event) => {
    setShowModal(false)
    event.preventDefault();
    setSubmit(true);
    const data1 = {
      Firstname: fname,
      Lastname: lname,
      Username: username,
      email: email,
      password: password,
    }
    try {
      const response = await axios.put(`http://localhost:4000/user/update?id=${data._id}`, data1);
      console.log(response.data)
      if (response.data.message === "updated") {
        window.location.href = "/manage-users";
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
                    value={fname}
                    onChange={handlefChange}
                    wrapperClass="mb-4"
                    label="First Name"
                    name="course"
                    id="course"
                    type="text"
                    required
                  />
                  <MDBInput
                    value={lname}
                    onChange={handlelChange}
                    wrapperClass="mb-4"
                    label="Last Name"
                    name="course"
                    id="course"
                    type="text"
                    required
                  />
                  <MDBInput
                    value={username}
                    onChange={handleuChange}
                    wrapperClass="mb-4"
                    label="Username"
                    name="course"
                    id="course"
                    type="text"
                    required
                  />
                  <MDBInput
                    value={email}
                    onChange={handleeChange}
                    wrapperClass="mb-4"
                    label="Email"
                    name="course"
                    id="course"
                    type="email"
                    required
                  />
                  <MDBInput
                    value={password}
                    onChange={handlepChange}
                    wrapperClass="mb-4"
                    label="Password"
                    name="course"
                    id="course"
                    type="password"
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
                  {submit ? <MDBSpinner style={{ color: "white" }}></MDBSpinner> : <span>Update Student</span>}
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