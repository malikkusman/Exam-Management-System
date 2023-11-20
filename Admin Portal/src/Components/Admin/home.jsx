import React, { useEffect, useState } from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon } from "mdbreact";
import Sidebar from "./sidebar";
import Header from "./navbar";

export default function Home() {
  const [dashboard, setDashbord] = useState({});
  useEffect(() => {
    document.body.style.backgroundColor="white";
    const fetchData = async () => {
      await fetch(
      `http://localhost:4000/dashboard`,
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
        setDashbord(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    };
    fetchData();
  }, []);
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
                    <h2>{dashboard.totalrooms}</h2>
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
                    <h2>{dashboard.users}</h2>
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
