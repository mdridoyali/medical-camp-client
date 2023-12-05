const image_hoisting_key = import.meta.env.VITE_IMG_HOISTING_KEY
const image_hoisting_api = `https://api.imgbb.com/1/upload?key=${image_hoisting_key}`
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SectionHeading from "../../../Components/sectionHeading";
import toast from "react-hot-toast";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
// import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import UserData from "../../../Components/UserProfile/UserData";


const UpdateProfile = () => {
    const { user } = useAuth()
    const [userData] = UserData()
    const email = user?.email
    console.log(email)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    // const navigate = useNavigate()

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const toastId = toast.loading('Updating Profile ...')
        const res = await axiosPublic.post(image_hoisting_api, imageFile, {
            headers: {
                'content-type': ' multipart/form-data'
            }
        })
        if (res.data.success && user?.email) {
            const userInfo = {
                name: data.name,
                profession: data.role,
                address: data.address,
                mobile: data.mobile,
                userImg: res.data.data.display_url,
            }
            console.log(userInfo)
            const campRes = await axiosSecure.put(`/update-user-profile/${user?.email} `, userInfo);
            console.log(campRes.data)
            if (campRes.data.modifiedCount) {
                toast.success('Profile Updated Success', { id: toastId })
                // navigate('/dashboard/organizer-profile')
            }
        }

    }


    return (
        <div className="px-2 md:px-5 mb-14 ">
            <Helmet>
                <title>MediCamp | Update Profile</title>
            </Helmet>
            <SectionHeading heading={'Update Profile'} ></SectionHeading>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 font-bold md:font-normal " >
                {/* row 1 */}
                <div className="flex flex-col md:flex-row w-full gap-5">
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            {...register("name",  { required: true } )}
                            defaultValue={userData?.name}
                            className="input input-bordered" />
                        {errors.campName && <span className="text-red-600">Name is required</span>}
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Role</span>
                        </label>
                        <select
                                type="text"
                                {...register("role", { required: true } )}
                                defaultValue={userData?.role}
                                className="input input-bordered" 
                            >
                                <option disabled>Role</option>
                                <option>participant</option>
                                <option>health professional</option>
                                <option>organizer</option>
                            </select>
                            {errors.role && <span className="text-red-600">Photo URL is required</span>}
                        {/* <input
                            type="text"
                            {...register("role", { required: true } )}
                            defaultValue={userData?.role}
                            className="input input-bordered" /> */}
                    </div>
                </div>


                {/* row 2 */}
                <div className="flex flex-col md:flex-row w-full gap-5">
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input
                            type="text"
                            {...register("address",  { required: true })}
                            defaultValue={userData?.address}
                            className="input input-bordered" />
                        {errors.location && <span className="text-red-600">Address is required</span>}
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Mobile</span>
                        </label>
                        <input
                            type="number"
                            {...register("mobile",  { required: true })}
                            defaultValue={userData?.mobile}
                            className="input input-bordered" />
                        {errors.specializedService && <span className="text-red-600">Specialized is required</span>}
                    </div>
                </div>

                {/* row 3 image and time*/}
                <div className="flex items-center justify-center md:flex-row w-full pt-4 gap-5">
                    <div className="form-control flex-1 w-full">
                        <input className="btn btn-primary w-full" type="submit" value="Update Profile" />
                    </div>
                    <div className="form-control flex-1">
                        <input
                            type="file"
                            {...register('image', { required: true } )}
                            // defaultValue={userData?.userImg}
                            className="file-input input-bordered w-full  " />
                        {errors.image && <span className="text-red-600">Image is required</span>}
                    </div>
                </div>



            </form>
        </div>
    );
};

export default UpdateProfile;