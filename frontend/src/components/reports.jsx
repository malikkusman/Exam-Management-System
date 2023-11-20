import Footer from "./layout/footer";
import Navbar from "./layout/navbar";

const Reports = () => {
    return (
        <div className="reports_page">
            <Navbar />
            <div className="content flex flex-col justify-center items-center">
                <h1>Reports</h1>
                <div className="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md">
                    <div className="mt-2">
                        <a className="text-2xl text-gray-700 font-bold hover:text-gray-600" href="/">
                            Report
                        </a>
                        <p className="mt-2 text-gray-600">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque.
                            Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!
                        </p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <a className="text-blue-600 hover:underline" href="/">
                            Download
                        </a>
                        <div>
                            <a className="flex items-center" href="/">
                                <img
                                    className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                                    src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80"
                                    alt="avatar"
                                />
                                <h1 className="text-gray-700 font-bo    ld">Khatab wedaa</h1>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
 
export default Reports;