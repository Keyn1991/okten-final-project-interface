import axios from 'axios';

export const OrderService = {
    getOrders: async (page: number, sortColumn?: string, sortDirection?: string) => {
        try {
            const response = await axios.get(`/api/orders?page=${page}&sortColumn=${sortColumn}&sortDirection=${sortDirection}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching orders');
        }
    },
    // Other methods...
};

export default OrderService