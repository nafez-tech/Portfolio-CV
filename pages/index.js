import Head from 'next/head'
import { mainData } from '@/lib/data'
import { About, Awards, Blog, Clients, Contact, Hero, Portfolio, Services, Testimonial } from '@/components'
import React, { useEffect, useState } from 'react'
import {GET_AboutData} from '@/lib/API';

export default function Home() {
    const [data, setData] = useState(null);
        useEffect(() => {
            const fetchData = async () => {
                const result = await GET_AboutData();
                setData(result);
            };
    
            fetchData();
        }, []);
    return (
        <>
            <Head>
                <title>{data?.rank_math.title || mainData.websiteTitle}</title>
                <meta name="description" content={data?.rank_math.description || mainData.description} />
                <meta name="keywords" content={data?.rank_math.keywords || mainData.keywords} />
            </Head>
            <main>
                {/* Hero section */}
                <Hero />
                {/* About section */}
                <About/>
                {/* Services section */}
                <Services />
                {/* Experience section */}
                <Awards />
                {/* Clients section */}
                <Clients />
                {/* Portfolio section */}
                <Portfolio />
                {/* Testimonial section */}
                <Testimonial />
                {/* Blog section */}
                <Blog />
                {/* Contact section */}
                <Contact />
                {/* Footer section */}
            </main>
        </>
    )
}
