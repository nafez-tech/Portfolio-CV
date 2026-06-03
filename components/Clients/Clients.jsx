import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GET_MyCLIENTS } from '@/lib/API';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import "swiper/css/navigation";

const Clients = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
                const fetchData = async () => {
                    const result = await GET_MyCLIENTS();
                    setData(result?.acf);
                };
        
                fetchData();
            }, []);
    return (
        <div className="section pt-0">
            <div className="container">
                <Swiper
                    modules={[Autoplay, Navigation]}
                    slidesPerView={2}
                    spaceBetween={16}
                    breakpoints={{
                        // when window width is >= 640px
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                        // when window width is >= 768px
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                        // when window width is >= 1024px
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    className="clients-swiper"
                >
                    {data?.clients_data.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="client-box">
                                <Link href={item.url}>
                                    <Image 
                                    src={item.clients_logo.url} alt={index}
                                    width={150} height={100}
                                    className='h-15'/>
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default Clients