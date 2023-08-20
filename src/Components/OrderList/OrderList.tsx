import React, {useEffect, useState} from 'react';

import {Order, OrderTableProps} from "../../interface/order.Interface";
import {Table} from "react-bootstrap";
import {Input} from "@mui/material";

import {isAuthenticated, logout, OrderService} from "../../service";
import CustomPagination from "../CustomPagination/CustomPagination";
import OrderCard from "../OrderCard/OrderCard";
import {Link, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";



const OrderList: React.FC<OrderTableProps> = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
    const [filter, setFilter] = useState<string>('');

    const navigate = useNavigate();
    const handleSort = (key: string) => {
        setSortConfig((prevSortConfig) => {
            if (prevSortConfig && prevSortConfig.key === key) {
                return { key, direction: prevSortConfig.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { key, direction: 'asc' };
        });
        setCurrentPage(1);
    };
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await OrderService.getOrders(currentPage, sortConfig, filter);
                setOrders(response.orders);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();

        const params = new URLSearchParams();
        params.append('page', currentPage.toString());

        if (sortConfig) {
            params.append('sort', sortConfig.direction);
            params.append('sortBy', sortConfig.key);
        }

        if (filter) {
            params.append('filter', filter);
        }

        const newURL = `?${params.toString()}`;
        window.history.replaceState({}, '', newURL);
    }, [currentPage, sortConfig, filter]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };



    return (
        <div>
            {isAuthenticated() ? (
                <Button onClick={handleLogout}>Вийти</Button>
            ) : (
                <Link to="/login">Вийти</Link>
            )}
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
                        key={index}
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
