import axios from "axios";
import baseURL from "../config/config";

const axiosSevice = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosSevice;