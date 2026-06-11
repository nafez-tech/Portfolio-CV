const BASE_URL = 'https://projects.nafeztech.com/wp-json/wp/v2';
const ROOT_URL = 'https://projects.nafeztech.com';
export const API_ROUTES = {
    GET_ABOUT_DATA: `${BASE_URL}/about-data`,
    GET_WHAT_I_DO_SERVICES: `${BASE_URL}/what-i-do-services`,
    GET_CLIENTS: `${BASE_URL}/clients`,
    GET_PROJECTS: `${BASE_URL}/my-portofolio?_embed&per_page=30`,
    GET_WORK_EXPERIENCE: `${BASE_URL}/work-experience`,
    GET_TESTIMONIALS: `${BASE_URL}/testimonial`,
    GET_POSTS: `${BASE_URL}/posts?_embed`,
    GET_USERS: `${BASE_URL}/users`,
    GET_CATEGORIES: `${BASE_URL}/categories`,
    GET_MEDIA: `${BASE_URL}/media`,
    GET_TAGS: `${BASE_URL}/tags`,
    POST_CONTACT: `${ROOT_URL}/wp-json/custom/v1/contact`,
};
export async function fetchData(url) {
    try {
        const response = await fetch(url, {
            next: { revalidate: 60 }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        // console.error('Fetch Error:', error);
        return null;
    }
}

export async function GET_AboutData() {
    const data = await fetchData(API_ROUTES.GET_ABOUT_DATA);
    // console.log("Fetched About Data:", data[0]);
    return data[0] || "No data";
}

export async function GET_SERVICES() {
    const data = await fetchData(API_ROUTES.GET_WHAT_I_DO_SERVICES);
    // console.log("Fetched Services Data:", data[0]);
    return data[0] || "No data";
}
export async function GET_MyCLIENTS() {
    const data = await fetchData(API_ROUTES.GET_CLIENTS);
    // console.log("Fetched Clients Data:", data[0]);
    return data[0] || "No data";
}
export async function GET_MyPROJECTS() {
    const data = await fetchData(API_ROUTES.GET_PROJECTS);
    // console.log("Fetched Projects Data:", data[0]);
    return data || "No data";
}
export async function GET_MyWORK_EXPERIENCE() {
    const data = await fetchData(API_ROUTES.GET_WORK_EXPERIENCE);
    // console.log("Fetched Projects Data:", data[0]);
    return data || "No data";
}
export async function GET_MyTESTIMONIALS() {
    const data = await fetchData(API_ROUTES.GET_TESTIMONIALS);
    // console.log("Fetched Projects Data:", data[0]);
    return data || "No data";
}
export async function GET_MyPOSTS() {
    const data = await fetchData(API_ROUTES.GET_POSTS);
    // console.log("Fetched Projects Data:", data[0]);
    return data || "No data";
}
