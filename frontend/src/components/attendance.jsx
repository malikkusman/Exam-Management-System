import Footer from "./layout/footer";
import Navbar from "./layout/navbar";
import { useState, useEffect } from "react";
import axios from "axios";

const Attendance = () => {
    const [attendance, setattendance] = useState([])
    useEffect(() => {
        fetchData()
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
            const logLevel = 'error'; // Define the log level for errors
            const errorMessage = error.message; // Get the error message
            const where = "student attendance"; // Get the error message
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
    return (
        <div className="attendance_page">
            <Navbar />
            <div className="content mt-16">
                <h1 className="text-3xl">Attendance</h1>
                <section class="py-1 bg-blueGray-50">
                    <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto">
                        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">

                            <div class="block w-full overflow-x-auto">
                                <table class="items-center bg-transparent w-full border-collapse ">
                                    <thead>
                                        <tr>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                First Name
                                            </th>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Last Name
                                            </th>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Username
                                            </th>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Date
                                            </th>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attendance && attendance.map((user, index) => (
                                            <tr key={user._id}>
                                                <td className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">{user.Firstname}</td>
                                                <td className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">{user.Lastname}</td>
                                                <td className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">{user.Username}</td>
                                                <td className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">{user.Date}</td>
                                                <td className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">{user.Status}</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default Attendance;