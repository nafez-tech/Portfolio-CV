import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import { API_ROUTES, fetchData } from '@/lib/API';
import { PostLoader } from '@/components/UI/SkeletonLoader/SkeletonLoader';

const BlogPage = ({ post, prevPost, nextPost }) => {
    

    if (!post) {
        return (
        <main className="section p-5 mt-5 w-100">
            <PostLoader/>
        </main>
        )
    }

    return (
        <>
            <Head>
                <title>{post.title?.rendered + " - Abdallah Ashraf Studio" || 'Post'}</title>
                <meta name="description" content={post.rank_math?.description || ''} />
                <meta name="keywords" content={post.rank_math?.keywords || ''} />
            </Head>

            <main>
                <div className="section">
                    <div className="container">
                        <div className="row ">
                            <div className="col-12 col-md-10 col-lg-8">
                                <h1 className="display-3 fw-medium">
                                    {post.title?.rendered}<span className="text-gradient"></span></h1>
                                <p dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || "" }} />
                            </div>
                        </div> 
                        {/* end row */}
                        <div className="row g-4 mt-5">
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="fancy-box">
                                    <h6 className="sm-heading mb-1">Tags:</h6>
                                    <ul className="list-inline-dot">
                                        {/* Assuming services are in ACF or custom field */}
                                        {post ? post?._embedded?.["wp:term"]?.[1]?.map((item) => (
                                            <li key={item.id}>
                                                {item.name}
                                            </li>
                                        )) : <li>No tags listed</li>}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="fancy-box">
                                    <h6 className="sm-heading mb-1">Author:</h6>
                                    <p className="text-capitalize">{post?._embedded?.author[0]?.name || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="fancy-box">
                                    <h6 className="sm-heading mb-1">Categories:</h6>
                                    <ul className="list-inline-dot">
                                        {post ? post?._embedded?.["wp:term"]?.[0]?.map((item) => (
                                            <li key={item.id}>
                                                {item.name}
                                            </li>
                                        )) : <li>No Categories listed</li>}
                                    </ul>
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
                                {post && (
                                    <div className="col-12 mainimage">
                                        <Image className="border-radius w-100" src={post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url} alt={post.title?.rendered} width={800} height={400} />
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
        fallback: 'blocking',
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
        revalidate: 60,
    };
}


export default BlogPage