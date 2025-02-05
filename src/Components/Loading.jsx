import { Oval } from "react-loader-spinner";


const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Oval
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />

        </div>
    );
};

export default Loading;