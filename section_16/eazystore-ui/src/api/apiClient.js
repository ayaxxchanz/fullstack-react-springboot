import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json", // app send data in json format
        Accept: "application/json", // app receive data in json format
    },
    timeout: 10000,
    withCredentials: true,
});


// send jwtToken to backend for each request (especially to access protected page)
apiClient.interceptors.request.use(
    async (config) => {
        const jwtToken = localStorage.getItem("jwtToken");
        if(jwtToken){
            config.headers.Authorization = `Bearer ${jwtToken}`;
        }

        // Only fetch CSRF token for non-safe methods
        const safeMethods = ["GET", "HEAD", "OPTIONS"];
        if (!safeMethods.includes(config.method.toUpperCase())) {
        let csrfToken = Cookies.get("XSRF-TOKEN");
        if (!csrfToken) {
            await axios.get(`${import.meta.env.VITE_API_BASE_URL}/csrf-token`, {
            withCredentials: true,
            });
            csrfToken = Cookies.get("XSRF-TOKEN");
            if (!csrfToken) {
            throw new Error("Failed to retrieve CSRF token from cookies");
            }
        }
        config.headers["X-XSRF-TOKEN"] = csrfToken;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;