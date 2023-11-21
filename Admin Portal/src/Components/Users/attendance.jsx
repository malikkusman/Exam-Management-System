import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./navbar";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { Link } from 'react-router-dom';
import {
  MDBRow,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInput,
} from "mdb-react-ui-kit";
import Cookies from "js-cookie";

export default function Attendance() {
  const [users, setUsers] = useState([]);
  const [back, setBack] = useState([]);
  const [udata, setudata] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [check, setCheck] = useState(false)
  const [date1, setDate] = useState(new Date())
  const [newArray, setNewArray] = useState([]);
  const [stu, setStu] = useState([]);

  const handlepresent = async (user, index) => {
    if (check == false) {
      alert("Please enter the date first")
    }
    else {
      setNewArray(prevArray => {
        const updatedArray = [...prevArray];
        updatedArray[index] = "present";
        return updatedArray;
      });
      setStu(prevArray => {
        const updatedArray = [...prevArray];
        updatedArray.push(user.Username);
        return updatedArray;
      });
      console.log(stu, user.Username)
      if (stu.includes(user.Username)) {
        try {
          const response = await axios.get('http://localhost:4000/attendance/get');
          console.log(response.data)
          const filteredData = response.data.filter(item => {
            const dateString = date1;
            const dateObject = new Date(dateString);
            const isoString = dateObject.toISOString();
            console.log(item.Username, user.Username ,item.Date , isoString)
            return item.Username == user.Username && item.Date == isoString;
          });
          console.log("filteredData", filteredData)
          const data1 = {
            Firstname: user.Firstname,
            Lastname: user.Lastname,
            Username: user.Username,
            Status: "present",
            Date: date1,
          }
          try {
            const response = await axios.put(`http://localhost:4000/attendance/update?id=${filteredData[0]._id}`, data1);
            console.log(response.data)
            if (response.data.message === "updated") {
              window.location.href = "/attendance";
            } else if (response.data.message === "already") {
              document.getElementById("desk-error").innerHTML = "Course ALREADY EXIST";
              document.getElementById("desk-error").style.color = "red";
              document.getElementById("desk-error").style.display = "block";
            }
          } catch (error) {
            console.error("Error:", error);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      else {
        const Data = {
          Firstname: user.Firstname,
          Lastname: user.Lastname,
          Username: user.Username,
          Status: "present",
          Date: date1,
        }
        console.log(Data)
        axios.post('http://localhost:4000/attendance/add', Data)
          .then((response) => {
            console.log('Response:', response.data);
            if (response.data.message == "data added") {
              window.location.href = "/manage-teachers";
            }
            else if (response.data == "already") {
              document.getElementById("room-error").innerHTML = "ROOM ALREADY EXIST";
              document.getElementById("room-error").style.color = "red";
              document.getElementById("room-error").style.display = "block";
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }

    }
  }
  const handleabsent = async (user, index) => {
    if (check == false) {
      alert("Please enter the date first")
    }
    else {
      setNewArray(prevArray => {
        const updatedArray = [...prevArray];
        updatedArray[index] = "absent";
        return updatedArray;
      });
      setStu(prevArray => {
        const updatedArray = [...prevArray];
        updatedArray.push(user.Username);
        return updatedArray;
      });
      console.log(stu, user.Username)
      if (stu.includes(user.Username)) {
        try {
          const response = await axios.get('http://localhost:4000/attendance/get');
          console.log(response.data)
          const filteredData = response.data.filter(item => {
            const dateString = date1;
            const dateObject = new Date(dateString);
            const isoString = dateObject.toISOString();
            console.log(item.Username, user.Username ,item.Date , isoString)
            return item.Username == user.Username && item.Date == isoString;
          });
          console.log("filteredData", filteredData)
          const data1 = {
            Firstname: user.Firstname,
            Lastname: user.Lastname,
            Username: user.Username,
            Status: "absent",
            Date: date1,
          }
          try {
            const response = await axios.put(`http://localhost:4000/attendance/update?id=${filteredData[0]._id}`, data1);
            console.log(response.data)
            if (response.data.message === "updated") {
              window.location.href = "/attendance";
            } else if (response.data.message === "already") {
              document.getElementById("desk-error").innerHTML = "Course ALREADY EXIST";
              document.getElementById("desk-error").style.color = "red";
              document.getElementById("desk-error").style.display = "block";
            }
          } catch (error) {
            console.error("Error:", error);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      else {
        const Data = {
          Firstname: user.Firstname,
          Lastname: user.Lastname,
          Username: user.Username,
          Status: "absent",
          Date: date1,
        }
        console.log(Data)
        axios.post('http://localhost:4000/attendance/add', Data)
          .then((response) => {
            console.log('Response:', response.data);
            if (response.data.message == "data added") {
              window.location.href = "/manage-teachers";
            }
            else if (response.data == "already") {
              document.getElementById("room-error").innerHTML = "ROOM ALREADY EXIST";
              document.getElementById("room-error").style.color = "red";
              document.getElementById("room-error").style.display = "block";
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }

    }
  }
  const handleleave = async (user, index) => {
    if (check == false) {
      alert("Please enter the date first")
    }
    else {
      setNewArray(prevArray => {
        const updatedArray = [...prevArray];
        updatedArray[index] = "leave";
        return updatedArray;
      });
      setStu(prevArray => {
        const updatedArray = [...prevArray];
        updatedArray.push(user.Username);
        return updatedArray;
      });
      console.log(stu, user.Username)
      if (stu.includes(user.Username)) {
        try {
          const response = await axios.get('http://localhost:4000/attendance/get');
          console.log(response.data)
          const filteredData = response.data.filter(item => {
            const dateString = date1;
            const dateObject = new Date(dateString);
            const isoString = dateObject.toISOString();
            console.log(item.Username, user.Username ,item.Date , isoString)
            return item.Username == user.Username && item.Date == isoString;
          });
          console.log("filteredData", filteredData)
          const data1 = {
            Firstname: user.Firstname,
            Lastname: user.Lastname,
            Username: user.Username,
            Status: "leave",
            Date: date1,
          }
          try {
            const response = await axios.put(`http://localhost:4000/attendance/update?id=${filteredData[0]._id}`, data1);
            console.log(response.data)
            if (response.data.message === "updated") {
              window.location.href = "/attendance";
            } else if (response.data.message === "already") {
              document.getElementById("desk-error").innerHTML = "Course ALREADY EXIST";
              document.getElementById("desk-error").style.color = "red";
              document.getElementById("desk-error").style.display = "block";
            }
          } catch (error) {
            console.error("Error:", error);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      else {
        const Data = {
          Firstname: user.Firstname,
          Lastname: user.Lastname,
          Username: user.Username,
          Status: "leave",
          Date: date1,
        }
        console.log(Data)
        axios.post('http://localhost:4000/attendance/add', Data)
          .then((response) => {
            console.log('Response:', response.data);
            if (response.data.message == "data added") {
              window.location.href = "/manage-teachers";
            }
            else if (response.data == "already") {
              document.getElementById("room-error").innerHTML = "ROOM ALREADY EXIST";
              document.getElementById("room-error").style.color = "red";
              document.getElementById("room-error").style.display = "block";
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }

    }
  }
  const checkhandle = () => {
    alert(date1)
    setCheck(true)
  }

  useEffect(() => {
    fetchData();
  }, []);



  const fetchData = async () => {
    const role = "student"
    try {
      const response = await axios.get(`http://localhost:4000/user/getall?role=${role}`);

      if (response.status !== 200) {
        throw new Error("Request failed.");
      }
      const initialStatus = Array(response.data.length).fill("present");
      setNewArray(initialStatus);
      setUsers(response.data);
      setBack(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
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
            Attendance
          </h3>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div>
            <p className="text-center">Check Student Attendnace</p>
            <div className="d-lg-flex justify-content-center align-items-center">
              <div className="mb-4 mb-lg-0 mr-lg-2">
                <MDBInput
                  value={date1}
                  name="date"
                  id="from"
                  type="date"
                  onChange={(event) => setDate(event.target.value)}
                  required
                />
              </div>
              <div className="mb-4 mb-lg-0">
                <Button
                  size="sm"
                  variant="primary"
                  style={{ height: "35px" }}
                  onClick={checkhandle}
                >

                  Check
                </Button>
              </div>
            </div>
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
                    <th>Status</th>
                    <th>Present</th>
                    <th>Absent</th>
                    <th>Leave</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {users && users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{user.Firstname}</td>
                      <td>{user.Lastname}</td>
                      <td>{user.Username}</td>
                      <td>{newArray[index]}</td>
                      <td><Button
                        style={{
                          backgroundColor: "#3c4763",
                          border: "none",
                          color: "white",
                          fontWeight: "bold",
                          marginTop: "10px",
                        }}
                        onClick={() => handlepresent(user, index)}
                      >
                        Present
                      </Button></td>
                      <td><Button
                        style={{
                          backgroundColor: "#3c4763",
                          border: "none",
                          color: "white",
                          fontWeight: "bold",
                          marginTop: "10px",
                        }}
                        onClick={() => handleabsent(user, index)}
                      >
                        Absent
                      </Button></td>
                      <td><Button
                        style={{
                          backgroundColor: "#3c4763",
                          border: "none",
                          color: "white",
                          fontWeight: "bold",
                          marginTop: "10px",
                        }}
                        onClick={() => handleleave(user, index)}
                      >
                        Leave
                      </Button></td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </MDBRow>
          </div>
        </div>
      </div>
    </div>
  );
}
