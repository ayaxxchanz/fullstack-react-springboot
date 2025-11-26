import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json", // app send data in json format
        Accept: "application/json", // app receive data in json format
    },
    timeout: 10000,
});


// send jwtToken to backend for each request (especially to access protected page)
apiClient.interceptors.request.use(
    async (config) => {
        const jwtToken = localStorage.getItem("jwtToken");
        if(jwtToken){
            config.headers.Authorization = `Bearer ${jwtToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

export default apiClient;