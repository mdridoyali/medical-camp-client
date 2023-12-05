
import SectionHeading from "../../../Components/sectionHeading";
import { Helmet } from 'react-helmet-async';
// import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";



const ManageUpcomingCamps = () => {

    // const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: payment = [], refetch } = useQuery({
        queryKey: ['upcoming-camp',],
        queryFn: async () => {
            const res = await axiosSecure.get('/upcoming-camp')
            return res.data
        }
    })
    console.log(payment)

    const handleDelete = (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-upcoming-camp/${id}`)
                    .then(res => {
                        refetch()
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            toast.success('Delete Successful')
                        }
                    })
            }
        })
    }

    // const handleConfirm = async (id) => {
    //     console.log(id)
    //     const res = await axiosSecure.patch(`/payment/${id}`, { confirmationStatus: "confirmed", paymentStatus: 'paid' })
    //     if (res.data.modifiedCount > 0) {
    //         toast.success('Confirmed Successful')
    //         refetch()
    //     }
    //     refetch()
    // }


    return (
        <div className="mb-14 overflow-x-scroll ">
        <Helmet>
            <title>MediCamp | Manage Upcoming Camps</title>
        </Helmet>
        <SectionHeading heading={'Manage Upcoming Camps'} />

        <div className="">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Camp Name</th>
                        <th>Date & Time</th>
                        <th>Venue</th>
                        <th>Targeted Audience</th>
                        <th>Participant Count</th>
                        <th>Interested Professional</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {payment.map((item) => (
                        <tr key={item._id}>
                            <td>{item.campName}</td>
                            <td>{item.scheduleDate}</td>
                            <td>{item.location}</td>
                            <td>${item.audience}</td>
                            <td>{item.participantCount}</td>
                            <td>{item.interestedPro}</td>
                            <td>{item.paymentStatus !== 'paid' ? <button onClick={() => handleDelete(item._id)} className="btn btn-sm bg-orange-500 text-white "><FaTrash/></button> : <button disabled className="btn btn-sm bg-lime-500 ">Cancel</button>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default ManageUpcomingCamps;