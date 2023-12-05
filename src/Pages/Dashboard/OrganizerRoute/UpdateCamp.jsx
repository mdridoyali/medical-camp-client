const image_hoisting_key = import.meta.env.VITE_IMG_HOISTING_KEY
const image_hoisting_api = `https://api.imgbb.com/1/upload?key=${image_hoisting_key}`
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SectionHeading from "../../../Components/sectionHeading";
import toast from "react-hot-toast";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
import useAuth from "../../../Hooks/useAuth";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";

const UpdateCamp = () => {
    const { user } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    const { id } = useParams()

    const { data: camp = {}, isLoading } = useQuery({
        queryKey: ['camp'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/camp/${id}`)
            return res.data
        }
    })
    const { campName, campFees, location, specializedService, healthProfessional, audience, image, scheduleDate, description, } = camp
    console.log(id)
    console.log(camp)

    const onSubmit = async (data) => {
        // const imageFile = { image: data.image[0] }
        // const res = await axiosPublic.post(image_hoisting_api, imageFile, {
        //     headers: {
        //         'content-type': ' multipart/form-data'
        //     }
        // })
        // if (res.data.success) {
        // now send the menu item to the database with the image url
        console.log(data)

        const campItem = {
            campName: data.campName,
            campFees: parseInt(data.campFees),
            location: data.location,
            specializedService: data.specializedService,
            healthProfessional: data.healthProfessional,
            audience: data.audience,
            image,
            scheduleDate: data.scheduleDate,
            description: data.description,
            email: user?.email
        }
        console.log(campItem)
        const campRes = await axiosSecure.put(`/camp/${id}`, campItem);
        console.log(campRes.data)
        if (campRes.data.modifiedCount > 0) {
            toast.success(`Camp Update Success`)
        }

        // }

    }
    if (isLoading) return <Loading />

    return (
        <div className="px-2 md:px-5  mb-14">
            <Helmet>
                <title>MediCamp | Update Camp</title>
            </Helmet>
            <SectionHeading heading={'Update A Camp'} ></SectionHeading>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3  font-bold md:font-normal " >
                <div className="flex flex-col md:flex-row w-full gap-5">
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Camp Name</span>
                        </label>
                        <input
                            type="text"
                            {...register("campName", { required: true })}
                            // placeholder="Camp Name"
                            defaultValue={campName}
                            className="input input-bordered" />
                        {errors.campName && <span className="text-red-600">Name is required</span>}
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Camp Fees</span>
                        </label>
                        <input
                            type="number"
                            {...register("campFees", { required: true })}
                            defaultValue={campFees}
                            className="input input-bordered" />
                        {errors.campFees && <span className="text-red-600">Photo URL is required</span>}
                    </div>
                </div>


                {/* row 2 */}
                <div className="flex flex-col md:flex-row w-full gap-5">
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Venue Location</span>
                        </label>
                        <input
                            type="text"
                            {...register("location", { required: true })}
                            defaultValue={location}
                            className="input input-bordered" />
                        {errors.location && <span className="text-red-600">Name is required</span>}
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Specialized Services Provided</span>
                        </label>
                        <input
                            type="text"
                            {...register("specializedService", { required: true })}
                            defaultValue={specializedService}
                            className="input input-bordered" />
                        {errors.specializedService && <span className="text-red-600">Specialized is required</span>}
                    </div>
                </div>

                {/* row 3 */}
                <div className="flex flex-col md:flex-row w-full gap-5">
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Healthcare Professionals</span>
                        </label>
                        <input
                            type="text"
                            {...register("healthProfessional", { required: true })}
                            defaultValue={healthProfessional}
                            className="input input-bordered" />
                        {errors.healthProfessional && <span className="text-red-600">Healthcare is required</span>}
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Targeted Audience</span>
                        </label>
                        <input
                            type="text"
                            {...register("audience", { required: true })}
                            defaultValue={audience}
                            className="input input-bordered" />
                        {errors.audience && <span className="text-red-600">Targeted Audience is required</span>}
                    </div>
                </div>


                {/* row 4 image and time*/}
                <div className="flex flex-col md:flex-row w-full gap-5">
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Choose an Image</span>
                        </label>
                        <input
                            type="file"
                            // disabled
                            // {...register('image', { required: true })}
                            // defaultValue={image}
                            // value={image}
                            // onChange={(e) => setValue('image', e.target.files[0])}
                            className="file-input input-bordered   " />
                        {/* {errors.image && <span className="text-red-600">Image is required</span>} */}
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Scheduled Date</span>
                        </label>
                        <input
                            type="datetime-local"
                            id="dateTimePicker"
                            {...register("scheduleDate", { required: true })}
                            defaultValue={scheduleDate}
                            className="input input-bordered" />
                        {errors.scheduleDate && <span className="text-red-600">Scheduled Date Required</span>}
                    </div>
                </div>


                <div className="form-control flex-1">
                    <label className="label">
                        <span className="label-text">Comprehensive Description</span>
                    </label>
                    <textarea
                        {...register("description", { required: true })}
                        defaultValue={description}
                        className="input input-bordered h-32" ></textarea>
                    {errors.description && <span className="text-red-600">Description Required</span>}
                </div>


                <div className="form-control pt-5">
                    <input className="btn btn-primary" type="submit" value="Update Camp" />
                </div>
            </form>
        </div>
    );
};

export default UpdateCamp;


