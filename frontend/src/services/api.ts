import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const api = axios.create({
    baseURL :  import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
    headers:{
        'Content-Type':'application/json',
    },
});

api.interceptors.request.use((config:InternalAxiosRequestConfig)=>{
    const token = localStorage.getItem("access");

    if(token && config.headers){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) =>{
        const originalRequest = error.config as InternalAxiosRequestConfig & {_retry? : boolean};

        if(error.response?.status===401 && !originalRequest._retry){
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem("refresh");

            if(refreshToken){
                try{
                    const response = await axios.post(`${api.defaults.baseURL}/token/refresh/`,{
                        refresh:refreshToken,
                    });
                    const {access} = response.data;
                    localStorage.setItem("access",access);

                    originalRequest.headers.Authorization = `Bearer ${access}`;
                    return api(originalRequest);

                }catch (refreshError){
                    localStorage.removeItem("access");
                    localStorage.removeItem("refresh");
                    window.location.href = "/login"; 
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;