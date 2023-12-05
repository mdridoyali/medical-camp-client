import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { Card, Typography } from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
// import SocialLogin from "../Components/SocialLogin";
import useAuth from "../Hooks/useAuth";
import { ThreeDots } from "react-loader-spinner";

const Login = () => {
  const { logInUser } = useAuth()
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard'
  // console.log(location.state)
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (e) => {
    setLoading(true)
    e.preventDefault();
    const toastId = toast.loading('logging in ...')
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    logInUser(email, password)
      .then((result) => {
        console.log(result.user);
        // navigate(location?.state ? location?.state : "/");
        toast.success('Logged in', { id: toastId, duration: 3000 })
        return navigate(from, { replace: true })
      })
      .catch((error) => {
        console.log(error)
        toast.error('Invalid email or password', { id: toastId, duration: 3000 })
      });
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
    <div className="mx-auto flex w-11/12 items-center justify-between my-20">
      <Helmet>
        <title>Daily Dine | Login</title>
      </Helmet>
      <div className=" mx-auto flex ">
        <Card className="mx-auto " color="transparent" shadow={false}>
          <Typography className="text-center " variant="h4" color="blue-gray">
            Login
          </Typography>
          <form
            onSubmit={handleLogin}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-1 flex flex-col gap-5">
              <input name="email" className="border p-1" placeholder="Email" type="email" />
              <input name="password" className="border p-1" placeholder="Password" type="password" />
              {/* <div className="relative flex w-full max-w-[24rem]">
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
                  disabled={disabled}
                  className="!absolute right-0 top-0 bg-black text-white  btn-sm btn rounded"
                >
                  Invite
                </button>
              </div> */}
              <div className="form-control">
                <LoadCanvasTemplate />
                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the captcha above" className="border w-full p-1 " />

              </div>
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

            {/* <SocialLogin></SocialLogin> */}
            <p color="gray" className="mt-4 text-center font-normal">
              New Here?{" "}
              <Link
                to={"/register"}
                href="#"
                className="font-bold text-blue-600"
              >
                Register
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
