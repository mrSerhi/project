import React from "react";

import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";
import uuid from "uuid";

const createPaginationItems = (props) => {
  const { itemsTotal = 0, limit = 5, currentPage = 1, onPaginate } = props;
  const pages = [];

  for (let page = 1; page <= Math.ceil(itemsTotal / limit); page++) {
    pages.push(
      <PageItem
        key={uuid()}
        active={currentPage === page}
        onClick={() => onPaginate(page)}
      >
        {page}
      </PageItem>
    );
  }
  return pages;
};

const CustomePagination = (props) => {
  return (
    <Pagination className="align-self-center mt-2">
      {createPaginationItems(props)}
    </Pagination>
  );
};

export default CustomePagination;
