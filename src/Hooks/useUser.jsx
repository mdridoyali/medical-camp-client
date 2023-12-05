import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';



const useUser = () => {

    const axiosPublic = useAxiosPublic()
    const { user, loading } = useAuth() 
    // console.log(user)
    const { data: userRole = [] } = useQuery({
        queryKey: [user?.email, 'userRole'],
        enabled: !loading && !!user, // Updated this line
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${user.email}`);
            return res.data;
        }
    })
    // console.log(userRole)
    return [userRole]
};

export default useUser;
