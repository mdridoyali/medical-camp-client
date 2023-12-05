import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://medi-camp-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;