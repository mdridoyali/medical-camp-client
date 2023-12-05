/* eslint-disable react/no-unescaped-entities */
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import SectionHeading from "../../Components/sectionHeading";

const NewsLetter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);
    e.target.reset();
    return toast.success("Thanks for Subscribing us");
  };

  return (
    <div className="mb-20 w-11/12 mx-auto">
      {/* <h1 className="text-transparent text-5xl font-semibold md:text-7xl text-center my-8 bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
        Subscribe Us
      </h1> */}
      <SectionHeading heading={'Subscribe Us'} ></SectionHeading>
      <div className=" lg:grid lg:gap-10 lg:grid-cols-12   rounded-2xl bg-gradient-to-bl from-lime-100 to-lime-700 p-10">
        <div className="col-span-7 ">
          <h2 className="text-3xl text-white md:text-5xl text-left font-semibold mb-8 ">
            Subscribe to Our{" "}
            <span className="text-transparent text-3xl  md:text-5xl  font-semibold text-left my-8 bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
              MediCamp
            </span>{" "}
            Exclusive Newsletter! and stay updated
          </h2>
          <p className="text-white text-xl pb-10">
            Don't miss anything. Get all the latest posts delivered straight to
            your inbox. It's free!
          </p>
        </div>
        <motion.form
          whileHover={{ x: [0, 100, 0] }}
          onSubmit={handleSubscribe}
          className="col-span-5  flex flex-col border p-5 md:p-10 rounded-2xl  bg-gradient-to-tr from-lime-100 to-lime-700 gap-5"
        >
          <div className="form-control flex-1">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="input input-bordered rounded-full"
              required
            />
          </div>
          <div className="form-control flex-1">
            <input
              type="text"
              name="email"
              placeholder="Your Email"
              className="input input-bordered rounded-full"
              required
            />
          </div>
          <div className="form-control flex-1">
            <input
              type="submit"
              value={"Subscribe"}
              className="input font-bold cursor-pointer text-xl bg-black text-white input-bordered rounded-full"
              required
            />
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default NewsLetter;
