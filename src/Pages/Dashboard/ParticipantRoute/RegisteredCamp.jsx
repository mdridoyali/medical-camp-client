import { Helmet } from "react-helmet-async";
import SectionHeading from "../../../Components/sectionHeading";
import Loading from "../../../Components/Loading";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
// import PaymentHistory from "./Payment/PaymentHistory";


const RegisteredCamp = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()


    const { data: campInfo = [], isLoading, refetch } = useQuery({
        queryKey: ['registered-camp', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/registered-camp/${user?.email}`)
            return res.data
        }
    })
    console.log(campInfo)


    const handleDelete = (id) => {
        console.log(id)
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
                axiosSecure.delete(`/registered-camp/${id}`)
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

    if (isLoading) <Loading />
    return (
        <div>
            {/* <PaymentHistory id={} /> */}
            <Helmet><title>MediCamp | Registered Camp</title></Helmet>
            <SectionHeading heading={'Registered Camp'} ></SectionHeading>
            <h2 className="text-center mb-7 text-2xl" >TOTAL REGISTERED CAMPS {campInfo.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>CAMP NAME</th>
                            <th>DATE & TIME</th>
                            <th>VENUE LOCATION</th>
                            <th>CAMP FEES </th>
                            <th>CONFIRMATION STATUS</th>
                            <th>PAYMENT STATUS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(campInfo) && campInfo.map(camp => <tr key={camp._id}>
                            <td>{camp.campName}</td>
                            <td>{camp.scheduleDate}</td>
                            <td>{camp.location}</td>
                            <td>{camp.campFees}</td>
                            <td>{camp.confirmationStatus}</td>
                            <td>{camp.paymentStatus === 'paid' ? <Link to={`/dashboard/payment/${camp._id}`} disabled className="btn btn-sm ">Paid</Link> : <Link to={`/dashboard/payment/${camp._id}`} className="btn btn-sm">pay</Link>}</td>
                            <td> <button onClick={() => handleDelete(camp._id)} className="btn btn-sm bg-orange-500 text-white "><FaTrash ></FaTrash></button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegisteredCamp;