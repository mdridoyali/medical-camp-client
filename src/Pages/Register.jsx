const image_hoisting_key = import.meta.env.VITE_IMG_HOISTING_KEY
const image_hoisting_api = `https://api.imgbb.com/1/upload?key=${image_hoisting_key}`
import {
    Card,
    Typography,
} from "@material-tailwind/react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import "@material-tailwind/react/tailwind.css";
import { useEffect, useRef, useState } from "react";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
// import SocialLogin from "../Components/SocialLogin";
import Swal from "sweetalert2";
import { ThreeDots } from "react-loader-spinner";
import {
    loadCaptchaEnginge,
    LoadCanvasTemplate,
    validateCaptcha,
} from "react-simple-captcha";



const Register = () => {
    const axiosPublic = useAxiosPublic()
    const { createUser, updateUserProfile } = useAuth();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const [disabled, setDisabled] = useState(true);


    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);


    const handleRegister = async (e) => {
        setLoading(true)
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const role = form.role.value;
        const password = form.password.value;
        console.log(name, email, password, role);
        const inputFile = document.querySelector('input[type="file"]');
        const photo = inputFile.files[0];
        const formData = new FormData();
        formData.append('image', photo);

        const res = await axiosPublic.post(image_hoisting_api, formData, {
            headers: {
                'content-type': ' multipart/form-data'
            }
        })
        console.log(res.data.data.display_url)

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!.])[A-Za-z\d@#$%^&+=!.]{6,20}$/;
        if (!passwordRegex.test(password)) {
            return Swal.fire({
                icon: "error",
                title: "Invalid Password",
                text: "Password must be at least one uppercase, one digit, one special character and be 6 to 20 characters long.",
            });
        }

        if (res.data.success) {
            createUser(email, password)
                .then(() => {
                    updateUserProfile(name, res.data.data.display_url)
                        .then(() => {
                            // create user entry in the database
                            const userInfo = {
                                name: name,
                                email: email,
                                role: role,
                                userImg: res.data.data.display_url
                            }
                            axiosPublic.post('/users', userInfo)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        toast.success("Successfully Registered");
                                        form.reset();
                                        console.log(res.data);
                                        navigate(location?.state ? location?.state : "/");
                                        setLoading(false)
                                    }
                                })
                        })
                        .catch((error) => console.log(error));
                })
                .catch((error) => {
                    console.log(error);
                    form.reset();
                    return toast.error("Already have an account", { duration: 3000 });
                });
        }
    };

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true)
        }
    }



    return (
        <div className="mx-auto flex w-11/12 items-center justify-center my-10">
            <Helmet>
                <title>MediCamp | Register</title>
            </Helmet>
            <div className="">
                <Card color="transparent" shadow={false}>
                    <Typography className="text-center " variant="h4" color="blue-gray">
                        Sign Up
                    </Typography>
                    <form
                        onSubmit={handleRegister}
                        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                    >
                        <div className="mb-1 flex flex-col gap-6">
                            <input required name="name" type="text" placeholder="Name" label="Your Name" className="border p-1" />
                            <input required name="email" type="email" placeholder="Email" label="Your Email" className="border p-1" />
                            {/* <input   name="photo" type="text" placeholder="Photo url" label="Photo URL" className="border p-1" /> */}
                            <input
                                type="file"
                                // {...register('image', { required: true })}
                                className=" input-bordered  border p-1 " />
                            {/* {errors.image && <span className="text-red-600">Image is required</span>} */}
                            <select
                                name="role"
                                className="border p-1 "
                                required
                            >
                                <option disabled>Role</option>
                                <option>participant</option>
                                <option>health professional</option>
                                <option>organizer</option>
                            </select>
                            <div className="relative ">
                                <input
                                    required
                                    name="password"
                                    placeholder="Password"
                                    type={show ? "text" : "password"}
                                    label="Password"
                                    className="border w-full p-1  "
                                />
                                <span
                                    onClick={() => setShow(!show)}
                                    className="absolute right-4 cursor-pointer bottom-2"
                                >
                                    {show ? <p>Hide</p> : <p>Show</p>}
                                </span>
                            </div>
                            <div className="form-control">
                                    <LoadCanvasTemplate />
                                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the captcha above"  className="border w-full p-1 " />

                            </div>
                            {/* <LoadCanvasTemplate />
                            <div className="relative flex w-full max-w-[24rem]">
                                <input
                                    ref={captchaRef}
                                    name="captcha"
                                    type="text"
                                    placeholder="Captcha Code"
                                    className="border w-full rounded p-1"
                                />
                                <button
                                    onClick={handleValidateCaptcha}
                                    size="sm"
                                    //   color={email ? "gray" : "blue-gray"}
                                    //   disabled={!email}
                                    className="!absolute right-0 top-0 bg-black text-white  btn-sm btn rounded"
                                >
                                    Invite
                                </button>
                            </div> */}
                        </div>
                        <button
                            disabled={disabled}
                            type="submit"
                            className={disabled ? 'mt-6 w-full text-white p-1 bg-gray-400' : 'mt-6 w-full text-white p-1 bg-blue-700'}
                        >
                            {!loading ? 'Register' :
                                <div className="flex justify-center">
                                    <ThreeDots
                                        height="30"
                                        width="80"
                                        // radius="9"
                                        color="#FEEA00"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClassName=""
                                        visible={true}
                                    />
                                </div>}
                        </button>

                        {/* <SocialLogin></SocialLogin>{" "} */}
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Already have an account?{" "}
                            <Link to={"/login"} href="#" className="font-bold text-gray-900">
                                Login
                            </Link>
                        </Typography>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Register;
