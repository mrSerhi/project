import React from "react";

import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";
import uuid from "uuid";

const CustomPagination = (props) => {
  const { itemsTotal = 0, itemsLimit = 5, currentPage = 0, paginate } = props;
  const pages = [];
  const pagesCounter = Math.ceil(itemsTotal / itemsLimit);

  for (let page = 1; page <= pagesCounter; page++) {
    pages.push(
      <PageItem
        key={uuid()}
        active={currentPage === page}
        onClick={() => paginate(page)}
      >
        {page}
      </PageItem>
    );
  }

  return <Pagination className="align-self-center mt-2">{pages}</Pagination>;
};

export default CustomPagination;
