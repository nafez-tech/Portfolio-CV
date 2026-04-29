import React, { useEffect, useState } from 'react'
import { servicesData } from './ServicesData'
import { GET_SERVICES } from '@/lib/API';
import { ServicesLoader, TextLoader, TitleLoader } from '../UI/SkeletonLoader/SkeletonLoader';

const Services = () => {
    const [data, setData] = useState(null);
        useEffect(() => {
            const fetchData = async () => {
                const result = await GET_SERVICES();
                setData(result?.acf);
            };
    
            fetchData();
        }, []);
    return (
        <div id="services" className="section">
            <div className="container">
                <div className="row g-4 g-xl-5">
                    <div className="col-12 col-xl-4">
                        <span className="title-heading text-white-04">{servicesData.mainData.title || <TitleLoader/>}</span>
                        <h1 className="display-3 fw-medium mb-0">{servicesData.mainData.title2} <span className="text-gradient">{servicesData.mainData.title2Span}</span></h1>
                        <p className="text-white-04 mt-3">{data?.what_i_do_description || <TextLoader/>}</p>
                    </div>
                    <div className="col-12 col-xl-8">
                        <div className="row g-4">
                            {data?.what_i_do[0].services?.map((item, index) => (
                                <div key={index} className="col-12">
                                    <div className="service-box">
                                        <div className="service-order">
                                            <h3>{item.number}/</h3>
                                        </div>
                                        <div className="service-title">
                                            <i className={item.bootstrapicon}></i>
                                            <h3>{item.title}</h3>
                                        </div>
                                        <div className="service-text">
                                            <p>{item.services_description}</p>
                                        </div>
                                    </div>
                                </div>
                            )) || 
                            <>
                            <ServicesLoader/>
                            <ServicesLoader/>
                            <ServicesLoader/>
                            </>
                            }
                            {/* end Service box 3 */}
                        </div> {/* end row(inner) */}
                    </div>
                </div> {/* end row */}
            </div> {/* end container */}
        </div>
    )
}

export default Services