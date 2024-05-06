import axios from 'axios';

window.axios = axios;
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';


axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers["x-api-key"] = 'f4279730-f3f0-463b-bc4a-c1ad8bf10e5d';
    config.headers['Accept-Language'] = "ko"; //value ko or en 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});

// Token expire redirection
// axios.interceptors.response.use((response) => {
//     return response
// }, async function (error) {
//     if (error.response.status === 403) {
//         // Toast.fire({ title: "Session Expired" });
//         window.location.href = '/login';
//         localStorage.clear();
//         return axios(originalRequest);

//     }
//     return Promise.reject(error);
// });