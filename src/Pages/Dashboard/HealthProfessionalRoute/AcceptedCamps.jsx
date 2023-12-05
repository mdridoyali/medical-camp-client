
import { Helmet } from "react-helmet-async";
import SectionHeading from "../../../Components/sectionHeading";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const AcceptedCamps = () => {


    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()

    const { data: camps = [], isLoading } = useQuery({
        queryKey: ['interested-camp', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/interested-camp/${user?.email}`)
            return res.data
        }
    })
    console.log(camps)


    if (isLoading) return <Loading />
    return (
        <div className="md:px-3 mb-14 ">
            <Helmet>
                <title>MediCamp | Manage Camp</title>
            </Helmet>
            <SectionHeading heading={'Manage camps'}></SectionHeading>
            <h2 className="text-center font-semibold text-xl mb-5">TOTAL CAMPS {camps.length}</h2>

            <div className="overflow-x-scroll">
                <table className="table ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>CAMP NAME</th>
                            <th className="">SCHEDULE DATE</th>
                            <th className="">VENUE LOCATION</th>
                            <th>Audience</th>
                            <th>Acceptance Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {camps.map((user, idx) => (
                            <tr key={idx}>
                                <td>{user.campName}</td>
                                <td className="">{user.scheduleDate}</td>
                                <td className="">{user.location}</td>
                                <td className="">{user.audience}</td>
                                <td className="">{user.acceptanceStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AcceptedCamps;