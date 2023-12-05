

const image_hoisting_key = import.meta.env.VITE_IMG_HOISTING_KEY
const image_hoisting_api = `https://api.imgbb.com/1/upload?key=${image_hoisting_key}`
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SectionHeading from "../../../Components/sectionHeading";
import toast from "react-hot-toast";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
import useAuth from "../../../Hooks/useAuth";
const AddUpcomingCamp = () => {
    const {user} = useAuth()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()


    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const toastId = toast.loading('Adding Upcoming Camp ...')
       console.log(data)
        const res = await axiosPublic.post(image_hoisting_api, imageFile, {
            headers: {
                'content-type': ' multipart/form-data'
            }
        })

        if(res.data.success){
            const campItem = {
                campName: data.campName,
                campFees: parseInt(data.campFees),
                location: data.location,
                specializedService: data.specializedService,
                // healthProfessional: data.healthProfessional,
                audience:data.audience,
                image: res.data.data.display_url,
                scheduleDate: data.scheduleDate,
                description: data.description,
                organizerEmail: user?.email,
                count: 0
            }
        //    console.log(campItem)

           const campRes = await axiosSecure.post('/upcoming-camp', campItem);
           console.log(campRes.data)
           if(campRes.data.insertedId){
             toast.success(`Upcoming Camp Added Success`, { id: toastId })
             reset()
           }
        }

    }


    return (
        <div className="px-2 md:px-5 mb-14 ">
              <Helmet>
                <title>MediCamp | Add Camp</title>
            </Helmet>
            <SectionHeading heading={'Add upcoming Camp'} ></SectionHeading>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3   font-bold md:font-normal " >
                <div className="flex flex-col md:flex-row w-full gap-5">
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Camp Name</span>
                        </label>
                        <input
                            type="text"
                            {...register("campName", { required: true })}
                            placeholder="Camp Name"
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
                            placeholder="Camp Fees"
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
                            placeholder="Venue Location"
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
                            placeholder="Specialized Services Provided"
                            className="input input-bordered" />
                        {errors.specializedService && <span className="text-red-600">Specialized is required</span>}
                    </div>
                </div>

                {/* row 3 */}
                <div className="flex flex-col md:flex-row w-full gap-5">
                    {/* <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Healthcare Professionals</span>
                        </label>
                        <input
                            type="text"
                            {...register("healthProfessional", { required: true })}
                            placeholder="Healthcare Professionals"
                            className="input input-bordered" />
                        {errors.healthProfessional && <span className="text-red-600">Healthcare is required</span>}
                    </div> */}
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Targeted Audience</span>
                        </label>
                        <input
                            type="text"
                            {...register("audience", { required: true })}
                            placeholder="Targeted Audience"
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
                            {...register('image', { required: true })}
                            className="file-input input-bordered   " />
                        {errors.image && <span className="text-red-600">Image is required</span>}
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Scheduled Date</span>
                        </label>
                        <input
                            type="datetime-local"
                            id="dateTimePicker"
                            {...register("scheduleDate", { required: true })}
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
                        placeholder="Comprehensive Description"
                        className="input input-bordered h-32" ></textarea>
                    {errors.description && <span className="text-red-600">Description Required</span>}
                </div>


                <div className="form-control pt-5">
                    <input className="btn btn-primary" type="submit" value="Add Camp" />
                </div>
            </form>
        </div>
    );
};

export default AddUpcomingCamp;




