import { useEffect, useState } from "react";
import Footer from "./layout/footer";
import Navbar from "./layout/navbar";
import axios from "axios"
import {
    Carousel,
    initTE,
} from "tw-elements";

initTE({ Carousel });


const Home = () => {
    const [course, setcourse] = useState([])
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/course/get');

            if (response.status !== 200) {
                throw new Error("Request failed.");
            }
            setcourse(response.data);
        } catch (error) {
            const logLevel = 'error'; // Define the log level for errors
            const errorMessage = error.message; // Get the error message
            const where = "student course"; // Get the error message
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
    const cardData = [
        {
            title: 'Artificial Intelligence',
            category: 'Condominium',
            size: '1,386 sq. ft.',
            pricePerSqFt: '$1.98 /sq.ft',
            agent: 'John Doe',
            // Other properties for the first card...
        },
        {
            title: 'Artificial Intelligence',
            category: 'Condominium',
            size: '1,386 sq. ft.',
            pricePerSqFt: '$1.98 /sq.ft',
            agent: 'John Doe',
            // Other properties for the second card...
        },
        // Add more objects for additional cards...
    ];

    return (
        <div className="home_page">
            <Navbar />
            <div className="content relative sm:mx-[12%]">
                <div
                    id="carouselExampleCaptions"
                    className="relative"
                    data-te-carousel-init
                    data-te-ride="carousel">
                    <div
                        className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
                        data-te-carousel-indicators>
                        <button
                            type="button"
                            data-te-target="#carouselExampleCaptions"
                            data-te-slide-to="0"
                            data-te-carousel-active
                            className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                            aria-current="true"
                            aria-label="Slide 1"></button>
                        <button
                            type="button"
                            data-te-target="#carouselExampleCaptions"
                            data-te-slide-to="1"
                            className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                            aria-label="Slide 2"></button>
                        <button
                            type="button"
                            data-te-target="#carouselExampleCaptions"
                            data-te-slide-to="2"
                            className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                            aria-label="Slide 3"></button>
                    </div>

                    <div
                        className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">

                        <div
                            className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                            data-te-carousel-active
                            data-te-carousel-item
                            style={{ backfaceVisibility: "hidden" }}>
                            <img
                                src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg"
                                className="block w-full"
                                alt="..." />
                            <div
                                className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                                <h5 className="text-xl">Work hard for your country</h5>
                                <p>
                                    Success is built on the effort of individuals working together for the prosperity and progress of their nation.
                                </p>
                            </div>
                        </div>
                        <div
                            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                            data-te-carousel-item
                            style={{ backfaceVisibility: "hidden" }}>
                            <img
                                src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg"
                                className="block w-full"
                                alt="..." />
                            <div
                                className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                                <h5 className="text-xl">Help others</h5>
                                <p>
                                    National progress flourishes in the soil of collective dedication, where each individual's hard work cultivates the growth of a stronger, brighter future.
                                </p>
                            </div>
                        </div>
                        <div
                            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                            data-te-carousel-item
                            style={{ backfaceVisibility: "hidden" }}>
                            <img
                                src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg"
                                className="block w-full"
                                alt="..." />
                            <div
                                className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                                <h5 className="text-xl">Make goals behind your approach</h5>
                                <p>
                                    A nation's strength lies not just in its resources but in the relentless dedication of its people, tirelessly working for the betterment of their country.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                        type="button"
                        data-te-target="#carouselExampleCaptions"
                        data-te-slide="prev">
                        <span className="inline-block h-8 w-8">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="h-6 w-6">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </span>
                        <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Previous</span>
                    </button>
                    <button
                        className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                        type="button"
                        data-te-target="#carouselExampleCaptions"
                        data-te-slide="next">
                        <span className="inline-block h-8 w-8">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="h-6 w-6">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </span>
                        <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Next</span>
                    </button>
                </div>
                <div className="my-16">
                    <h1 className="text-3xl">Courses</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                        {course && course.map((card, index) => (
                            <div key={card._id} className="relative mx-auto w-full">
                                <a href="/" className="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                                    <div className="shadow p-4 rounded-lg bg-white">
                                        <div class="flex justify-center relative rounded-lg overflow-hidden h-52">
                                            <div class="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                                                <div class="">
                                                    <img src="https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg?w=590&h=800&D80F3D79-4382-49FA-BE4B4D0C62A5C3ED" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="mt-4">
                                            <h2 className="font-medium text-base md:text-lg text-gray-800 line-clamp-1" title={card.Course}>
                                                {card.Course}
                                            </h2>
                                            <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                                                {card.Description}
                                            </p>
                                        </div>
                                        <div class="grid grid-cols-2 mt-8">
                                            <div class="flex justify-around items-end">
                                                <div class="relative">
                                                    <div class="rounded-full w-6 h-6 md:w-8 md:h-8">
                                                        <img src="/images/teacher.png" alt="" />
                                                    </div>
                                                </div>
                                                <p class="ml-2 text-gray-800">
                                                    {card.INSTname}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;