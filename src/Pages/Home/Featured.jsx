const Featured = () => {
    return (
        <div className=" featured-item bg-fixed text-white pt-8 my-20 mx-auto  ">

            <div className="md:flex justify-center items-center bg-slate-600  bg-opacity-40 pb-20 pt-12  px-28 mx-auto gap-8 ">
                <div className="flex-1">
                    {" "}
                    <img className="" src={'https://img.freepik.com/free-vector/gradient-medical-twitch-background_23-2149153631.jpg?size=626&ext=jpg&uid=R119605278&ga=GA1.1.132439167.1700879951&semt=ais'} />
                </div>

                <div className="space-y-2 text-white flex-1">
                    <h2 className="text-xl font-semibold">March 20, 2023</h2>
                    <h2 className="text-xl font-semibold">WHERE CAN I GET SOME?</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                        voluptate facere, deserunt dolores maiores quod nobis quas quasi.
                    </p>
                    <button className="btn text-white mt-7 bg-lime-600 uppercase">
                        reed more
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Featured;
