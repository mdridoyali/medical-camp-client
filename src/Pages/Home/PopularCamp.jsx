
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
import { useEffect } from 'react';
import Aos from 'aos';

const PopularCamp = () => {
    const axiosPublic = useAxiosPublic()
    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    const { data: camps = [], isLoading } = useQuery({
        queryKey: ['six-camps'],
        queryFn: async () => {
            const res = await axiosPublic.get('/six-camps')
            return res.data
        }
    })
    console.log(camps)

    if (isLoading) return <Loading />

    return (
        <div className=" mb-10">
            <SectionHeading heading={'Popular Camps'} ></SectionHeading>
            <div data-aos="fade-down" className="grid md:grid-cols-2 lg:grid-cols-3 mx-auto  md:mx-10 gap-5 md:gap-10">
                {
                    camps.map((item, idx) => (
                        <CardActionArea
                            key={idx}>
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

export default PopularCamp;
