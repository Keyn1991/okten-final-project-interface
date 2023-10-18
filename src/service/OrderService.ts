import axios from 'axios';

import {Order, OrderListResponse} from "../interface/order.Interface";
import baseURL from "../config/config";

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

            return response.data;
        } catch (error) {
            console.error('Error updating order:', error);
            throw error;
        }
    },


    getOrders: async (page: number, sortConfig: { key: string; direction: 'asc' | 'desc' } | null, filter: string) => {
        try {
            const response = await axios.get<OrderListResponse>(`${baseURL}/orders`, {
                params: {
                    page,
                    sort: sortConfig ? sortConfig.direction : undefined,
                    sortBy: sortConfig ? sortConfig.key : undefined,
                    filter: filter ? filter : undefined,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    },
};
export default OrderService;
