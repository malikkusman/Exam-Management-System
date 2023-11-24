import axios from "axios";
import { useState } from "react";
import Cookies from 'js-cookie';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = () => {
        const data = {
            email: email,
            password: password
        }
        axios.post('http://localhost:4000/user/login', data)
            .then((response) => {
                console.log(response);
                Cookies.set('username', response.data.users[0].Username, { expires: 2 });
                Cookies.set('token', response.data.token, { expires: 2 });
                window.location.href = '/home';
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
    return (
        <div classNameName="login_page">
            <div className="bg-gray-100 text-gray-900 flex justify-center">
                <div
                    className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1"
                >
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div>
                            <img src="/images/logo2.png" alt="logo" className="w-32 mx-auto rounded-2xl" />
                        </div>
                        <div className="mt-12 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold">
                                Welcome Back
                            </h1>
                            <div className="w-full flex-1 mt-8">


                                <div className="mx-auto max-w-xs">
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                    />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                    />
                                    <button onClick={handleClick}
                                        className="mt-5 tracking-wide font-semibold bg-[#5c448c] text-gray-100 w-full py-4 rounded-lg hover:bg-[#573896] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 -ml-2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>

                                        <span className="ml-3">
                                            Sign In
                                        </span>
                                    </button>
                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        Don't have an account?
                                        <a href="/register" className="ml-8 border-b border-gray-500 border-dotted">
                                            Register
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                        <div
                            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')`,
                            }}
                        ></div>
                    </div> */}
                </div>
                <div className="REMOVE-THIS-ELEMENT-IF-YOU-ARE-USING-THIS-PAGE hidden treact-popup fixed inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.3);", }}>
                    <div className="max-w-lg p-8 sm:pb-4 bg-white rounded shadow-lg text-center sm:text-left">

                        <h3 className="text-xl sm:text-2xl font-semibold mb-6 flex flex-col sm:flex-row items-center">
                            <div className="bg-green-200 p-2 rounded-full flex items-center mb-4 sm:mb-0 sm:mr-2">
                                <svg className="text-green-800 inline-block w-5 h-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
                            </div>
                            Free TailwindCSS Component Kit!
                        </h3>
                        <p>I recently released Treact, a <span className="font-bold">free</span> TailwindCSS Component Kit built with React.</p>
                        <p className="mt-2">It has 52 different UI components, 7 landing pages, and 8 inner pages prebuilt. And they are customizable!</p>
                        <div className="mt-8 pt-8 sm:pt-4 border-t -mx-8 px-8 flex flex-col sm:flex-row justify-end leading-relaxed">
                            <button className="close-treact-popup px-8 py-3 sm:py-2 rounded border border-gray-400 hover:bg-gray-200 transition duration-300">Close</button>
                            <a className="font-bold mt-4 sm:mt-0 sm:ml-4 px-8 py-3 sm:py-2 rounded bg-purple-700 text-gray-100 hover:bg-purple-900 transition duration-300 text-center" href="https://treact.owaiskhan.me" target="_blank" rel="noreferrer">See Treact</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;