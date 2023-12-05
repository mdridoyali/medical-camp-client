import { Helmet } from "react-helmet-async";
import SectionHeading from "../Components/sectionHeading";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import Loading from "../Components/Loading";
import useUser from "../Hooks/useUser";
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";

const CampDetails = () => {
    const { id } = useParams()
    const axiosPublic = useAxiosPublic();
    const [userRole] = useUser()
    const { user } = useAuth()


    const { data: camp = {}, isLoading } = useQuery({
        queryKey: ['camp-details', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/camp/${id}`)
            return res.data
        }
    })

    const { campName, campFees, location, specializedService, healthProfessional, count , audience, image, scheduleDate, description, _id, organizerEmail } = camp


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target
        const name = e.target.name.value;
        const phoneNumber = e.target.phoneNumber.value;
        const age = e.target.age.value;
        const gender = e.target.gender.value;
        const address = e.target.address.value;
        const healthInfo = e.target.healthInfo.value;
        const paymentStatus = 'unpaid';
        const confirmationStatus = 'pending';
        const participant = {
            email: user?.email,
            name: user?.displayName
        }

        const registeredInfo = {
            name, age, gender, phoneNumber, address, healthInfo, paymentStatus, confirmationStatus, participant, campName, campFees, location, scheduleDate, campId: _id, organizerEmail }
        console.log(registeredInfo)
        try {
            const res = await axiosPublic.post('/registered-camp', registeredInfo);
            console.log(res.data.insertedId);
            if (res.data.insertedId) {
                console.log(res.data);
                toast.success('The Camp is Registered');
                form.reset();
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error, show toast.error, etc.
        }
        const countRes = await axiosPublic.patch(`/camp-count/${_id}`,{count:1 },);
        console.log(countRes)

    };

    if (isLoading) return <Loading />

    return (
        <div className="w-11/12 mb-16 md:w-9/12 mx-auto">
            <Helmet><title>MediCamp | CampDetails</title></Helmet>
            <SectionHeading heading={'Camp Details'} ></SectionHeading>

            <CardActionArea sx={{}}>
                <CardMedia
                    sx={{ height: 400 }}
                    image={image}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" sx={{ textTransform: "uppercase" }} >{campName} </Typography>
                    <Typography variant="body1"  >Audience: {audience} </Typography>
                    <Typography variant="body1"  >Health Professional: {healthProfessional} </Typography>
                    <Typography variant="body1"  >Specialized Service: {specializedService} </Typography>
                    <Typography variant="body1"  >Location: {location} </Typography>
                    <Typography variant="body1"  >Schedule Date: {scheduleDate} </Typography>
                    <Typography variant="body1"  >Camp Fees: ${campFees} </Typography>
                    <Divider sx={{ width: 300, marginTop: 2 }} />
                    <Typography sx={{ marginTop: 2 }} variant="body1"  >Description: {description} </Typography>

                </CardContent>
                <CardActions>
                    {
                        userRole?.role === 'participant' ?
                            <Link to={`/camp-details/${_id}`}>
                                <Button variant="contained" color="primary" onClick={() => document.getElementById('my_modal_5').showModal()} >
                                    Join Camp
                                </Button>
                            </Link>
                            :
                            <Link >
                                <Button disabled variant="contained" color="primary" onClick={() => document.getElementById('my_modal_5').showModal()} >
                                    Join Camp
                                </Button>
                            </Link>
                    }
                </CardActions>
            </CardActionArea>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold mb-3 text-lg">Fill Up The Join Camp Form!</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            name="name"
                            className="border px-1 py-2 rounded w-full"
                            type="text"
                            placeholder="Name"
                            required
                        />
                        <input
                            name="phoneNumber"
                            className="border px-1 py-2 rounded w-full"
                            type="number"
                            placeholder="Phone Number"
                            required
                        />
                        <div className="flex gap-4">
                            <input
                                name="age"
                                className="border px-1 py-2 flex-1 rounded w-full"
                                type="number"
                                placeholder="Age"
                                required
                            />
                            <select
                                name="gender"
                                className="border px-1 py-2 flex-1 rounded w-full"
                                required
                            >
                                <option disabled>Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Custom</option>
                            </select>
                        </div>
                        <div className="flex gap-4">
                            <input
                                name="address"
                                className="border px-1 py-2 rounded w-full"
                                type="text"
                                placeholder="Address"
                                required
                            />
                            <input
                                disabled
                                className="border px-1 py-2 rounded w-full"
                                type="text"
                                defaultValue={campFees}
                            />
                        </div>
                        <textarea
                            name="healthInfo"
                            placeholder="Write Here Your Health Related Information"
                            className="border px-1 py-2 rounded w-full"
                        ></textarea>

                        <div className="flex justify-between mt-7">

                            {/* <form method="dialog"> */}
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                            {/* </form> */}
                            {/* <div className="modal-action"> <form method="dialog">
                                <button type="button" className="btn btn-outline">
                                    Cancel
                                </button>
                            </form></div> */}
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>

                        </div>
                    </form>

                </div>
            </dialog>

        </div>
    );
};

export default CampDetails;