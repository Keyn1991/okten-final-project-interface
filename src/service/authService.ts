import axios from 'axios';

import {OrderListResponse} from "../interface/interface";
import baseURL from "../config/config";
import axiosSevice from "./axiosService";





const OrderService = {
    getOrders: async (page: number) => {
        return axios.get<OrderListResponse>(`${baseURL}/orders?page=${page}`);
    },
};


const login = async (email: string, password: string) => {
    return await axiosSevice.post('/login', { email, password });
};

export {login, OrderService};
