'use client';

import React, { useEffect, useRef, useState } from 'react';
import { portfolioData } from './PortfolioData';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Link from 'next/link';
import { GET_MyPROJECTS } from '@/lib/API';

import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';


const Portfolio = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const sliderRef = useRef(null);

    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
        const result = await GET_MyPROJECTS();
        setData(result);
        };
            
        fetchData();
    }, []);

    const updateNavigation = (swiper) => {
        if (prevRef.current && nextRef.current) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.update();
        }
    };

    useEffect(() => {
        if (sliderRef.current) {
            updateNavigation(sliderRef.current);
        }
    }, []);
    
    return (
        <div id="portfolio" className="section-box">
            <div className="section-sm bg-dark border-radius-1">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                            <span className="title-heading text-white-04">{portfolioData.mainData.title}</span>
                            <h1 className="display-3 fw-medium">{portfolioData.mainData.title2} <span className="text-gradient">{portfolioData.mainData.title2Span}</span></h1>
                            <p>{portfolioData.mainData.description}</p>
                            {/* Slider Nav */}
                            <div className="mt-4">
                                <button className="swiper-portfolio-prev button-circle cursor-link" onClick={() => sliderRef.current?.slidePrev()} aria-label="Prev Slide">
                                    <i className="bi bi-arrow-left"></i>
                                    <i className="bi bi-arrow-left"></i>
                                </button>
                                <button className="swiper-portfolio-next button-circle cursor-link" onClick={() => sliderRef.current?.slideNext()} aria-label="Prev Slide">
                                    <i className="bi bi-arrow-right"></i>
                                    <i className="bi bi-arrow-right"></i>
                                </button>
                            </div>
                            {/* end Slider Nav */}
                        </div>
                    </div> {/* end row */}
                    {data && data.length > 0 && (
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        onSwiper={(swiper) => {
                            sliderRef.current = swiper;
                            swiper.on('init', () => {
                                updateNavigation(swiper);
                            });
                        }}
                        slidesPerView={1}
                        spaceBetween={30}
                        breakpoints={{
                            // when window width is >= 640px
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 30,
                            },
                            // when window width is >= 768px
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            // when window width is >= 1024px
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 18,
                            },
                        }}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        className="portfolio-slider mt-4 mt-lg-5"
                    >
                        {data?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="portfolio-box">
                                    {/* Image */}
                                    <div className="portfolio-img position-relative">
                                        <Link href={item?.acf?.projectlink.url}
                                            target="_blank" rel="noopener noreferrer">
                                            <Image src={item?.acf.mainimage?.url} alt={item?.acf.mainimage?.alt} 
                                                width={600} height={400}
                                            />
                                            <h3 className="portfolio-overlay position-absolute d-flex gap-2 fs-5">
                                                <i className="bi bi-eye"></i>
                                                Live Preview
                                            </h3>
                                        </Link>
                                    </div>
                                    <div className="pt-4">
                                        {/* Categories */}
                                    <div className="d-flex gap-2 mb-3 align-content-center">
                                        <i class="bi bi-globe text-gradient"></i>
                                        <ul className="list-inline-dot sm-heading text-white mb-2 mt-1">
                                            {item._embedded['wp:term']?.[0]?.map((item, index) => (
                                                <li key={index}>
                                                    <span data-text={item.name}>{item.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                        {/* Caption */}
                                        <h2>
                                            <Link className="portfolio-caption" href={`portfolio/${item.id}`}>
                                                <i className="bi bi-arrow-right"></i>
                                                {item.title.rendered}
                                            </Link>
                                        </h2>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    )}
                </div> {/* end container */}
            </div>
        </div>
    )
}

export default Portfolio