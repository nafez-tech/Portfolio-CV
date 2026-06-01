import React, { useState } from 'react'
import { Lightbox } from '@/components'
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import { API_ROUTES, fetchData } from '@/lib/API';
import { PostLoader } from '@/components/UI/SkeletonLoader/SkeletonLoader';

const ProjectPage = ({ project, prevProject, nextProject }) => {
    const [lightboxImage, setLightboxImage] = useState(null);

    const openLightbox = (image) => {
        setLightboxImage(image);
    };

    const closeLightbox = () => {
        setLightboxImage(null);
    };


    if (!project) {
            return (
            <main className="section p-5 mt-5 w-100">
                <PostLoader/>
            </main>
            )
        }

    return (
        <>
            <Head>
                <title>{project.title?.rendered || 'Project'}</title>
                <meta name="description" content={project.acf?.description || ''} />
                <meta name="keywords" content="portfolio, project" />
            </Head>

            <main>
                <div className="section">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                                <h1 className="display-3 fw-medium">{project.title?.rendered}<span className="text-gradient"></span></h1>
                                <p dangerouslySetInnerHTML={{ __html: project.acf?.description }} />
                            </div>
                        </div> {/* end row */}
                        <div className="row g-4 mt-5">
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="fancy-box">
                                    <h6 className="sm-heading mb-1">Services:</h6>
                                    <ul className="list-inline-dot">
                                        {/* Assuming services are in ACF or custom field */}
                                        {project.acf?.services ? project.acf?.services?.map((item, index) => (
                                            <li key={index}>
                                                {item.name}
                                            </li>
                                        )) : <li>No services listed</li>}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="fancy-box">
                                    <h6 className="sm-heading mb-1">Client:</h6>
                                    <p>{project.acf?.client || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="fancy-box">
                                    <h6 className="sm-heading mb-1">Project link:</h6>
                                    {project.acf?.projectlink ? (
                                        <Link className="link-hover" href={project.acf?.projectlink.url} target="_blank" >
                                            <span data-text={project.acf?.projectlink.title}>{project.acf?.projectlink.title}</span>
                                        </Link>
                                    ) : <p>No link available</p>}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="fancy-box">
                                    <h6 className="sm-heading mb-1">Duration:</h6>
                                    <p>{project.acf?.duration || 'N/A'}</p>
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
                                <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                                    <div dangerouslySetInnerHTML={{ __html: project.acf?.content }} />
                                </div>
                            </div> {/* end row */}
                            {/* Project Media */}
                            <div className="row g-4 g-lg-5 mt-1">
                                {project.acf?.mainimage && (
                                    <div className="col-12 mainimage">
                                        <Image className="border-radius w-100" src={project.acf?.mainimage.url} alt={project.title?.rendered} width={800} height={400} />
                                    </div>
                                )}
                                {/* Images Lightbox */}
                                {project.acf?.images_source.formatted_value && project.acf?.images_source?.formatted_value.map((item, index) => (
                                    <div key={index} className="col-12 col-md-6">
                                        <div onClick={() => openLightbox(item.url)}>
                                            <div className="lightbox-image-box border-radius">
                                                <Image src={item.url} alt={project.title?.rendered} width={400} height={300} />
                                                <div className="lightbox-icon">
                                                    <i className="bi bi-arrows-fullscreen"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="row mt-5">
                                    {prevProject ? (
                                        <div className="col-6">
                                            <Link href={`/portfolio/${prevProject.id}`} className="button">
                                                <span data-text="Prev Project">Prev Project</span>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="col-6">
                                            <button className="button btn-disabled" disabled>
                                                <span data-text="Prev Project">Prev Project</span>
                                            </button>
                                        </div>
                                    )}
                                    {nextProject ? (
                                        <div className="col-6 text-end">
                                            <Link href={`/portfolio/${nextProject.id}`} className="button">
                                                <span data-text="Next Project">Next Project</span>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="col-6 text-end">
                                            <button className="button btn-disabled" disabled>
                                                <span data-text="Next Project">Next Project</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div> {/* end container */}
                        </div>
                    </div>
                </div>
                {lightboxImage && (
                    <Lightbox image={lightboxImage} closeLightbox={closeLightbox} />
                )}
            </main>
        </>
    )
}

export async function getStaticPaths() {
    // Fetch all projects from the API
    const projects = await fetchData(API_ROUTES.GET_PROJECTS);

    // Generate paths for all projects
    const paths = projects.map((project) => ({
        params: { slug: project.id.toString() },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps({ params }) {
    const slug = params.slug;

    // Fetch all projects to find prev/next
    const allProjects = await fetchData(API_ROUTES.GET_PROJECTS);

    // Find the current project
    const project = allProjects.find((p) => p.id.toString() === slug);

    if (!project) {
        return {
            notFound: true,
        };
    }

    // Find prev and next projects
    const currentIndex = allProjects.findIndex((p) => p.id.toString() === slug);
    const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
    const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

    return {
        props: {
            project,
            prevProject,
            nextProject,
        },
        revalidate: 60,
    };
}


export default ProjectPage