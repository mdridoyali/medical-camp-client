import { Helmet } from "react-helmet-async";
import SectionHeading from "../../../Components/sectionHeading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaPen, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading";
import useAuth from "../../../Hooks/useAuth";


const ManageCamp = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()


    const { data: camps = [], refetch, isLoading } = useQuery({
        queryKey: ['all-camps', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-camps/${user?.email}`)
            return res.data
        }
    })
    console.log(camps)

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/camp/${id}`)
                    .then(res => {
                        refetch()
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            toast.success('Deleted Successful')
                        }
                    })
            }
        })
    }
    if (isLoading) return <Loading />

    return (
        <div className="md:px-3 mb-14">
            <Helmet>
                <title>MediCamp | Manage Camp</title>
            </Helmet>
            <SectionHeading heading={'Manage camps'}></SectionHeading>
            <h2 className="text-center font-semibold text-xl mb-5">TOTAL CAMPS {camps.length}</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="hidden md:table-cell">SERIAL</th>
                            <th>CAMP NAME</th>
                            <th className="">SCHEDULE DATE</th>
                            <th className="hidden md:table-cell">VENUE LOCATION</th>
                            <th>UPDATE</th>
                            <th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {camps.map((user, idx) => (
                            <tr key={idx}>
                                <td className="hidden md:table-cell">{idx + 1}</td>
                                <td>{user.campName}</td>
                                <td className="">{user.scheduleDate}</td>
                                <td className="hidden md:table-cell">{user.location}</td>
                                <td>
                                    <Link to={`/dashboard/update-camp/${user._id}`} className="btn text-xl btn-ghost btn-xs">
                                        <FaPen className="text-green-600"></FaPen>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(user._id)} className="btn btn-sm bg-orange-500 text-white ">
                                        <FaTrash ></FaTrash>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCamp;