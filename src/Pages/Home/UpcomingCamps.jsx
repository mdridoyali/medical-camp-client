
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import SectionHeading from "../../Components/sectionHeading";
import Loading from "../../Components/Loading";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { CardActionArea } from '@mui/material';

const UpcomingCamps = () => {
    const axiosPublic = useAxiosPublic()


    const { data = [], isLoading } = useQuery({
        queryKey: ['upcoming-camp'],
        queryFn: async () => {
            const res = await axiosPublic.get('/upcoming-camp')
            return res.data
        }
    })
    console.log(data)

    if (isLoading) return <Loading />

    return (
        <div>
            <SectionHeading heading={'Upcoming Camps'} ></SectionHeading>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 mx-auto  p-3 md:mx-10 gap-5">
                {data.map((item, idx) => (
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
                                <Link to={`/upcoming-camp-details/${item._id}`}>
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

export default UpcomingCamps;