import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./navbar";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {
  MDBRow,
} from "mdb-react-ui-kit";
import Cookies from "js-cookie";

export default function GenerateReports() {
  const [booking, setBookings] = useState([]);
  const [userId,setUserId]=useState("");

  useEffect(() => {
    document.body.style.backgroundColor="white";
    setUserId(hexToText(Cookies.get("seshId")));
    fetchBooking(hexToText(Cookies.get("seshId")));
  }, []);

  function hexToText(hex) {
    let text = '';
    try{
        for (let i = 0; i < hex.length; i += 2) {
            text += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
    }
    catch{
        text="";
    }
    return text;
  }

  const fetchBooking = async (id) => {
    await fetch(
    `http://localhost:4000/getMyBookings?id=${id}`,
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
        const current=new Date();
        setBookings(data.data.filter(item => new Date(item.fromTime) <= current));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
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
            Generate Reports
          </h3>
        </div>

        <MDBRow
          className="row-cols-1 row-cols-md-4 g-4"
          style={{
            margin: "20px",
            justifyContent: "center",
            marginLeft: "30px",
          }}
        >
            <MDBTable hover style={{margin:"10px"}}>
                <MDBTableHead>
                    <tr>
                    <th scope='col'>Sr</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Description</th>
                    <th scope='col'>Download</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                {booking.map((book,index)=>(
                    <tr>
                        <th scope='row'>{index+1}</th>
                        {console.log(book.roomno,book.deskno)}
                        <td>{book.roomno!=undefined ? "Room" : "Desk" }</td>
                        <td>{book.roomno!=undefined ? book.roomno : book.deskno }</td>
                        <td>{new Date(book.fromTime).toLocaleString()}</td>
                        <td>{new Date(book.toTime).toLocaleString()}</td>
                    </tr>
                ))}       
                </MDBTableBody>
                </MDBTable>
          </MDBRow>
      </div>
    </div>
  );
}
