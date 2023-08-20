import React, {useState} from 'react';

import {Button, Collapse, TableCell, TableRow, TextField, Typography} from '@mui/material';
import {Order, OrderCardProps} from '../../interface/order.Interface';
import {OrderService} from '../../service';

const OrderCard: React.FC<OrderCardProps> = ({ order, index, currentPage }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [comment, setComment] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [newGroup, setNewGroup] = useState('');

    const calculateOrderId = () => {
        const orderId = (currentPage - 1) * 25 + index + 1;
        return orderId;
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const handleGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewGroup(event.target.value);
    };

    const handleSubmitComment = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!order.manager) {
            const currentManager: string | null = null;
            const updatedOrder: Order = {
                ...order,
                manager: currentManager,
                status: order.status === null || order.status === 'New' ? 'In Work' : order.status,
                comment: {
                    text: comment,
                    author: getCurrentUser() || null,
                    date: new Date().toISOString(),
                },
            };

            try {
                await OrderService.updateOrder(updatedOrder);
            } catch (error: any) {
                console.error('Помилка при оновленні замовлення:', error.message);
            }
        }
        setComment('');
    };

    // const handleEditOrder = () => {
    //     if (!order.manager) {
    //         setEditMode(true);
    //     }
    // };

    const handleCancelEdit = () => {
        setEditMode(false);
        setNewGroup('');
    };

    const handleSubmitEdit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const updatedOrder: Order = {
            ...order,
            group: newGroup || order.group,
        };

        try {
            await OrderService.updateOrder(updatedOrder);
            setEditMode(false);
            setNewGroup('');
        } catch (error: any) {
            console.error('Помилка при оновленні замовлення:', error.message);
        }
    };

    const getCurrentUser = (): string | null => {
        return null;
    };

    return (
        <>
            <TableRow key={index} onClick={toggleExpand}>
                <TableCell>{calculateOrderId()}</TableCell>
                <TableCell>{order.surname}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>{order.age}</TableCell>
                <TableCell>{order.course}</TableCell>
                <TableCell>{order.course_format}</TableCell>
                <TableCell>{order.course_type}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.sum}</TableCell>
                <TableCell>{order.alreadyPaid}</TableCell>
                <TableCell>{order.created_at}</TableCell>
                <TableCell>{order.created_at}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={14}>
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        {/* Additional user information */}
                        <Typography variant="body2">Additional information</Typography>
                        <Typography variant="body2">Message: {order.message}</Typography>
                        <Typography variant="body2">UTM: {order.utm}</Typography>
                        {!order.manager ? (
                            <form onSubmit={handleSubmitComment}>
                                <TextField
                                    type="text"
                                    placeholder="Enter comment"
                                    value={comment}
                                    onChange={handleCommentChange}
                                />
                                <Button type="submit" variant="contained">
                                    Submit Comment
                                </Button>
                            </form>
                        ) : (
                            <Typography variant="body2">Manager: {order.manager}</Typography>
                        )}
                    </Collapse>
                    {editMode && !order.manager && (
                        <div>
                            {/* Edit form */}
                            <form onSubmit={handleSubmitEdit}>
                                <TextField
                                    type="text"
                                    placeholder="Enter new group"
                                    value={newGroup}
                                    onChange={handleGroupChange}
                                />
                                <Button type="submit" variant="contained">
                                    Submit Edit
                                </Button>
                                <Button type="button" variant="contained" onClick={handleCancelEdit}>
                                    Cancel Edit
                                </Button>
                            </form>
                        </div>
                    )}
                </TableCell>
            </TableRow>
        </>
    );
};

export default OrderCard;
