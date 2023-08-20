import axios from 'axios';

import {Order, OrderListResponse} from "../interface/order.Interface";
import baseURL from "../config/config";
import axiosService from "./axiosService";

const OrderService = {

    updateOrder: async (updatedOrder: Order) => {
        try {
            const response = await axios.put(`${baseURL}/orders/${updatedOrder.id}`, updatedOrder, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.data.success) {
                throw new Error('Failed to update order');
            }

            // Handle successful update if needed
            return response.data;
        } catch (error) {
            console.error('Error updating order:', error);
            throw error;
        }
    },

    getOrders: async (page: number, sortConfig: { key: string; direction: 'asc' | 'desc' } | null, filter: string) => {
        let timer: NodeJS.Timeout | null = null;

        return new Promise<OrderListResponse>((resolve, reject) => {
            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(async () => {
                try {
                    const params: { [key: string]: any } = {
                        page,
                        sort: sortConfig?.direction,
                    };

                    if (filter) {
                        params.filter = filter;
                    }

                    const response = await axios.get<OrderListResponse>(`${baseURL}/orders`, { params });
                    resolve(response.data);
                } catch (error) {
                    console.error('Error fetching orders:', error);
                    reject(error);
                }
            }, 500);
        });
    },
};
const login = async (email: string, password: string) => {
    return await axiosService.post('/login', { email, password });
};

export const isAuthenticated = () => {
    const accessToken = localStorage.getItem('access_token');
    return !!accessToken;
};

export const logout = () => {
    localStorage.removeItem('access_token');
};

export {login, OrderService};
