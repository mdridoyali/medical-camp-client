import { Helmet } from "react-helmet-async";
import SectionHeading from "../../../Components/sectionHeading";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import toast from "react-hot-toast";

const Feedback = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [rating, setRating] = useState(null)
    const [campName, setCampName] = useState(null)
    const ratingChanged = (newRating) => {
        setRating(newRating)
    };
    const { data: registeredData = [] } = useQuery({
        queryKey: ['registered-camp', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/registered-camp/${user?.email}`)
            return res.data
        }
    })

    const paidRegisteredData = Array.isArray(registeredData)
        ? registeredData.filter(item => item.paymentStatus === 'paid')
        : [];
    // console.log(paidRegisteredData)

    const handleReview = async (e,) => {
        e.preventDefault()
        const reviewDetails = e.target.reviewDetails.value;
        console.log(rating, reviewDetails);
        const reviewData = {
            campName,
            rating,
            reviewDetails,
            reviewerName: user?.displayName,
            reviewerImg: user?.photoURL,
            paymentStatus: 'paid',
            reviewTime: new Date()
        }
        console.log(reviewData)

        const res = await axiosSecure.post('/feedback', reviewData)
        console.log(res.data)
        if (res.data.insertedId) {
            toast.success('Thanks For Review')
            e.target.reset()
        }
    }

    return (
        <div>
            <Helmet><title>MediCamp | Feedback</title></Helmet>
            <SectionHeading heading={'Feedback And Rating'} ></SectionHeading>
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
                        {paidRegisteredData.map((item, idx) => (
                            <>
                                <tr key={idx}>
                                    <td>{item.campName}</td>
                                    <td>{item.scheduleDate}</td>
                                    <td>{item.location}</td>
                                    <td>${item.campFees}</td>
                                    <td>{item.paymentStatus}</td>
                                    <td>{item.confirmationStatus}</td>
                                    <td>
                                        <button className="btn btn-sm bg-lime-600 text-white" onClick={() => { setCampName(item.campName), document.getElementById('my_modal_5').showModal() }} >
                                            Review
                                        </button>
                                    </td>
                                </tr>

                                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" >
                                    <div className="modal-box">
                                        <h3 className="font-bold mb-3 text-lg">Write Your Feedback Here for This Camp!</h3>

                                        <form onSubmit={(e) => handleReview(e, item._id)} className="space-y-4">
                                            <ReactStars
                                                count={5}
                                                onChange={ratingChanged}
                                                size={24}
                                                activeColor="#ffd700"
                                            />
                                            <textarea
                                                name="reviewDetails"
                                                placeholder="Write Here Your Health Related Information"
                                                className="border px-1 py-2 rounded w-full"
                                            ></textarea>

                                            <div className="flex justify-between mt-7">
                                                <Button variant="contained" color="primary" type="submit">
                                                    Submit
                                                </Button>
                                                <form method="dialog">
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                </form>
                                            </div>
                                        </form>

                                    </div>
                                </dialog>

                            </>
                        ))}
                    </tbody>
                </table>
                {/* Open the modal using document.getElementById('ID').showModal() method */}



            </div>
        </div >
    );
};

export default Feedback;