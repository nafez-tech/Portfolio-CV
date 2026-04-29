import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { GET_MyTESTIMONIALS } from '@/lib/API';

const Testimonial = () => {
    const [data, setData] = useState(null);
        useEffect(() => {
            const fetchData = async () => {
            const result = await GET_MyTESTIMONIALS();
            setData(result);
            };
                
            fetchData();
        }, []);

    return (
        <div id="testimonial" className="section">
            <div className="container">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={40}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        type: 'progressbar',
                    }}
                    modules={[Pagination]}
                    className="testimonial-slider"
                >

                    {data?.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="testimonial-box">
                                <div className="testimonial-avatar">
                                    <Image src={item.acf.avatar.url} alt={item.acf.name}
                                    width={250} height={250}/>
                                </div>
                                <div className="testimonial-content">
                                    <div className="mb-3">
                                        <h3>{item.acf.name}</h3>
                                        <span className="sm-heading text-white">{item.acf.jobtitle}</span>
                                    </div>
                                    <p className="fs-4 fw-normal fst-italic line-height-140">{item.acf.description}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default Testimonial;
