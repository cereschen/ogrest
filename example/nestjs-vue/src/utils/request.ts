import axios from 'axios';

// create an axios instance
const service = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 600000, // request timeout
});

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data.data;
    return res;
  },
  (error) => {
    console.log('err' + error); // for debug
    return Promise.reject(error);
  },
);

export default service;
