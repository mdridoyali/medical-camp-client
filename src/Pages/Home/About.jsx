
import "../../Components/Css/featured.css"
import SectionHeading from "../../Components/sectionHeading";

const About = () => {
    return (
        <div>
            <div>
                <div className="py-20 featured-item bg-fixed  mx-auto my-10 md:my-20">
                    <div className=" md:p-20 space-y-3 m-5 md:m-20 p-2  bg-black bg-opacity-60 text-white">
                        <SectionHeading heading={'About Us'} />
                        <p>
                            Welcome to MediCamp Website, where compassion meets healthcare excellence. Established with a commitment to serve and uplift communities, we are a passionate team of healthcare professionals dedicated to making a positive impact on lives through accessible and comprehensive medical camps.
                        </p>
                        <h2 className="text-xl font-bold"> Our Mission:</h2>
                        <p>
                            At MediCamp, our mission is simple yet profound – to bring quality healthcare closer to those who need it most. We believe in the power of community-driven health initiatives, and our medical camps are designed to address the diverse health needs of individuals from all walks of life.
                        </p>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default About;