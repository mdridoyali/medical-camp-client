
import { Link } from 'react-router-dom';
import img from '../assets/banner/1.jpg'
import { Button } from '@mui/material';
const Banner = () => {
  return (

    <div className="relative mb-10">
      <img
        className="h-[calc(100vh-76px)]  w-full"
        src={img}
      />
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)]"></div>
      <div className="absolute top-[10%] px-6 text-2xl lg:w-2/3 font-bold text-slate-100">
        <h1 className=" text-4xl md:text-5xl lg:text-7xl text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
            MediCamp
          </span>{" "} Your Trusted Medical Camp Management Platform
        </h1>
        <br />
        <p className="text-white md:text-3xl md:w-6/12">We have been proudly serving the community for years, earning the trust and appreciation of the people.</p> <br />
        <Link to={'/available-camp'}>
          <Button variant="contained" >Explore our all camps</Button>
        </Link>
      </div>
    </div>

  );
};

export default Banner;
