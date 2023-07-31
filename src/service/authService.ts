import axios from 'axios';

import {Order, OrderListResponse} from "../interface/interface";
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
        const params = {
            page,
            sort: sortConfig?.direction,
            filter,
        };

        try {
            const response = await axios.get<OrderListResponse>(`${baseURL}/orders`, { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
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
