import SectionHeading from "../../../Components/sectionHeading";
import { Helmet } from 'react-helmet-async';
import useAuth from "../../../Hooks/useAuth";
import Testimonials from "../../Home/Testimonials";
import SuccessfulCamps from "../../../Components/SuccessfulCamps";
import { FaUpload } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserData from "../../../Components/UserProfile/UserData";


const OrganizerProfile = () => {
    const { user } = useAuth()
    const [userData] = UserData()
    const { email, name, userImg, address, mobile, role } = userData
    console.log(email)
    return (
        <div className="mb-14">
            <Helmet>
                <title>MediCamp | Organizer Profile</title>
            </Helmet>
            <SectionHeading heading={'Organizer profile'} ></SectionHeading>

            <div className="flex justify-end">
                <Link to={'/dashboard/update-profile'} className=" btn btn-sm bg-lime-500 text-white">
                    Update<FaUpload />
                </Link>
            </div>


            <div className="grid  my-5 lg:grid-cols-3 px-3 mx-auto text-center">
                <div className=" mx-auto gap-5 h-fit w-full justify-center">
                    <div className="flex gap-5 justify-between">
                        <div className="p-4 bg-green-200 rounded-2xl h-fit w-full ">
                            <p>Name</p>
                            <h2 className="text-xl font-semibold">{name}</h2>
                        </div>
                        <div className="p-4 bg-lime-200 rounded-2xl h-fit w-full ">
                            <p>Role</p>
                            <h2 className="text-xl capitalize font-semibold">{role}</h2>
                        </div>
                    </div>
                    <div className="p-4 mt-5 bg-orange-200 text-center rounded-2xl h-fit w-full ">
                        <p>User Id</p>
                        <h2 className=" font-semibold">{user?.uid}</h2>
                    </div>
                </div>
                <div className="mx-auto-  text-center">
                    <img className="mx-auto rounded-full w-44 h-44 p-1 m-5 border-4 border-purple-400 " src={userImg} />
                </div>
                <div className=" mx-auto h-fit ">
                    <div className="flex gap-5">
                        <div className="p-4 bg-sky-200 rounded-2xl h-fit w-fit ">
                            <p>Address</p>
                            <h2 className="text-xl font-semibold">{address}</h2>
                        </div>
                        <div className="p-4 bg-violet-300 rounded-2xl h-fit w-fit ">
                            <p>Mobile</p>
                            <h2 className="text-xl font-semibold">{mobile}</h2>
                        </div>
                    </div>
                    <div className="p-4 mt-5 bg-fuchsia-200 text-center rounded-2xl h-fit w-full  ">
                        <p>Email</p>
                        <h2 className=" text-xl font-semibold">{user?.email}</h2>
                    </div>
                </div>
            </div>
            <hr />
            <Testimonials />
            <hr />

            <SuccessfulCamps />


        </div>
    );
};

export default OrganizerProfile;