import axios from 'axios'

const http = axios.create({
  withCredentials: false,
})
// 添加请求拦截器

http.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    console.error('Response Error:', error);

    if (error.response) {
      // 服务器返回了错误状态码
      console.error('Status Code:', error.response.status);
      console.error('Response Data:', error.response.data);
    } else if (error.request) {
      // 请求发送了，但没有收到响应
      console.error('No response received:', error.request);
    } else {
      // 请求未能发送
      console.error('Error sending request:', error.message);
    }

    return Promise.reject(error);
  }
);
// 添加响应拦截器
http.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, (error) => {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export { http }