import Footer from "./layout/footer";
import Navbar from "./layout/navbar";

const Exam = () => {
    return (
        <div className="exam_page">
            <Navbar />
            <div className="content relative mt-16 mb-8 sm:mx-[12%]">   
            <h1 className="text-3xl">Exams</h1>
                <section class="radio-section">
                    <div class="radio-list">
                        <h1>Which Social Media you Often use?</h1>
                        <div class="radio-item"><input name="radio" id="radio1" type="radio" /><label for="radio1">INSTAGRAM</label></div>
                        <div class="radio-item"><input name="radio" id="radio2" type="radio" /><label for="radio2">TWITTER</label></div>
                        <div class="radio-item"><input name="radio" id="radio3" type="radio" /><label for="radio3">LINKEDIN</label></div>
                        <div class="radio-item"><input name="radio" id="radio4" type="radio" /><label for="radio4">FACEBOOK</label></div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default Exam;