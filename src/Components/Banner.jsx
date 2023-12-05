import img from '../assets/5.jpg'
const Banner = () => {
  return (

      <div className="relative">
        <img
          className="md:h-[550px] h-80 w-full"
          src={img}
        />
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)]"></div>
        <div className="absolute top-[10%] px-6 text-2xl  font-bold text-slate-100">
          <h1 className=" text-4xl md:text-7xl text-white">
            Medi Camp
          </h1>
          <br />
          <p className="text-white md:text-3xl md:w-6/12">We have been serving the public for a long time and we have the love and confidence of the people</p> <br />
          <p className="text-white">Explore our all camps</p> <br />
        </div>
      </div>
 
  );
};

export default Banner;
