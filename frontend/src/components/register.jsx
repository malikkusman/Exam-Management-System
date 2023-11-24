import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState } from 'react';


const Register = () => {
    const [fname, setFirstName] = useState("");
    const [lname, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [conpass, setconPass] = useState("");
    const handleGoogleLoginSuccess = async (response) => {
        console.log(response);
        axios.post('http://localhost:4000/user/register', response)
            .then((response) => {
                window.location.href = '/home'
                localStorage.setItem('isLoggedIn', 'true')
                localStorage.setItem("username", response.data.message)
            })
            .catch((error) => {
                const logLevel = 'error'; // Define the log level for errors
                const errorMessage = error.message; // Get the error message
                const where = "register"; // Get the error message
                const data1 = {
                    level: logLevel,
                    message: errorMessage,
                    where: where
                }
                axios.post('http://localhost:4000/logs/add', data1)
                    .then((response) => {
                        console.log("done");
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            });
    };

    const handleGoogleLoginFailure = (error) => {
        // Handle Google Sign-In failure
        console.error(error);
    };

    const clickhandle = async () => {
        if (pass === conpass) {
            const Data = {
                Firstname: fname,
                Lastname: lname,
                email: email,
                Username: username,
                password: pass,
                role: "student"
            };

            try {
                const role = "student"
                const existingUsers = await axios.get(`http://localhost:4000/user/getall?role=${role}`);
                console.log('Existing Users:', existingUsers.data);
                const duplicateEmail = existingUsers.data.some(user => user.email === email);
                const duplicateUsername = existingUsers.data.some(user => user.Username === username);

                if (duplicateEmail || duplicateUsername) {
                    alert("Email or Username already exists");
                } else {
                    axios.post('http://localhost:4000/user/register', Data)
                        .then((response) => {
                            window.location.href = '/';
                            console.log('Response:', response.data);
                        })
                        .catch((error) => {
                            const logLevel = 'error'; // Define the log level for errors
                            const errorMessage = error.message; // Get the error message
                            const where = "register"; // Get the error message
                            const data1 = {
                                level: logLevel,
                                message: errorMessage,
                                where: where
                            }
                            axios.post('http://localhost:4000/logs/add', data1)
                                .then((response) => {
                                    console.log("done");
                                })
                                .catch((error) => {
                                    console.log(error)
                                });
                        });
                }
            } catch (error) {
                const logLevel = 'error'; // Define the log level for errors
                const errorMessage = error.message; // Get the error message
                const where = "register"; // Get the error message
                const data1 = {
                    level: logLevel,
                    message: errorMessage,
                    where: where
                }
                axios.post('http://localhost:4000/logs/add', data1)
                    .then((response) => {
                        console.log("done");
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }
        } else {
            alert("Enter the same password");
        }
    };

    return (
        <div classNameName="register_page">
            <div className="bg-gray-100 text-gray-900 flex justify-center">
                <div
                    className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1"
                >
                    <div className="lg:w-1/2 xl:w-5/12 p-4 sm:p-6">
                        <div>
                            <img src="/images/logo2.png" alt="logo" className="w-32 mx-auto rounded-2xl" />
                        </div>
                        <div className="mt-6 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold">
                                Sign up for system
                            </h1>
                            <div className="w-full flex-1 mt-8">
                                <div className="">
                                    <button
                                        className="w-full font-bold shadow-sm rounded-lg text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                                    >
                                        <GoogleLogin
                                            clientId="831070395188-s9jg1ie8v8gp368o5helnhr9nui7j23t.apps.googleusercontent.com"
                                            onSuccess={handleGoogleLoginSuccess}
                                            onFailure={handleGoogleLoginFailure}
                                        />
                                    </button>
                                </div>

                                <div className="my-6 border-b text-center">
                                    <div
                                        className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"
                                    >
                                        Or sign up with e-mail
                                    </div>
                                </div>

                                <div className="mx-auto max-w-xs">
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="name"
                                        required
                                        value={fname}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="First Name"
                                    />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="text"
                                        value={lname}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Last Name"
                                    />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="text"
                                        required
                                        value={username}
                                        onChange={(e) => setUserName(e.target.value)}
                                        placeholder="Username"
                                    />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                    />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password"
                                        required
                                        value={pass}
                                        onChange={(e) => setPass(e.target.value)}
                                        placeholder="Password"
                                    />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password"
                                        required
                                        value={conpass}
                                        onChange={(e) => setconPass(e.target.value)}
                                        placeholder="Confirm Password"
                                    />
                                    <button
                                        className="mt-5 tracking-wide font-semibold bg-[#5c448c] text-gray-100 w-full py-4 rounded-lg hover:bg-[#573896] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" onClick={clickhandle}
                                    >
                                        <svg
                                            className="w-6 h-6 -ml-2"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-3">
                                            Sign Up
                                        </span>
                                    </button>
                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        Already have account?
                                        <a href="/" className="ml-8 border-b border-gray-500 border-dotted">
                                            Login
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-[#5c448c] text-center hidden lg:flex">
                        <div
                            className="w-full bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${process.env.PUBLIC_URL}/images/registerpic.jpeg)`,
                                backgroundSize: 'cover',
                            }}
                        ></div>
                    </div>
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

export default Register;