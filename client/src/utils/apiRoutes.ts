const BASEURL = process.env.NEXT_PUBLIC_SERVER_URL as string;

export const apiRoute = {
  //basic
  login: `${BASEURL}/user/login`,
  verify: `${BASEURL}/user/verify`,
  register: `${BASEURL}/user/create`,
  forgotPassword: `${BASEURL}/user/forgot-password`,
  verifyForgotPassword: `${BASEURL}/user/verify-password`,
  changePassword: `${BASEURL}/user/change-password`,
  resetPassword: `${BASEURL}/user/reset-password`,

  //merchant
  //size
  size: `${BASEURL}/merchant/size`,

  //product
  product: `${BASEURL}/merchant/product`,

  //colorzzz
  color: `${BASEURL}/merchant/color`,

  //category
  categoryMerchant: `${BASEURL}/merchant/category`,

  //admin
  //category
  category: `${BASEURL}/admin/category`,

  //banner
  banner: `${BASEURL}/admin/banner`,
};
