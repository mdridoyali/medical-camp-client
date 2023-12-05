


import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button, CardActionArea, CardActions, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useUser from "../../Hooks/useUser";
import useAuth from "../../Hooks/useAuth";
import SectionHeading from "../../Components/sectionHeading";
import Loading from "../../Components/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const UpcomingCampDetails = () => {
    const { id } = useParams()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    const [userRole] = useUser()
    const { user } = useAuth()
    console.log(id)

    const { data: camp = {}, isLoading } = useQuery({
        queryKey: ['upcoming-camp', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/upcoming-camp/${id}`)
            return res.data
        }
    })

    const { campName, campFees, location, specializedService, audience, image, scheduleDate, description, _id, organizerEmail } = camp


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target
        const name = e.target.name.value;
        const phoneNumber = e.target.phoneNumber.value;
        const age = e.target.age.value;
        const gender = e.target.gender.value;
        const address = e.target.address.value;
        const healthInfo = e.target.healthInfo.value;
        const participant = {
            email: user?.email,
            name: user?.displayName
        }
        const registeredInfo = {
            name, age, gender, phoneNumber, address, healthInfo, participant, campName, campFees, location, scheduleDate, campId: _id, organizerEmail
        }
        console.log(registeredInfo)
        try {
            const res = await axiosSecure.post('/registered-upcoming-camp', registeredInfo);
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
    };



    const handleProfessionalSubmit = async (e) => {
        e.preventDefault();
        const professionalName = e.target.professionalName.value;
        const contact = e.target.contact.value;
        const specialization = e.target.specialization.value;
        const campInformation = e.target.campInformation.value;

        const interestInfo = {
            campName,
            scheduleDate,
            location,
            audience,
            professionalName,
            contact,
            specialization,
            campInformation,
            email: user?.email,
            name: user?.displayName,
            cid: _id,
            acceptanceStatus: 'Confirm'
        }
        console.log(interestInfo)
        const res = await axiosPublic.post('/interested-camp', interestInfo);
        console.log(res.data.insertedId);
        if (res.data.insertedId) {
            console.log(res.data);
            toast.success('The Camp is Interested');
            e.target.reset();
        }

    }


    if (isLoading) return <Loading />

    return (
        <div className="w-11/12 mb-16 md:w-9/12 mx-auto">
            <Helmet><title>MediCamp | CampDetails</title></Helmet>
            <SectionHeading heading={'Upcoming Camp Details'} ></SectionHeading>

            <CardActionArea sx={{}}>
                <CardMedia
                    sx={{ height: 400 }}
                    image={image}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" sx={{ textTransform: "uppercase" }} >{campName} </Typography>
                    <Typography variant="body1"  >Audience: {audience} </Typography>
                    {/* <Typography variant="body1"  >Health Professional: {healthProfessional} </Typography> */}
                    <Typography variant="body1"  >Specialized Service: {specializedService} </Typography>
                    <Typography variant="body1"  >Location: {location} </Typography>
                    <Typography variant="body1"  >Schedule Date: {scheduleDate} </Typography>
                    <Typography variant="body1"  >Camp Fees: ${campFees} </Typography>
                    <Divider sx={{ width: 300, marginTop: 2 }} />
                    <Typography sx={{ marginTop: 2 }} variant="body1"  >Description: {description} </Typography>

                </CardContent>
                <CardActions>
                    {
                        userRole?.role === 'participant' &&
                        <Link >
                            <Button variant="contained" color="primary" onClick={() => document.getElementById('my_modal_5').showModal()} >
                                Join Upcoming Camp
                            </Button>
                        </Link>
                    }
                    {
                        userRole?.role === 'health professional' &&
                        <Link >
                            <Button variant="contained" color="primary" onClick={() => document.getElementById('my_modal_5').showModal()} >
                                Interest
                            </Button>
                        </Link>
                    }
                </CardActions>
            </CardActionArea>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {userRole?.role === 'participant' &&
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
                                placeholder="Write Here Specific Health Related Information"
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
            }
            {userRole?.role === 'health professional' &&
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold mb-3 text-lg">Fill Up The Join Camp Form!</h3>
                        <form onSubmit={handleProfessionalSubmit} className="space-y-4">
                            <input
                                name="professionalName"
                                className="border px-1 py-2 rounded w-full"
                                type="text"
                                placeholder="Name"
                                required
                            />
                            <input
                                name="contact"
                                className="border px-1 py-2 rounded w-full"
                                type="text"
                                placeholder="Contact Information"
                                required
                            />
                            <div className="flex gap-4">
                                <input
                                    name="specialization"
                                    className="border px-1 py-2 flex-1 rounded w-full"
                                    type="text"
                                    placeholder="Specialization"
                                    required
                                />
                            </div>
                            <textarea
                                name="campInformation"
                                placeholder="Camp Specific Information"
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
            }


        </div>
    );
};

export default UpcomingCampDetails;


