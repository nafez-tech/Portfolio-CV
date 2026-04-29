import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import { API_ROUTES, fetchData } from '@/lib/API';
import { TextLoader } from '@/components/UI/SkeletonLoader/SkeletonLoader';

const BlogPage = ({ post, prevPost, nextPost }) => {
    if (!post) {
        return <div>Loading...</div>;
    }
    const [author, setAuthor] = useState(null)
    const [categories, setCategories] = useState(null)
    const [featuredMedia, setFeaturedMedia] = useState(null)
    const [tags, setTags] = useState(null)
    useEffect( ()=> {
        const getAuthor = async()=>{
            try {
            const user = await fetchData(API_ROUTES.GET_USERS + "/" + post.author);
            setAuthor(user.name);
        } catch (error) {
            console.error("Failed to fetch user:", error);
        }}

        const getCategories = async()=>{
            try {
            const categories = await fetchData(API_ROUTES.GET_CATEGORIES + "/" + post.categories);
            setCategories(categories.name);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }}

        const getFeaturedMedia = async()=>{
            try {
            const featuredMedia = await fetchData(API_ROUTES.GET_MEDIA + "/" + post.featured_media);
            setFeaturedMedia(featuredMedia.guid.rendered);
        } catch (error) {
            console.error("Failed to fetch featuredMedia:", error);
        }}
        // GET_TAGS
        const getTags = async()=>{
            try {
            const tags = await fetchData(API_ROUTES.GET_TAGS + "?post=" + post.id);
            setTags(tags);
        } catch (error) {
            console.error("Failed to fetch Tags:", error);
        }}

        getAuthor();
        getCategories();
        getFeaturedMedia();
        getTags();
    },[post])

    return (
        <>
            <Head>
                <title>{post.title?.rendered + " - Abdallah Ashraf Studio" || 'Post'}</title>
                <meta name="description" content={post.rank_math?.description || ''} />
                <meta name="keywords" content={post.rank_math?.keywords || ''} />
            </Head>

            <main>
                <div className="section">
                    <div className="section-sm border-radius-1 p-5 position-relative overflow-hiden" 
                      style={{ 
                        background: featuredMedia 
                        ? `url(${featuredMedia}) no-repeat center/cover` 
                        : 'none' 
                        }}>
                        <div className="ovarlay bg-dark opacity-75 position-absolute w-100 h-100 top-0 start-0 z-1"></div>
                        <div className="row position-relative z-2 ">
                            <div className="col-12 col-md-10 col-lg-8">
                                <h1 className="display-3 fw-medium">
                                    {post.title?.rendered}<span className="text-gradient"></span></h1>
                                <p dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || <TextLoader/> }} />
                            </div>
                        </div> 
                        {/* end row */}
                        <div className="row g-4 mt-5">
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="fancy-box">
                                    <h6 className="sm-heading mb-1">Tags:</h6>
                                    <ul className="list-inline-dot">
                                        {/* Assuming services are in ACF or custom field */}
                                        {tags ? tags.map((item, index) => (
                                            <li key={index}>
                                                {item.name}
                                            </li>
                                        )) : <li>No tags listed</li>}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="fancy-box">
                                    <h6 className="sm-heading mb-1">Author:</h6>
                                    <p className="text-capitalize">{author || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="fancy-box">
                                    <h6 className="sm-heading mb-1">Categories:</h6>
                                    {categories ? (
                                        <span>{categories}</span>
                                    ) : <p>No categories available</p>}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="fancy-box">
                                    <h6 className="sm-heading mb-1">Date:</h6>
                                    <p>{post.date? post.date.split('T')[0] : 'N/A'}</p>
                                </div>
                            </div>
                        </div> {/* end row */}
                    </div> {/* end container */}
                </div>

                <div className="section-box">
                    <div className="section-sm bg-dark border-radius-1">
                        <div className="container">
                            {/* Text */}
                            <div className="row">
                                <div className="col-12 ">
                                    <div dangerouslySetInnerHTML={{ __html: post.content?.rendered }} />
                                </div>
                            </div> {/* end row */}
                            {/* Project Media */}
                            <div className="row g-4 g-lg-5 mt-1">
                                {featuredMedia && (
                                    <div className="col-12 mainimage">
                                        <Image className="border-radius w-100" src={featuredMedia} alt={post.title?.rendered} width={800} height={400} />
                                    </div>
                                )}
                                
                                <div className="row mt-5">
                                    {prevPost ? (
                                        <div className="col-6">
                                            <Link href={`/blog/${prevPost.id}`} className="button">
                                                <span data-text="Prev Post">Prev Post</span>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="col-6">
                                            <button className="button btn-disabled" disabled>
                                                <span data-text="Prev Post">Prev Post</span>
                                            </button>
                                        </div>
                                    )}
                                    {nextPost ? (
                                        <div className="col-6 text-end">
                                            <Link href={`/blog/${nextPost.id}`} className="button">
                                                <span data-text="Next Post">Next Post</span>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="col-6 text-end">
                                            <button className="button btn-disabled" disabled>
                                                <span data-text="Next Post">Next Post</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div> {/* end container */}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export async function getStaticPaths() {
    // Fetch all posts from the API
    const posts = await fetchData(API_ROUTES.GET_POSTS);

    // Generate paths for all posts
    const paths = posts.map((post) => ({
        params: { id: post.id.toString() },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const id = params.id;

    // Fetch all posts to find prev/next
    const allPosts = await fetchData(API_ROUTES.GET_POSTS);

    // Find the current post
    const post = allPosts.find((p) => p.id.toString() === id);

    if (!post) {
        return {
            notFound: true,
        };
    }

    // Find prev and next posts
    const currentIndex = allPosts.findIndex((p) => p.id.toString() === id);
    const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

    return {
        props: {
            post,
            prevPost,
            nextPost,
        },
    };
}


export default BlogPage