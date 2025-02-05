import { Helmet } from "react-helmet-async";
import SectionHeading from "../../../../Components/sectionHeading";
import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../../Hooks/useAuth";
// import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const PaymentHistory = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: payment=[] } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history/${user?.email}`)
            return res.data
        }
    })
    // const id = payment.map(item => item.campIds)
    // const { data=[] } = useQuery({
    //     queryKey: ['payment'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/registered-camp/${user?.email}`)
    //         return res.data
    //     }
    // })
    // console.log(payment)
    // console.log( data, id)
 
    return (
        <div>
             <Helmet><title>MediCamp | Payment History</title></Helmet>
            <SectionHeading heading={'Your Payment History'} ></SectionHeading>
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
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {payment.map((item) => (
                            <tr key={item._id}>
                                <td>{item.campName}</td>
                                <td>{item.scheduleDate}</td>
                                <td>{item.location}</td>
                                <td>${item.totalPrice}</td>
                                <td ><p className="bg-green-400 w-fit px-2 py-[2px] rounded-sm ">{item.paymentStatus}</p></td>
                                <td>{item.confirmationStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;