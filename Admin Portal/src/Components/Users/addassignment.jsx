import React, { useEffect, useState } from "react";
import axios from 'axios';
import Sidebar from "./sidebar";
import Header from "./navbar";
import {
    MDBBtn,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBTextArea,
    MDBSpinner,
} from "mdb-react-ui-kit";

export default function Addassignment() {
    const [submit, setSubmit] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [inputs, setInputs] = useState([{ question: '', number: 0 }]);
    const [totalNumber, setTotalNumber] = useState(0);
    useEffect(() => {
        // Calculate total number whenever inputs change
        const calculatedTotalNumber = inputs.reduce((total, currentValue) => {
            return total + parseInt(currentValue.number || 0, 10); // Ensure to parse 'number' as an integer
        }, 0);
        setTotalNumber(calculatedTotalNumber); // Update the total number state
    }, [inputs]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmit(true);

        let Marks = 0;
        if (
            document.getElementById("category")?.value === "assignment" ||
            document.getElementById("category")?.value === "quiz" ||
            document.getElementById("category")?.value === ""
        ) {
            Marks = document.getElementById("number")?.value ?? '';
        } else {
            Marks = totalNumber;
        }

        const name = document.getElementById("name")?.value ?? '';
        const description = document.getElementById("description")?.value ?? '';
        const date = document.getElementById("date")?.value ?? '';
        const category = document.getElementById("category")?.value ?? '';
        const fileInput = document.getElementById('file');
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            const username = localStorage.getItem("teacher")
            const file = fileInput.files[0];
            // Work with the 'file' object here
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('date', date);
            formData.append('category', category);
            formData.append('Marks', Marks);
            formData.append('file', file);
            formData.append('teacher', username);

            inputs.forEach((input, index) => {
                formData.append(`inputs[${index}][question]`, input.question);
                formData.append(`inputs[${index}][number]`, input.number);
            });

            try {
                const response = await axios.post('http://localhost:4000/assignment/add', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.message === "added") {
                    window.location.href = "/create-assignment";
                } else if (response.data.message === "already") {
                    setSubmit(false);
                    document.getElementById("desk-error").innerHTML = "Course ALREADY EXIST";
                    document.getElementById("desk-error").style.color = "red";
                    document.getElementById("desk-error").style.display = "block";
                }
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            const username = localStorage.getItem("teacher")
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('date', date);
            formData.append('category', category);
            formData.append('Marks', Marks);
            formData.append('file', null);
            formData.append('teacher', username);

            inputs.forEach((input, index) => {
                formData.append(`inputs[${index}][question]`, input.question);
                formData.append(`inputs[${index}][number]`, input.number);
            });

            try {
                const response = await axios.post('http://localhost:4000/assignment/add', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.message === "added") {
                    window.location.href = "/create-assignment";
                } else if (response.data.message === "already") {
                    setSubmit(false);
                    document.getElementById("desk-error").innerHTML = "Course ALREADY EXIST";
                    document.getElementById("desk-error").style.color = "red";
                    document.getElementById("desk-error").style.display = "block";
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };





    const handleInputChange = (index, event) => {
        const values = [...inputs];
        values[index][event.target.name] = event.target.value;
        setInputs(values);
    };

    const addMoreInputs = () => {
        console.log(inputs)
        setInputs([...inputs, { question: '', number: 0 }]);
    };



    return (
        <div style={{ width: "100%", display: "flex" }}>
            <div style={{ width: "22%" }}>
                <Sidebar />
            </div>
            <div style={{ width: "83%" }}>
                <Header />
                <h3
                    style={{
                        fontWeight: "bold",
                        fontFamily: "Bahnschrift",
                        textAlign: "left",
                        marginTop: "15px",
                        marginLeft: "30px",
                    }}
                >
                    Add Assignment
                </h3>
                <center>
                    <MDBCol md="7">
                        <MDBCard className="my-5">
                            <form
                                onSubmit={handleSubmit}
                            >
                                <MDBCardBody className="p-5">
                                    <select
                                        className="form-select mb-4"
                                        id="category"
                                        name="category"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="assignment">Assignment</option>
                                        <option value="quiz">Quiz</option>
                                        <option value="exam">Exam</option>

                                        {/* Add more options as needed */}
                                    </select>
                                    {
                                        (selectedCategory === "assignment" || selectedCategory === "quiz" || selectedCategory === "") ? (
                                            <>
                                                <MDBInput
                                                    wrapperClass="mb-4"
                                                    label="Name"
                                                    name="name"
                                                    id="name"
                                                    type="text"
                                                    required
                                                />
                                                <MDBTextArea label='Description' id='description' rows={4} />
                                                <MDBInput
                                                    wrapperClass="mt-4"
                                                    name="date"
                                                    id="date"
                                                    type="date"
                                                    required
                                                />
                                                <MDBInput
                                                    wrapperClass="mt-4"
                                                    name="file"
                                                    id="file"
                                                    type="file"
                                                    required
                                                />
                                                <MDBInput
                                                    wrapperClass="mt-4"
                                                    label="Numbers"
                                                    name="number"
                                                    id="number"
                                                    type="text"
                                                    required
                                                />
                                            </>
                                        ) : (
                                            <div>
                                                <MDBInput
                                                    wrapperClass="mb-4"
                                                    label="Name"
                                                    name="name"
                                                    id="name"
                                                    type="text"
                                                    required
                                                />
                                                <MDBTextArea label='Description' id='description' rows={4} />
                                                <MDBInput
                                                    wrapperClass="mt-4 mb-4"
                                                    name="date"
                                                    id="date"
                                                    type="date"
                                                    required
                                                />
                                                {inputs.map((input, index) => (
                                                    <div key={index}>
                                                        <MDBInput
                                                            wrapperClass="mb-4"
                                                            label={`Question ${index + 1}`}
                                                            name="question"
                                                            id={`question${index}`}
                                                            type="text"
                                                            value={input.question}
                                                            onChange={(event) => handleInputChange(index, event)}
                                                            required
                                                        />
                                                        <MDBInput
                                                            wrapperClass="mb-4"
                                                            label={`Number ${index + 1}`}
                                                            name="number"
                                                            id={`number${index}`}
                                                            type="number"
                                                            value={input.number}
                                                            onChange={(event) => handleInputChange(index, event)}
                                                            required
                                                        />
                                                    </div>
                                                ))}

                                                <MDBBtn
                                                    onClick={addMoreInputs}
                                                    className="w-100 mb-4"
                                                    size="md"
                                                    style={{
                                                        backgroundColor: '#3c4763',
                                                        color: 'white',
                                                    }}
                                                >
                                                    Add More
                                                </MDBBtn>
                                            </div>
                                        )
                                    }
                                    <br />
                                    <MDBBtn
                                        type="submit"
                                        className="w-100 mb-4"
                                        size="md"
                                        style={{
                                            backgroundColor: "#3c4763",
                                            color: "white",
                                        }}
                                    >
                                        {submit ? <MDBSpinner style={{ color: "white" }}></MDBSpinner> : <span>Add Exam</span>}
                                    </MDBBtn>
                                </MDBCardBody>
                            </form>
                        </MDBCard>
                    </MDBCol>
                </center>
            </div>
        </div>
    );
}
