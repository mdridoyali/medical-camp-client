import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loading from "./Loading";
import SectionHeading from "./sectionHeading";
import { Button, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const SuccessfulCamps = () => {
    const axiosPublic = useAxiosPublic()
    const { data: camps = [], isLoading } = useQuery({
        queryKey: ['three-camps'],
        queryFn: async () => {
            const res = await axiosPublic.get('/three-camps')
            return res.data
        }
    })
    console.log(camps)

    if (isLoading) return <Loading />


    return (
        <div className=" mb-10">
            <SectionHeading heading={'Our Successful Camps'} ></SectionHeading>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 mx-auto  p-3 md:mx-10 gap-5">
                {
                    camps.map((item, idx) => (
                        <CardActionArea key={idx} sx={{}}>
                            <CardMedia
                                sx={{ height: 200 }}
                                image={item.image}
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">{item.campName} </Typography>
                                <Typography variant="body1"  >Location: {item.location} </Typography>
                                <Typography variant="body1"  >Camp Fees: ${item.campFees} </Typography>
                                <Typography variant="body1"   >Registered Count: {item.count} </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`/camp-details/${item._id}`}>
                                    <Button variant="contained" color="primary" >
                                        See Details
                                    </Button>
                                </Link>
                            </CardActions>
                        </CardActionArea>
                    ))
                }

            </div>
        </div>
    );
};

export default SuccessfulCamps;