import { useEffect, useState } from "react";
import Footer from "./layout/footer";
import Navbar from "./layout/navbar";
import axios from "axios";

const Result = () => {
    const [data, setdata] = useState([])
    useEffect(() => {
        fetchData()
    }, []);


    const fetchData = async () => {
        const username = localStorage.getItem("username")
        try {
            const response = await axios.get(`http://localhost:4000/stuassignment/getbyusername?username=${username}`);
            if (response.status !== 200) {
                throw new Error("Request failed.");
            }
            setdata(response.data);
        } catch (error) {
            const logLevel = 'error'; // Define the log level for errors
            const errorMessage = error.message; // Get the error message
            const where = "student result"; // Get the error message
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
        <div className="result_page">
            <Navbar />
            <div className="content mt-16 ">
                <div className="Buttons flex justify-center gap-20 mb-4">
                    <h1 className="text-3xl">Marks</h1>
                </div>
                <section class="py-1 bg-blueGray-50">
                    <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto">
                        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">

                            <div class="block w-full overflow-x-auto">
                                <table class="items-center bg-transparent w-full border-collapse ">
                                    <thead>
                                        <tr>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Name
                                            </th>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Category
                                            </th>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Test
                                            </th>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Description
                                            </th>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Total Marks
                                            </th>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Obtain Marks
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data && data.map((user, index) => (
                                            <tr key={user._id}>
                                                <td className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">{user.StudentName}</td>
                                                <td className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">{user.Category}</td>
                                                <td className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">{user.Name}</td>
                                                <td className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">{user.Description}</td>
                                                <td className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">{user.Marks}</td>
                                                <td className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">{user.ObtainMarks == 9999 ? (<p>not checked</p>) : user.ObtainMarks}</td>
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

export default Result;