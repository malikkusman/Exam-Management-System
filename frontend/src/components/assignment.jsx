import Footer from "./layout/footer";
import Navbar from "./layout/navbar";
import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Modal = ({ data, showModal, setShowModal, updateSubmitAtIndex, index }) => {
    const [files, setFile] = useState(null);
    const [inputs, setInputs] = useState([{ question: '', number: 0 }]);
    const [selectedFileName, setSelectedFileName] = useState('');
    useEffect(() => {
        console.log(data)
    }, []); // State to display selected file name

    const handleDrop = (event) => {
        event.preventDefault();
        const newFile = event.dataTransfer.files[0]; // Grab only the first dropped file
        setFile(newFile);
        setSelectedFileName(newFile.name);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
    };

    const handleFileInputChange = (event) => {
        const newFile = event.target.files[0]; // Grab only the first selected file
        setFile(newFile);
        setSelectedFileName(newFile.name);
    };

    const handleSubmit = async () => {

        const name = data.Name
        const description = data.Description
        const date = data.Date
        const category = data.Category
        const username = localStorage.getItem("username")

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('date', date);
        formData.append('category', category);
        formData.append('Marks', data.Marks);
        formData.append('file', files);
        formData.append('username', username);
        formData.append('teacher', data.TeacherName);


        inputs.forEach((input, index) => {
            formData.append(`inputs[${index}][question]`, input.question);
            formData.append(`inputs[${index}][number]`, input.number);
        });

        try {
            const response = await axios.post('http://localhost:4000/stuassignment/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.message === "added") {
                updateSubmitAtIndex(index, 1)
            } else if (response.data.message === "already") {
                document.getElementById("desk-error").innerHTML = "Course ALREADY EXIST";
                document.getElementById("desk-error").style.color = "red";
                document.getElementById("desk-error").style.display = "block";
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    const handleUpload = () => {
        // Handle file upload logic
        console.log(files) // Reset file name display
        setShowModal(false);
        handleSubmit()
    };

    const handleCancel = () => {
        setFile(null);
        setSelectedFileName('');
        setShowModal(false);
    };

    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ${showModal ? '' : 'hidden'}`}>
            <div class="bg-gray-500 h-screen w-screen sm:px-8 md:px-16 sm:py-8">
                <main class="container mx-auto max-w-screen-lg h-full">
                    <article
                        aria-label="File Upload Modal"
                        className="relative h-full flex flex-col bg-white shadow-xl rounded-md"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                    >
                        <div id="overlay" class="w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md">
                            <i>
                                <svg class="fill-current w-12 h-12 mb-3 text-blue-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
                                </svg>
                            </i>
                            <p class="text-lg text-blue-700">Drop files to upload</p>
                        </div>

                        <section class="h-full overflow-auto p-8 w-full h-full flex flex-col">
                            <header class="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                                <p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                                    <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
                                </p>
                                <input
                                    id="hidden-input"
                                    name="file"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileInputChange}
                                />
                                <button
                                    id="button"
                                    className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                                    onClick={() => document.getElementById('hidden-input').click()} // Trigger file input click
                                >
                                    Upload a file
                                </button>
                            </header>

                            {selectedFileName && <p>{selectedFileName}</p>} {/* Display selected file name */}

                            <ul id="gallery" class="flex flex-1 flex-wrap -m-1">
                                <li id="empty" class="h-full w-full text-center flex flex-col items-center justify-center items-center">
                                    <img class="mx-auto w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
                                    <span class="text-small text-gray-500">No files selected</span>
                                </li>
                            </ul>
                        </section>

                        <footer class="flex justify-end px-8 pb-8 pt-4">
                            <button
                                id="submit"
                                className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
                                onClick={handleUpload}
                            >
                                Upload now
                            </button>
                            <button
                                id="cancel"
                                className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>

                        </footer>
                    </article>
                </main>
            </div>

            <template id="file-template">
                <li class="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
                    <article tabindex="0" class="group w-full h-full rounded-md focus:outline-none focus:shadow-outline elative bg-gray-100 cursor-pointer relative shadow-sm">
                        <img alt="upload preview" class="img-preview hidden w-full h-full sticky object-cover rounded-md bg-fixed" />

                        <section class="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                            <h1 class="flex-1 group-hover:text-blue-800"></h1>
                            <div class="flex">
                                <span class="p-1 text-blue-800">
                                    <i>
                                        <svg class="fill-current w-4 h-4 ml-auto pt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                                        </svg>
                                    </i>
                                </span>
                                <p class="p-1 size text-xs text-gray-700"></p>
                                <button class="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md text-gray-800">
                                    <svg class="pointer-events-none fill-current w-4 h-4 ml-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path class="pointer-events-none" d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
                                    </svg>
                                </button>
                            </div>
                        </section>
                    </article>
                </li>
            </template>

            <template id="image-template">
                <li class="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
                    <article tabindex="0" class="group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm">
                        <img alt="upload preview" class="img-preview w-full h-full sticky object-cover rounded-md bg-fixed" />

                        <section class="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                            <h1 class="flex-1"></h1>
                            <div class="flex">
                                <span class="p-1">
                                    <i>
                                        <svg class="fill-current w-4 h-4 ml-auto pt-" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
                                        </svg>
                                    </i>
                                </span>

                                <p class="p-1 size text-xs"></p>
                                <button class="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md">
                                    <svg class="pointer-events-none fill-current w-4 h-4 ml-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path class="pointer-events-none" d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
                                    </svg>
                                </button>
                            </div>
                        </section>
                    </article>
                </li>
            </template>
        </div>
    );
};

const Assignment = () => {
    const [submit, setsubmit] = useState([]);
    const [files, setFiles] = useState([]);
    const [data, setdata] = useState([]);
    const [udata, setudata] = useState([]);
    const [index, setindex] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const username = localStorage.getItem("username")

    useEffect(() => {
        fetchData()
    }, []);


    const fetchData = async () => {
        const Category = "assignment"
        try {
            const response = await axios.get(`http://localhost:4000/assignment/getbycategory?Category=${Category}`);
            if (response.status !== 200) {
                throw new Error("Request failed.");
            }
            const fetchedData = response.data;
            setdata(fetchedData);
            setsubmit(new Array(fetchedData.length).fill(0));
        } catch (error) {
            const logLevel = 'error'; // Define the log level for errors
            const errorMessage = error.message; // Get the error message
            const where = "student assignment"; // Get the error message
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
    const updateSubmitAtIndex = (index, value) => {
        setsubmit(prevSubmit => {
            const updatedSubmit = [...prevSubmit]; // Create a copy of the 'submit' array
            updatedSubmit[index] = value; // Update the value at the specified index
            return updatedSubmit; // Set the state with the updated array
        });
    };
    const addFile = (file) => {
        const isImage = file.type.match('image.*');
        const objectURL = URL.createObjectURL(file);

        const newFiles = { ...files };
        newFiles[objectURL] = file;
        setFiles(newFiles);
    };

    const handleFileInputChange = (e) => {
        for (const file of e.target.files) {
            addFile(file);
        }
    };

    // Other event handlers can be similarly converted...

    const handleSubmit = () => {
        alert(`Submitted Files:\n${JSON.stringify(files)}`);
        console.log(files);
    };

    const handleClearSelection = () => {
        setFiles({});
    };

    const handleupload = (d, index) => {
        setShowModal(true)
        setudata(d)
        setindex(index)
    }

    return (
        <div className="assign_page">
            <Navbar />
            <div className="content flex flex-col mt-16 mb-8 justify-center items-center sm:mx-[12%]">
                <h1 className="text-3xl">Assignments</h1>
                <Modal data={udata} showModal={showModal} setShowModal={setShowModal} updateSubmitAtIndex={updateSubmitAtIndex} index={index} />
                <div className="w-full max-w-4xl">
                    {data && data.map((d, index) => (
                        <div key={d._id} className="px-10 bg-white rounded-lg shadow-md">
                            <div className="flex justify-between items-center">
                                <span className="font-light text-gray-600">{d.Date}</span>
                                <a className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500 cursor-pointer" onClick={() => handleupload(d, index)} >
                                    {submit[index] == 1 ? "Submitted" : "Upload"}
                                </a>
                            </div>
                            <div className="mt-2">
                                <a className="text-2xl text-gray-700 font-bold hover:text-gray-600" href="/">
                                    {d.Name}
                                </a>
                                <p className="mt-2 text-gray-600">
                                    {d.Description}
                                </p>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <a className="text-blue-600 hover:underline" href={`http://localhost:4000/images/${d.File}`} download="assignment.pdf">
                                    Download
                                </a>
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
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Assignment;