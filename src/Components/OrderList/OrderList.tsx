import React, { useEffect, useState } from 'react';

import { Table } from 'react-bootstrap';
import CustomPagination from '../CustomPagination/CustomPagination';
import { Order } from '../../interface/interface';
import { OrderService } from '../../service/authService';
import OrderCard from '../OrderCard/OrderCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

    useEffect(() => {
        fetchOrders(currentPage);
    }, [currentPage]);

    const fetchOrders = async (page: number) => {
        try {
            const response = await OrderService.getOrders(page);
            const { orders, totalPages } = response.data;
            setOrders(orders);
            setTotalPages(totalPages);

            const url = new URL(window.location.href);
            url.searchParams.set('page', page.toString());
            window.history.pushState({ path: url.href }, '', url.href);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchOrders(page);
    };

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        sortOrders(key, direction);

        const url = new URL(window.location.href);
        url.searchParams.set('sort', key);

        window.history.pushState({ path: url.href }, '', url.href);
    };

    const sortOrders = (key: string, direction: 'asc' | 'desc') => {
        const sortedOrders = [...orders];
        sortedOrders.sort((a, b) => {
            const aValue = a[key];
            const bValue = b[key];

            if (aValue < bValue) {
                return-1;
            }
            if (aValue > bValue) {
                return 1;
            }
            return 0;
        });

        if (direction === 'desc') {
            sortedOrders.reverse();
        }

        setOrders(sortedOrders);
    };

    return (
        <div className="pagination-container">
            <Table striped bordered hover size="sm">
                <thead>
                <tr className="table-success">
                    <th onClick={() => handleSort('id')} className={sortConfig?.key === 'id' ? 'table-active' : ''}>
                        id
                    </th>
                    <th onClick={() => handleSort('surname')} className={sortConfig?.key === 'surname' ? 'table-active' : ''}>
                        Surname
                    </th>
                    <th onClick={() => handleSort('name')} className={sortConfig?.key === 'name' ? 'table-active' : ''}>
                        Name
                    </th>
                    <th onClick={() => handleSort('email')} className={sortConfig?.key === 'email' ? 'table-active' : ''}>
                        Email
                    </th>
                    <th onClick={() => handleSort('phone')} className={sortConfig?.key === 'phone' ? 'table-active' : ''}>
                        Phone
                    </th>
                    <th onClick={() => handleSort('age')} className={sortConfig?.key === 'age' ? 'table-active' : ''}>
                        Age
                    </th>
                    <th onClick={() => handleSort('course')} className={sortConfig?.key === 'course' ? 'table-active' : ''}>
                        Course
                    </th>
                    <th onClick={() => handleSort('course_format')} className={sortConfig?.key === 'course_format' ? 'table-active' : ''}>
                        Course Format
                    </th>
                    <th onClick={() => handleSort('course_type')} className={sortConfig?.key === 'course_type' ? 'table-active' : ''}>
                        Course Type
                    </th>
                    <th onClick={() => handleSort('status')} className={sortConfig?.key === 'status' ? 'table-active' : ''}>
                        Status
                    </th>
                    <th onClick={() => handleSort('sum')} className={sortConfig?.key === 'sum' ? 'table-active' : ''}>
                        Sum
                    </th>
                    <th onClick={() => handleSort('alreadyPaid')} className={sortConfig?.key === 'alreadyPaid' ? 'table-active' : ''}>
                        Already Paid
                    </th>
                    <th onClick={() => handleSort('date')} className={sortConfig?.key === 'date' ? 'table-active' : ''}>
                        Date
                    </th>
                    <th onClick={() => handleSort('created_at')} className={sortConfig?.key === 'created_at' ? 'table-active' : ''}>
                        Created At
                    </th>
                </tr>

                </thead>
                <tbody>
                {orders.map((order: Order, index: number) => (
                    <OrderCard
                        order={order}
                        index={index}
                        currentPage={currentPage}
                        author={order.author}
                    />
                ))}
                </tbody>
            </Table>

            <CustomPagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
        </div>
    );
};

export default OrderList;
