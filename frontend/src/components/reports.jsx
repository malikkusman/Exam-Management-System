import { useEffect, useState } from "react";
import Footer from "./layout/footer";
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import Navbar from "./layout/navbar";

const Reports = () => {
    const [username, setusername] = useState("")
    const [attendance, setattendance] = useState([])
    const [marks, setmarks] = useState([])
    useEffect(() => {
        setusername(localStorage.getItem("username"))
        fetchData()
        fetchData1()
    }, [])

    const fetchData = async () => {
        const Username = localStorage.getItem("username")
        try {
            const response = await axios.get(`http://localhost:4000/attendance/getuserattendance?Username=${Username}`);
            if (response.status !== 200) {
                throw new Error("Request failed.");
            }
            setattendance(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const fetchData1 = async () => {
        const username = localStorage.getItem("username")
        try {
            const response = await axios.get(`http://localhost:4000/stuassignment/getbyusername?username=${username}`);
            if (response.status !== 200) {
                throw new Error("Request failed.");
            }
            setmarks(response.data);
        } catch (error) {
            const logLevel = 'error'; // Define the log level for errors
            const errorMessage = error.message; // Get the error message
            const where = "student reports"; // Get the error message
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
        }
    };

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
        <div className="reports_page">
            <Navbar />
            <div className="content flex flex-col mt-16 mb-8 justify-center items-center">
                <h1 className="text-3xl">Reports</h1>
                <div className="w-full max-w-4xl">
                    <div className="max-w-4xl px-10 bg-white rounded-lg shadow-md">
                        <div className="mt-2">
                            <a className="text-2xl text-gray-700 font-bold hover:text-gray-600" href="/">
                                Attendance Report
                            </a>
                            <p className="mt-2 text-gray-600">
                                Attendance report till this date
                            </p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <button className="text-blue-600 hover:underline" onClick={() => generateAndDownloadPDF(attendance)}>
                                Download
                            </button>
                            <div>
                                <a className="flex items-center" href="/">
                                    <img
                                        className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                                        src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80"
                                        alt="avatar"
                                    />
                                    <h1 className="text-gray-700 font-bo    ld">{username}</h1>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-6"></div>
                <div className="w-full max-w-4xl">
                    <div className="max-w-4xl px-10 bg-white rounded-lg shadow-md">
                        <div className="mt-2">
                            <a className="text-2xl text-gray-700 font-bold hover:text-gray-600" href="/">
                                Marks Report
                            </a>
                            <p className="mt-2 text-gray-600">
                                Marks report till this date
                            </p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <button className="text-blue-600 hover:underline" onClick={() => generateAndDownloadPDF(marks)}>
                                Download
                            </button>
                            <div>
                                <a className="flex items-center" href="/">
                                    <img
                                        className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                                        src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80"
                                        alt="avatar"
                                    />
                                    <h1 className="text-gray-700 font-bo    ld">{username}</h1>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Reports;