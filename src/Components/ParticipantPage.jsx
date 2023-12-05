import { FaHome, FaMinus } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import UserData from "./UserProfile/UserData";


const ParticipantPage = () => {
    const { user, logOutUser } = useAuth()
    const [userData]= UserData()
    return (
        <div className="drawer-content">
            <ul className="menu px-4 w-72 min-h-screen space-y-5 bg-base-200 text-base-content">
                {/* Sidebar content here */}
                <div className='flex justify-end'> <label htmlFor="my-drawer-2" aria-label="close sidebar" className=" btn btn-sm md:hidden rounded-full bg-base-100 w-11 h-11 text-xl drawer-overlay"><FaMinus /></label></div>
                <Link to={'/'} className="flex items-center ">
                    <img
                        className="w-10 h-10"
                        src={"https://i.ibb.co/NWnH0Jj/Screenshot-7-removebg-preview.png"}
                    />
                    <h1 className="text-transparent text-4xl font-bold bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
                        MediCamp
                    </h1>
                </Link>
                <NavLink
                    to={"/dashboard/participant-profile"}
                    className={({ isActive }) =>
                        isActive
                            ? "btn bg-lime-600 rounded-full text-white"
                            : "btn btn-ghost  btn-active rounded-full  btn-sm "
                    }
                >
                    Participant Profile
                </NavLink>
                <NavLink
                    to={"/dashboard/registered-camps"}
                    className={({ isActive }) =>
                        isActive
                            ? "btn bg-lime-600 rounded-full text-white"
                            : "btn btn-ghost  btn-active rounded-full   btn-sm "
                    }
                >
                    Registered Camps
                </NavLink>
                <NavLink
                    to={"/dashboard/payment-history"}
                    className={({ isActive }) =>
                        isActive
                            ? "btn bg-lime-600 rounded-full text-white"
                            : "btn btn-ghost  btn-active rounded-full   btn-sm "
                    }
                >
                    Payment History
                </NavLink>
                <NavLink
                    to={"/dashboard/feedback"}
                    className={({ isActive }) =>
                        isActive
                            ? "btn bg-lime-600 rounded-full text-white"
                            : "btn btn-ghost  btn-active rounded-full   btn-sm "
                    }
                >
                    Feedback and Rating
                </NavLink>

                <hr />
                <Link to={"/"} className="btn btn-outline rounded-full flex items-center gap-5 justify-center text-xl "><FaHome /> <p >  Home </p></Link>
                <div className="flex gap-3 items-center text-base font-semibold">
                    <img src={userData?.userImg} className="rounded-full w-14 h-14" />
                    <div>
                        <p>{userData?.name}</p>
                        <p>{userData?.email}</p>
                    </div>
                </div>
                <button onClick={() => logOutUser()} className="btn btn-sm  bg-lime-600  w-20 text-white ">Logout</button>

            </ul>

        </div>
    );
};

export default ParticipantPage;