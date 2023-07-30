export interface Order {
    id: string;
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

    [key: string]: any;

    comment: {
        text: string;
        author: string | null;
        date: string;
    };
    utm: string;
    message: string;
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

export interface OrderCardProps {
    order: Order;
    index: number;
    currentPage: number;
    author: string;


}
