
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import 'swiper/css';
import 'swiper/css/navigation';

import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SectionHeading from '../../Components/sectionHeading';
// import "./../../assets/364122218_954813995821698_2268309583943494016_n.jpg"

const Testimonials = () => {
    const axiosPublic = useAxiosPublic()
    const { data: testimonialsData = [] } = useQuery({
        queryKey: ['feedback'],
        queryFn: async () => {
            const res = await axiosPublic.get('feedback')
            return res.data
        }
    })

    const data = testimonialsData.filter(item => item.rating)
    return (

        <div className='py-20 about-us bg-fixed mx-auto my-10 md:my-20'>
            <div className='w-96 md:p-10 md:w-[720px] lg:w-[1000px] mx-auto text-white bg-black bg-opacity-60'>
                <SectionHeading heading={'Participants Feedback'} ></SectionHeading>
                <Swiper navigation={true} modules={[Navigation, Autoplay]} className="mySwiper">
                    {
                        data?.map(data => <SwiperSlide key={data._id}>
                            <div className='md:flex gap-10  justify-center items-center '>
                                <div className='text-center'>
                                    <img src={data.reviewerImg} alt="" className='rounded-full mx-auto w-16 h-16 md:w-28 md:h-28 ' />
                                    <h1 className='font-bold text-lg'>{data?.reviewerName}</h1>
                                </div>

                                <div className='text-center'>
                                    <p className=' text-2xl font-semibold'>{data?.campName}</p>
                                    <div className='text-center mx-auto flex justify-center'>
                                        <Rating
                                            style={{ maxWidth: 120 }}
                                            value={data?.rating}
                                            readOnly
                                        />
                                    </div>
                                    <h1 className=''>{data?.reviewTime}</h1>
                                    <h1 className=''>{data?.reviewDetails}</h1>
                                </div>
                            </div>
                        </SwiperSlide>
                        )
                    }
                </Swiper>
            </div>

        </div>
    );
};

export default Testimonials;