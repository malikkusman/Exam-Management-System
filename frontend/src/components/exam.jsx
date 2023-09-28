import Footer from "./layout/footer";
import { useState, useEffect } from "react";
import Navbar from "./layout/navbar";
import axios from "axios";
import {
    MDBInput,
} from "mdb-react-ui-kit";

const Modal = ({ children }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
};

const Exam = () => {
    const [showModal, setShowModal] = useState(true);
    const [accessible, setAccessible] = useState(false);
    const [inputs, setInputs] = useState([{ question: '', totalnumber: 0, obtainnumber: 9999, answer: '' }, { question: '', totalnumber: 0, obtainnumber: 9999, answer: '' }]);
    const [data, setdata] = useState([]);
    const handleAddInput = () => {
        setInputs([...inputs, { question: '', totalnumber: 0, obtainnumber: 0, answer: '' }]);
    };
    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newInputs = [...inputs];
        if (newInputs[index]) {
            newInputs[index][name] = value;
            setInputs(newInputs);
        }
    };

    useEffect(() => {
        // Disable access to the content initially
        setAccessible(false);
        fetchData()
    }, []);

    const fetchData = async () => {
        const Category = "exam"
        try {
            const response = await axios.get(`http://localhost:4000/assignment/getbycategory?Category=${Category}`);
            if (response.status !== 200) {
                throw new Error("Request failed.");
            }
            setdata(response.data);
            console.log(response.data)
        } catch (error) {
            const logLevel = 'error'; // Define the log level for errors
            const errorMessage = error.message; // Get the error message
            const where = "student exam"; // Get the error message
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

    const handleStart = () => {
        setAccessible(true); // Enable access to the content
        setShowModal(false); // Hide the modal
    };

    const [answers, setAnswers] = useState([]);

    const handleAnswerChange = (e, index) => {
        const { value } = e.target;
        const newAnswers = [...answers];

        // Update or create the answer object based on the index
        newAnswers[index] = {
            ...newAnswers[index],
            answer: value,
        };

        setAnswers(newAnswers);
    };

    const handleSubmit = async () => {

        const name = data[0].Name
        const description = data[0].Description
        const date = data[0].Date
        const category = data[0].Category
        const username = localStorage.getItem("username")

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('date', date);
        formData.append('category', category);
        formData.append('Marks', data[0].Marks);
        formData.append('file', null);
        formData.append('username', username);
        formData.append('teacher', data[0].TeacherName);


        inputs.forEach((input, index) => {
            formData.append(`inputs[${index}][question]`, data[0].Questions[index].question);
            formData.append(`inputs[${index}][totalnumber]`, data[0].Questions[index].number);
            formData.append(`inputs[${index}][obtainnumber]`, input.obtainnumber);
            formData.append(`inputs[${index}][answer]`, input.answer);
        });

        try {
            const response = await axios.post('http://localhost:4000/stuassignment/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.message === "added") {
                window.location.href = '/home'
            } else if (response.data.message === "already") {
                document.getElementById("desk-error").innerHTML = "Course ALREADY EXIST";
                document.getElementById("desk-error").style.color = "red";
                document.getElementById("desk-error").style.display = "block";
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="exam_page">
            <Navbar />
            {showModal && (
                <Modal>
                    <div className="flex items-center justify-center h-screen">
                        <button className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800" onClick={handleStart}>
                            Start the exam
                        </button>
                    </div>
                </Modal>
            )}
            {!accessible && (
                <div className="content relative mt-16 mb-8 sm:mx-[12%]">
                    {/* Your content before accessing the exam */}
                </div>
            )}
            {accessible && (
                <div className="content relative mt-16 mb-8 sm:mx-[12%]">
                    <h1 className="text-3xl">Exams</h1>
                    <section className="flex justify-center">
                        <div className="flex flex-col w-50">
                            {data.length > 0 ? (
                                data.map((item, iindex) => (
                                    <div key={iindex} className="mb-4">
                                        {item && item.Questions.map((item1, index) => {

                                            return (
                                                <div key={index}>
                                                    <label htmlFor={`question-${index + 1}`}>
                                                        {item1.question}
                                                    </label>
                                                    <textarea
                                                        value={item1.answer}
                                                        onChange={(event) => handleInputChange(index, event)}
                                                        id={`question-${index + 1}`}
                                                        className="border border-gray-300 rounded-md p-2 mt-2 block w-full"
                                                        rows="4"
                                                        name="answer"
                                                        placeholder="Type your answer here..."
                                                    ></textarea>
                                                </div>
                                            )
                                        })}
                                    </div>
                                ))
                            ) : (
                                <p>There are no exams</p>
                            )}
                            {data != "" ? (
                                <button onClick={handleSubmit} className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800" >Submit Exam</button>
                            ) : ""}
                        </div>
                    </section>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Exam;