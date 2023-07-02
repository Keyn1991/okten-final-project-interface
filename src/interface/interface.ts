export interface Order {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    age: number;
    course: string;
    course_format: string;
    course_type: string;
    status: string;
    sum: number;
    alreadyPaid: number;
    created_at: string;
}

export interface OrderListResponse {
    orders: Order[];
    totalOrders: number;
    totalPages: number;
}
export interface CustomPaginationProps {
    totalPages: number;
    currentPage: number;
    handlePageChange: (page: number) => void;
}