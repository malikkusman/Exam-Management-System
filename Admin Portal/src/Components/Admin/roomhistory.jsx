import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./navbar";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBTypography,
} from "mdb-react-ui-kit";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

export default function RoomHistory() {
  const [rooms, setRooms] = useState([]);
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");
  useEffect(() => {
    const fetchOccupied = async () => {
      await fetch(
      `http://localhost:4000/getOccupiedRoom?id=${id}&type=room`,
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
        setRooms(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    };
    fetchOccupied();
  }, []);

  function convertToGermanDateTimeFormat(datetime) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const germanDateTime = datetime.toLocaleString("de-DE", options);
    return germanDateTime;
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
            Room History
          </h3>
        </div>
        <center>
          <section
            className="h-100"
            style={{ marginLeft: "7px", width: "90%" }}
          >
             <MDBTable hover style={{margin:"10px"}}>
                <MDBTableHead>
                    <tr>
                    <th scope='col'>Sr</th>
                    <th scope='col'>From</th>
                    <th scope='col'>To</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                {rooms.map((book,index)=>(
                    <tr>
                        <th scope='row'>{index+1}</th>
                        <td>{new Date(book.fromTime).toLocaleString()}</td>
                        <td>{new Date(book.toTime).toLocaleString()}</td>
                    </tr>
                ))}       
                </MDBTableBody>
                </MDBTable>
          </section>
        </center>
      </div>
    </div>
  );
}
