import axios, {Axios, AxiosStatic} from "axios";

export const httpClient = axios.create({
    baseURL: process.env.SERVER_BASE_URL || "http://localhost:8080"
});

httpClient.interceptors.response.use(function (response) {
    return response.data;
}, (error) => {
    console.error(error.response);
    return Promise.reject(error)
});
