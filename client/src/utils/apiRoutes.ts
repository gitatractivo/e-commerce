const BASEURL = process.env.NEXT_PUBLIC_SERVER_URL as string;

export const apiRoute = {
  login: `${BASEURL}/user/login`,
  verify: `${BASEURL}/user/verify`,
  register: `${BASEURL}/user/create`,
  forgotPassword: `${BASEURL}/user/forgot-password`,
  verifyForgotPassword: `${BASEURL}/user/verify-password`,
  changePassword: `${BASEURL}/user/change-password`,
  resetPassword: `${BASEURL}/user/reset-password`,
};