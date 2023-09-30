import Cookies from "js-cookie";
import Footer from "./layout/footer";
import Navbar from "./layout/navbar";
import axios from "axios";
import { useState, useEffect } from "react";

const Profile = () => {
    const [data, setdata] = useState([])
    useEffect(() => {
        fetchData()
    }, []);

    const handlelogout = () => {
        Cookies.remove("token");
        window.location.href = '/'
    }


    const fetchData = async () => {
        const username = localStorage.getItem("username")
        try {
            const response = await axios.get(`http://localhost:4000/user/getbyusername?username=${username}`);
            if (response.status !== 200) {
                throw new Error("Request failed.");
            }
            setdata(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <div className="profile_page">
            <Navbar />
            <dir className="content">
                <div class="flex items-center justify-center p-12">
                    <div class="mx-auto w-full max-w-[550px] bg-white">
                        {data.length > 0 && (
                            <form>
                                <div class="mb-5">
                                    <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                                        First Name
                                    </label>
                                    <input type="text" name="name" id="name" value={data[0].Firstname}
                                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                                <div class="mb-5">
                                    <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                                        Last Name
                                    </label>
                                    <input type="text" name="name" id="name" placeholder="Full Name" value={data[0].Lastname}
                                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                                <div class="mb-5">
                                    <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                                        Username
                                    </label>
                                    <input type="text" name="phone" id="phone" placeholder="Enter your phone number" value={data[0].Username}
                                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                                <div class="mb-5">
                                    <label for="email" class="mb-3 block text-base font-medium text-[#07074D]">
                                        Email Address
                                    </label>
                                    <input type="email" name="email" id="email" placeholder="Enter your email" value={data[0].email}
                                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                                <div>
                                    <button
                                        class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800" onClick={handlelogout}>
                                       Logout
                                    </button>
                                </div>

                            </form>
                        )}
                    </div>
                </div>
            </dir>
            <Footer />
        </div>
    );
}

export default Profile;