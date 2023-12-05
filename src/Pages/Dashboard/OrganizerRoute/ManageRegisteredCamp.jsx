import SectionHeading from "../../../Components/sectionHeading";
import { Helmet } from 'react-helmet-async';
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManageRegisteredCamp = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: payment = {}, refetch } = useQuery({
        queryKey: ['registered-camp-organizer', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/registered-camp-organizer/${user?.email}`)
            return res.data
        }
    })
    console.log(payment)
    if (!Array.isArray(payment)) {
        console.error('Unexpected data type for payment:', typeof payment);
        return null;
      }

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
                axiosSecure.delete(`/registered-camp-organizer/${id}`)
                    .then(res => {
                        refetch()
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            toast.success('Cancel Successful')
                        }
                    })
            }
        })
    }

    const handleConfirm = async (id) => {
        console.log(id)
        const res = await axiosSecure.patch(`/payment/${id}`, { confirmationStatus: "confirmed", paymentStatus: 'paid' })
        if (res.data.modifiedCount > 0) {
            toast.success('Confirmed Successful')
            refetch()
        }
        const historyRes = await axiosSecure.patch(`/payment-history/${id}`, { confirmationStatus: "confirmed" })
        if (historyRes.data.modifiedCount > 0) {
            toast.success('Confirmed Successful')
            refetch()
        }
        refetch()
    }


    return (
        <div className="mb-14">
            <Helmet>
                <title>MediCamp | Manage Register Camps</title>
            </Helmet>
            <SectionHeading heading={'Manage Registered Camps'} />

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Camp Name</th>
                            <th>Date & Time</th>
                            <th>Venue</th>
                            <th>Camp Fees</th>
                            <th>Payment Status</th>
                            <th>Confirmation Status</th>
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
                                <td>${item.campFees}</td>
                                <td>{item.paymentStatus}</td>
                                <td>{item.paymentStatus === 'unpaid' ?
                                    <button disabled className={"btn btn-sm  text-white "}>{item.confirmationStatus}</button>
                                    :
                                    <>
                                        <button onClick={() => handleConfirm(item._id)} className={item.confirmationStatus !== 'confirmed' ? " rounded-md btn-sm text-base font-semibold bg-orange-500 text-white" : "hidden"}>{item.confirmationStatus}</button>
                                        <button className={item.confirmationStatus === 'confirmed' ? " cursor-default rounded-md btn-sm text-base font-semibold bg-lime-500 text-white" : "hidden"}>{item.confirmationStatus}</button>
                                    </>
                                }</td>

                                <td>{item.paymentStatus === 'paid' ? <button onClick={() => handleDelete(item._id)} className="btn btn-sm bg-orange-500 text-white ">Cancel</button> : <button disabled className="btn btn-sm bg-lime-500 ">Cancel</button>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageRegisteredCamp;