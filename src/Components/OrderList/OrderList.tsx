import React, {useEffect, useState} from 'react';

import {Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomPagination from '../CustomPagination/CustomPagination';
import {Order} from '../../interface/interface';
import {OrderService} from "../../service/authService";

const OrderList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);

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

    const calculateOrderId = (index: number) => {
        const orderId = (currentPage - 1) * 25 + index + 1;
        return orderId;
    };

    return (
        <div className="pagination-container">
            <Table striped bordered hover size="sm">
                <thead>
                <tr className="table-success">
                    <th>id</th>
                    <th>Surname</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Age</th>
                    <th>Course</th>
                    <th>Course Format</th>
                    <th>Course Type</th>
                    <th>Status</th>
                    <th>Sum</th>
                    <th>Already Paid</th>
                    <th>Date</th>
                    <th>Created At</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => (
                    <tr key={index}>
                        <td>{calculateOrderId(index)}</td>
                        <td>{order.surname}</td>
                        <td>{order.name}</td>
                        <td>{order.email}</td>
                        <td>{order.phone}</td>
                        <td>{order.age}</td>
                        <td>{order.course}</td>
                        <td>{order.course_format}</td>
                        <td>{order.course_type}</td>
                        <td>{order.status}</td>
                        <td>{order.sum}</td>
                        <td>{order.alreadyPaid}</td>
                        <td>{order.created_at}</td>
                        <td>{order.created_at}</td>
                    </tr>
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
