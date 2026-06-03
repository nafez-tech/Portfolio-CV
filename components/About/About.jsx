import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import {GET_AboutData} from '@/lib/API';
import {HomeLoader } from '../UI/SkeletonLoader/SkeletonLoader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const  About =  () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const result = await GET_AboutData();
            setData(result?.acf);
        };

        fetchData();
    }, []);

    if (!data) {
        return (
        <main className="container">
            <HomeLoader/>
        </main>
        )
    }
    return (
        <div className="container">
            <div className="row g-4 g-md-5">
                <div className="col-12 col-lg-4 order-lg-2 text-center">
                    {/* Hero Avatar */}
                    <div className="hero-avatar">
                        {data?.hero_avatar ? (
                            <Image src={data.hero_avatar.url} width={300} height={300} alt={data.hero_avatar.alt} />
                        ) : (
                            ""
                        )}
                    </div>
                    {/* end Hero Avatar */}

                    {/* Start Hire Me and CV */}
                    {data && (
                        <>
                        <Link className="button button-sm button-dot mt-5 me-2 me-lg-3" 
                        href={data?.hire_me?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                            <span data-text="Dawnland CV">Dawnland CV</span>
                        </Link>

                        <Link className="button button-sm button-dot button-white mt-5 me-2 me-lg-3" 
                        href={data?.whatsapp_message}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                            <span data-text="Hire Me">Hire Me</span>
                        </Link>
                        </>
                    )}
                    {/* End Hire Me and CV */}
                </div>
                <div className="col-12 col-lg-4 order-lg-1">
                    <div className="row g-4 g-lg-5">
                        <div className="col-12 col-md-4 col-lg-12">
                            <h6 className="sm-heading" >Biography</h6>
                            <p dangerouslySetInnerHTML={{__html:data?.biography || ""}}/>
                        </div>
                        <div className="col-6 col-md-4 col-lg-12">
                            <h6 className="sm-heading">Skills</h6>
                            <ul className="list-inline-dot">
                                {data?.skills.map((item, index) => (
                                    <li key={index}>{item.name } </li> 
                                ))|| ""}
                            </ul>
                        </div>
                        <div className="col-6 col-md-4 col-lg-12">
                            <h6 className="sm-heading">Connect</h6>
                            <ul className="list-inline">
                                {data?.connect.map((item, index) => (
                                    <li key={index}>
                                        <Link className="button-circle button-circle-sm" href={item.url} aria-label="Social media link"
                                        target='blank'>
                                            <i className={item.bootstrap_icon}></i>
                                            <i className={item.bootstrap_icon}></i>
                                        </Link>
                                    </li>
                                )) || ""}
                            </ul>
                        </div>
                    </div> {/* end row(inner) */}
                </div>
                <div className="col-12 col-md-12 col-lg-4 order-lg-3 text-lg-end">
                    <div className="row g-4 g-lg-5">
                        <div className="col-4 col-lg-12">
                            <h6 className="sm-heading">Projects Done</h6>
                            <h1 className="fw-light display-4 mb-0 line-height-110">{data?.projects_done || ""}</h1>
                        </div>
                        <div className="col-4 col-lg-12">
                            <h6 className="sm-heading">Years of Experience</h6>
                            <h1 className="fw-light display-4 mb-0 line-height-110">{data?.years_of_experience || ""}</h1>
                        </div>
                        <div className="col-4 col-lg-12">
                            <h6 className="sm-heading">Worldwide Clients</h6>
                            <h1 className="fw-light display-4 mb-0 line-height-110">{data?.world_wide_clients || ""}</h1>
                        </div>
                    </div> {/* end row(inner) */}

                    {/* ===== Skills ====== */}
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        slidesPerView={5}
                        spaceBetween={12}
                        breakpoints={{
                            // when window width is >= 640px
                            640: {
                                slidesPerView: 5,
                                spaceBetween: 10,
                            },
                            // when window width is >= 768px
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 18,
                            },
                            // when window width is >= 1024px
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 18,
                            },
                        }}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        className="clients-swiper mt-4"
                    >
                        {data?.technologies.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="client-box">
                                    <Image 
                                    src={item.logo.url} alt={index}
                                    width={50} height={50}
                                    className='tech-logo'/>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div> {/* end row */}
        </div>
    )
}

export default About
