import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const UserData = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: userData = [],} = useQuery({
        queryKey: ['registered-camp-organizer', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user?.email}`)
            return res.data
        }
    })
    return [userData]
};

export default UserData;