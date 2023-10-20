import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBSpinner,
} from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from 'axios'
import Cookies from "js-cookie";

function Login({ setaIsLoggedIn, setuIsLoggedIn }) {
  const [submit, setSubmit] = useState(false);
  const [valid, setValid] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.body.style.backgroundColor = "#313a50";
  })

  const handlePassword = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length == 0) {
      event.target.style.backgroundColor = "#f6eacf";
      event.target.style.border = "1px solid #daa93e";
    } else {
      event.target.style.backgroundColor = "#d1e4df";
      event.target.style.border = "1px solid #579c89";
    }
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
    if (event.target.value.length == 0) {
      event.target.style.backgroundColor = "#f6eacf";
      event.target.style.border = "1px solid #daa93e";
    } else {
      event.target.style.backgroundColor = "#d1e4df";
      event.target.style.border = "1px solid #579c89";
    }
  }

  const handleClick = () => {
    const data = {
      email: email,
      password: password
    }
    axios.post('http://localhost:4000/user/login', data)
      .then((response) => {
        localStorage.setItem("username", response.data[0].Username)
        window.location.href = '/'
      })
      .catch((error) => {
        const logLevel = 'error'; // Define the log level for errors
        const errorMessage = error.message; // Get the error message
        const where = "login"; // Get the error message
        const data1 = {
          level: logLevel,
          message: errorMessage,
          where: where,
        }
        axios.post('http://localhost:4000/logs/add', data1)
          .then((response) => {
            console.log("done");
          })
          .catch((error) => {
            console.log(error)
          });
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    setSubmit(true);
    const data1 = {
      email: email,
      password: password
    }
    axios.post('http://localhost:4000/user/login', data1)
      .then((response) => {
        console.log(response.data)
        if (response.data.users[0].role == "admin") {
          localStorage.setItem('isLoggedIn', 'true')
          setaIsLoggedIn(true)
          window.location.href = `${process.env.REACT_APP_URL}`;
        }
        else if (response.data.users[0].role == "teacher") {
          localStorage.setItem('teacher', response.data.users[0].Username)
          localStorage.setItem('uisLoggedIn', 'true')
          setuIsLoggedIn(true)
          window.location.href = `${process.env.REACT_APP_USERURL}`;
        }
        else {
          setSubmit(false)
          alert("Please enter the correct credentials")
        }
        // if (data.message == "seshad") {
        //   Cookies.set("seshad", data.sesh_u, { expires: 2 });
        //   Cookies.set("seshR", data.sesh_R, { expires: 2 });
        //   window.location.href = `${process.env.REACT_APP_URL}`;
        // }
        // else if (data.message == "seshuser") {
        //   Cookies.set("seshE", data.sesh_e, { expires: 2 });
        //   Cookies.set("seshF", data.sesh_f, { expires: 2 });
        //   Cookies.set("seshU", data.sesh_u, { expires: 2 });
        //   Cookies.set("seshId", data.sesh_Id, { expires: 2 });
        //   window.location.href = `${process.env.REACT_APP_USERURL}`;
        // }
        // else if (data.message == "invalid") {
        //   setSubmit(false);
        //   setValid(true);
        //   setTimeout(function () {
        //     setValid(false);
        //   }, 2000);
        // }
      })
      .catch((err) => {
        window.location.href = "/"
        console.log(err)
      })
  };

  return (
    <div>
      <div className="login-container">
        <MDBContainer fluid>
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12">
              <MDBCard
                className="my-5 mx-auto"
                id="card"
                style={{ borderRadius: 0, maxWidth: "400px", backgroundColor: '#3c4763' }}
              >
                <MDBCardBody className="p-5 w-100 d-flex flex-column">
                  <form onSubmit={handleLogin}>
                    <center>
                      <img
                        src="./Assets/admin-icon.png"
                        alt="ADMIN"
                        style={{
                          width: "180px",
                          borderRadius: "50%",
                          height: "180px",
                        }}
                      />
                    </center>
                    <h4 style={{ marginTop: "10px", marginBottom: "30px", textAlign: "center", color: 'white' }}>
                      LOGIN
                    </h4>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        size="lg"
                        value={email}
                        onChange={handleEmail}
                        style={{ borderRadius: 0 }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        size="lg"
                        value={password}
                        onChange={handlePassword}
                        style={{ borderRadius: 0 }}
                      />
                    </Form.Group>
                    <MDBBtn
                      type="submit"
                      size="lg"
                      style={{
                        borderRadius: 0,
                        width: "100%",
                        color: valid ? "white" : "#3c4763",
                        fontWeight: "bold",
                        backgroundColor: valid ? "red" : "#e8eaf1",
                      }}
                      className="btnsc"
                    >
                      {submit ? (
                        <MDBSpinner color="info" />
                      ) : valid ? (
                        <span>Incorrect Login</span>
                      ) : (
                        <span>Login</span>
                      )}
                    </MDBBtn>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <div style={{ textAlign: "center", color: 'white' }}>
        <footer className="footer">
          <p>
            &copy; {new Date().getFullYear()} Booking Tool. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Login;
