import { BallTriangle } from "react-loader-spinner";


const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
            />
        </div>
    );
};

export default Loading;