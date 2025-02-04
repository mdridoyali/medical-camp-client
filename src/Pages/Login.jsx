
import { Card, Typography } from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
// import SocialLogin from "../Components/SocialLogin";
import useAuth from "../Hooks/useAuth";
import { ThreeDots } from "react-loader-spinner";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const { logInUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard'
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

  const handleCaptcha = (value) => {
    console.log("CAPTCHA value:", value);
    if (value) {
      setCaptchaVerified(true);
    }
  };

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

              <div className="form-control">
                <ReCAPTCHA
                  sitekey="6LesgswqAAAAAMWj7ufERroz8rTcuRMisvHsvBDa"
                  onChange={handleCaptcha}
                />
              </div>
            </div>
            <button
              disabled={!captchaVerified}
              type="submit"
              className={!captchaVerified ? 'mt-6 w-full text-white p-1 bg-gray-400' : 'mt-6 w-full text-white p-1 bg-blue-700'}
            >
              {!loading ? 'Login' :
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
