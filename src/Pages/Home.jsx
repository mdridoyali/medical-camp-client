import { Helmet } from "react-helmet-async";
import Banner from "../Components/Banner";
import Testimonials from "./Home/Testimonials";
import PopularCamp from "./Home/PopularCamp";
import UpcomingCamps from "./Home/UpcomingCamps";
// import Featured from "./Home/Featured";
import NewsLetter from "./Home/NewsLetter";
import About from "./Home/About";


const Home = () => {
    return (
        <div className="min-h-[60vh]">
            <Helmet><title>MediCamp</title></Helmet>
            <Banner />
            <PopularCamp />
            <Testimonials/>
            <UpcomingCamps/>
            <About/>
            <NewsLetter/>

        </div>
    );
};

export default Home;


