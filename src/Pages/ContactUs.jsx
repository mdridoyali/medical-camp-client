import { Helmet } from "react-helmet-async";
import SectionHeading from "../Components/sectionHeading";
import toast from "react-hot-toast";


const ContactUs = () => {

    const handleToast = (e) => {
        e.preventDefault();
        toast.success('Your Message Submitted')
        e.target.reset()
    }

    return (
        <div className="min-h-[60vh] mt-14 mb-20">
            <Helmet><title>MediCamp | ContactUs Camp</title></Helmet>
            <div className="md:flex gap-10 md:w-9/12 items-center justify-center p-3 mx-auto">
                <form onSubmit={handleToast} className="flex flex-1  flex-col space-y-5">
                    <SectionHeading heading={'Contact us'} ></SectionHeading>
                    <input type="text" placeholder="Name" className="bordered input border rounded-full bg-slate-100 p-4  " />
                    <input type="email" placeholder="Email" className="bordered input border rounded-full bg-slate-100 p-4  " />
                    <textarea placeholder="Write your Message" className=" rounded-full bg-slate-100 p-4 h-20  "></textarea>
                    <input type="submit" className="btn border rounded-full bg-slate-100 p-4  " />
                </form>
                <div className="flex-1 mt-10">
                    <img className="w-full" src={'https://img.freepik.com/free-photo/portrait-entrepreneur-talking-phone_23-2148499839.jpg?size=626&ext=jpg&uid=R119605278&ga=GA1.1.132439167.1700879951&semt=ais'} />
                </div>
            </div>

        </div>
    );
};

export default ContactUs;