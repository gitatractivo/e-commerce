const BASEURL = process.env.SERVER_URL as string;

export const apiRoute = {
    login : `${BASEURL}/user/login`,
    verify : `${BASEURL}/user/verify`,
    register : `${BASEURL}/user/register`,
}