import { Helmet } from "react-helmet-async";
import SectionHeading from "../Components/sectionHeading";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { CardActionArea } from "@mui/material";

const AvailableCamp = () => {
    const axiosSecure = useAxiosSecure()


    const { data: camps = [], isLoading } = useQuery({
        queryKey: ['all-camps-available'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-camps')
            return res.data
        }
    })
    console.log(camps)

    if (isLoading) return <Loading />

    return (
        <div className="min-h-[60vh] mb-10">
            <Helmet><title>MediCamp | Available Camp</title></Helmet>
            <SectionHeading heading={'All Available Camps'} ></SectionHeading>
            <div className="grid md:grid-cols-2 mx-auto  p-3 md:mx-10 gap-5">
                {
                    camps.map((item, idx) => (
                        <CardActionArea key={idx} sx={{}}>
                            <CardMedia
                                sx={{ height: 300 }}
                                image={item.image}
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">{item.campName} </Typography>
                                <Typography variant="body1"  >Location: {item.location} </Typography>
                                <Typography variant="body1"  >Schedule Date: {item.scheduleDate} </Typography>
                                <Typography variant="body1"  >Camp Fees: ${item.campFees} </Typography>

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

export default AvailableCamp;


