
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useRegisteredCamp = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()


    const { data: registeredData = [], isLoading } = useQuery({
        queryKey: ['registered-camp', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/registered-camp/${user?.email}`)
            return res.data
        }
    })

    return [registeredData, isLoading]

}

export default useRegisteredCamp;