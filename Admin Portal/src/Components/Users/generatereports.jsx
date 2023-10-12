import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./navbar";
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { Button } from "react-bootstrap";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {
  MDBRow,
} from "mdb-react-ui-kit";
import Cookies from "js-cookie";

export default function GenerateReports() {
  const [booking, setBookings] = useState([]);
  const [userId, setUserId] = useState("");
  const [attendanceData,setattendance] = useState([])
  const [assignmentData,setassignmentData] = useState([])

  useEffect(() => {
    handleAttendance()
    handleassignment()
  }, []);

  const handleassignment = async () => {
    try {
      const response = await axios.get('http://localhost:4000/assignment/get');
      if (response.status !== 200) {
        throw new Error("Request failed.");
      }
      setassignmentData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function hexToText(hex) {
    let text = '';
    try {
      for (let i = 0; i < hex.length; i += 2) {
        text += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      }
    }
    catch {
      text = "";
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
        const current = new Date();
        setBookings(data.data.filter(item => new Date(item.fromTime) <= current));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

 


  const handleAttendance = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/attendance/get`);

      if (response.status !== 200) {
        throw new Error("Request failed.");
      }
      setattendance(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const generateAndDownloadPDF = (data) => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Format your data into a table or content for the PDF
    // For example, using jspdf-autotable to create a table
    const columns = Object.keys(data[0]);

    // Extract values for each row
    const rows = data.map(obj => Object.values(obj));

    // Add the table with the extracted data to the PDF
    doc.autoTable({
        head: [columns],
        body: rows,
    });

    // Save the PDF with a specific name (e.g., 'downloaded.pdf')
    const pdfName = 'downloaded.pdf';

    // Save the generated PDF
    doc.save(pdfName);
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
          <MDBTable hover style={{ margin: "10px" }}>
            <MDBTableHead>
              <tr>
                <th scope='col'>Sr</th>
                <th scope='col'>Name</th>
                <th scope='col'>Description</th>
                <th scope='col'>Download</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td>0</td>
                <td>Attendance Report</td>
                <td>Students attendance sheet of all classes</td>
                <td><Button onClick={() => generateAndDownloadPDF(attendanceData)}
                  style={{
                    backgroundColor: "#3c4763",
                    border: "none",
                    color: "white",
                    fontWeight: "bold",
                    marginTop: "10px",
                  }}
                >
                  Download
                </Button></td>
                </tr>
                <tr>
                <th>1</th>
                <td>Assignment Report</td>
                <td>Students assignment sheet of all classes</td>
                <td><Button onClick={() => generateAndDownloadPDF(assignmentData)}
                  style={{
                    backgroundColor: "#3c4763",
                    border: "none",
                    color: "white",
                    fontWeight: "bold",
                    marginTop: "10px",
                  }}
                >
                  Download
                </Button></td>
              </tr>

            </MDBTableBody>
          </MDBTable>
        </MDBRow>
      </div>
    </div>
  );
}
