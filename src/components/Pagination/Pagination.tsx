import React from 'react';
import ReactPaginate from "react-paginate";

import styles from './Pagination.module.scss'

type PaginationsPropsType = {
    currentPage: number;
    onChangePage: any;
}

const Pagination: React.FC<PaginationsPropsType> = ({ currentPage, onChangePage }) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={e => onChangePage(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
            previousLabel="<"
        />
    );
};

export default Pagination;