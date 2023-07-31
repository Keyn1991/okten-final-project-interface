import axios from "axios";

import baseURL from "../config/config";

const axiosService = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosService;