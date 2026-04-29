import React, { useEffect, useState } from 'react';
import { awardsData } from './ExperienceData'
import Image from 'next/image';
import { GET_MyWORK_EXPERIENCE } from '@/lib/API';
const Experience = () => {

    const [data, setData] = useState(null);
        useEffect(() => {
            const fetchData = async () => {
            const result = await GET_MyWORK_EXPERIENCE();
            setData(result);
            };
                
            fetchData();
        }, []);
    return (
        <div id="awards" className="section pb-50 mb-5">
            <div className="container">
                <div className="row g-4 g-xl-5">
                    <div className="col-12 col-xl-4">
                        <span className="title-heading text-white-04">{awardsData.mainData.title}</span>
                        <h1 className="display-3 fw-medium mb-0">{awardsData.mainData.title2}<span className="text-gradient">{awardsData.mainData.title2Span}</span></h1>
                    </div>
                    <div className="col-12 col-xl-8">
                        <div className="row g-4">
                            {data?.map((item) => (
                                <div key={item.id} className="col-12 col-md-6">
                                    <div className="fancy-box">
                                        <div className="d-flex justify-content-between align-content-center mb-3">
                                            <Image src={item?.acf.logo.url} width={70} height={50}
                                            className="rounded-2 company-logo" 
                                            alt={item.title.rendered}
                                            />
                                            <h4>{item?.acf.company_name}</h4>
                                        </div>
                                        <div className="d-flex justify-content-between align-content-center mb-3">
                                        <h6 className="sm-heading text-white-04 mb-2">
                                            From: {item?.acf.start_date}</h6>
                                        <h6 className="sm-heading text-white-04 mb-2">
                                            To: {item?.acf.end_data}</h6>
                                        </div>
                                        <h6 className="d-flex gap-2 align-content-center mb-3">
                                            <i className={item.acf.postion.bootstrapicon}></i>
                                            {item?.acf.postion.title}
                                        </h6>
                                        <p>{item?.acf.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div> {/* end row(inner) */}
                    </div>
                </div> {/* end row */}
            </div> {/* end container */}
        </div>
    )
}

export default Experience