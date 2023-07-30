import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CustomPagination from "../CustomPagination/CustomPagination";
import OrderCard from "../OrderCard/OrderCard";
import { Order } from "../../interface/interface";
import { Table } from "react-bootstrap";
import { Input } from "@mui/material";

interface OrderTableProps {}

const OrderList: React.FC<OrderTableProps> = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
    const [filter, setFilter] = useState<string>('');

    const handleSort = (key: string) => {
        setSortConfig((prevSortConfig) => {
            if (prevSortConfig && prevSortConfig.key === key) {
                // If the same column header is clicked, toggle the sort direction
                return { key, direction: prevSortConfig.direction === 'asc' ? 'desc' : 'asc' };
            }
            // If a different column header is clicked, set the default sort direction as 'asc'
            return { key, direction: 'asc' };
        });
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    useEffect(() => {
        // Fetch orders data from the server
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/orders', {
                    params: {
                        page: currentPage,
                        sort: sortConfig?.direction,
                        filter,
                    },
                });
                setOrders(response.data.orders);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();

        // Змінюємо адресу у браузері під час пагінації
        window.history.replaceState({}, '', `/page/${currentPage}`);
    }, [currentPage, sortConfig, filter]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };



    return (
        <div>
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


            {/* Filter input */}
            <div>
                <Input
                    type="text"
                    value={filter}
                    onChange={handleFilterChange}
                    placeholder="Filter by name..."
                />
            </div>
        </div>
    );
};

export default OrderList;
