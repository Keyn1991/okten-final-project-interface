import React from 'react';

import { Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CustomPaginationProps} from "../../interface/order.Interface";



const CustomPagination: React.FC<CustomPaginationProps> = ({
                                                               totalPages,
                                                               currentPage,
                                                               handlePageChange,

                                                           }) => {
    const renderPaginationItems = () => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <Pagination.Item
                    key={pageNumber}
                    active={currentPage === pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                >
                    {pageNumber}
                </Pagination.Item>
            ));
        }

        const paginationItems = [
            <Pagination.Item key={1} active={currentPage === 1} onClick={() => handlePageChange(1)}>
                1
            </Pagination.Item>,
        ];

        if (currentPage <= 3) {
            paginationItems.push(
                ...Array.from({ length: 3 }, (_, index) => index + 2).map((pageNumber) => (
                    <Pagination.Item
                        key={pageNumber}
                        active={currentPage === pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </Pagination.Item>
                ))
            );
            paginationItems.push(<Pagination.Ellipsis key="ellipsis1" />);
            paginationItems.push(
                <Pagination.Item
                    key={totalPages}
                    active={currentPage === totalPages}
                    onClick={() => handlePageChange(totalPages)}
                >
                    {totalPages}
                </Pagination.Item>
            );
        } else if (currentPage >= totalPages - 2) {
            paginationItems.push(
                <Pagination.Item
                    key={1}
                    active={currentPage === 1}
                    onClick={() => handlePageChange(1)}
                >
                    1
                </Pagination.Item>
            );
            paginationItems.push(<Pagination.Ellipsis key="ellipsis2" />);
            paginationItems.push(
                ...Array.from({ length: 3 }, (_, index) => totalPages - 2 + index).map((pageNumber) => (
                    <Pagination.Item
                        key={pageNumber}
                        active={currentPage === pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </Pagination.Item>
                ))
            );
        } else {
            paginationItems.push(
                <Pagination.Item
                    key={1}
                    active={currentPage === 1}
                    onClick={() => handlePageChange(1)}
                >
                    1
                </Pagination.Item>
            );
            paginationItems.push(<Pagination.Ellipsis key="ellipsis3" />);
            paginationItems.push(
                <Pagination.Item
                    key={currentPage - 1}
                    active={false}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    {currentPage - 1}
                </Pagination.Item>
            );
            paginationItems.push(
                <Pagination.Item
                    key={currentPage}
                    active={true}
                    onClick={() => handlePageChange(currentPage)}
                >
                    {currentPage}
                </Pagination.Item>
            );
            paginationItems.push(
                <Pagination.Item
                    key={currentPage + 1}
                    active={false}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    {currentPage + 1}
                </Pagination.Item>
            );
            paginationItems.push(<Pagination.Ellipsis key="ellipsis4" />);
            paginationItems.push(
                <Pagination.Item
                    key={totalPages}
                    active={currentPage === totalPages}
                    onClick={() => handlePageChange(totalPages)}
                >
                    {totalPages}
                </Pagination.Item>
            );
        }

        return paginationItems;
    };


    return (
        <div className="d-flex justify-content-center">
            <Pagination >
                <Pagination.First  onClick={() => handlePageChange(1)} />
                <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}

                />

                {renderPaginationItems()}

                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} />
            </Pagination>
        </div>
    );
};

export default CustomPagination;
