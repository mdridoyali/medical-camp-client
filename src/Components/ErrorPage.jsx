import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col mb-14 justify-center">
            <img className="h-[80vh] w-[80vh] mx-auto" src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?size=626&ext=jpg&ga=GA1.1.132439167.1700879951&semt=ais" />
            <Link to={'/'} className="btn font-bold w-44 mx-auto">Home</Link>
        </div>
    );
};

export default ErrorPage;