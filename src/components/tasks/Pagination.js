import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";
import uuid from "uuid";
import { connect } from "react-redux";
import { getFilteredTasksLength } from "../../store/task/selectors";
import { getCurrentPage } from "../../store/task/task-actions";

const CustomPagination = ({
  tasksCounter,
  currentPage,
  limit,
  getCurrentPage
}) => {
  const pages = [];
  const pagesCounter = Math.ceil(tasksCounter / limit);

  for (let page = 1; page <= pagesCounter; page++) {
    pages.push(
      <PageItem
        key={uuid()}
        active={currentPage === page}
        onClick={() => getCurrentPage(page)}
      >
        {page}
      </PageItem>
    );
  }

  useEffect(() => {
    const countAllPages = Math.ceil(tasksCounter / limit);

    if (currentPage > countAllPages && tasksCounter > 0) {
      getCurrentPage(currentPage - 1);
    }
  });

  return <Pagination className="align-self-center mt-2">{pages}</Pagination>;
};

CustomPagination.propTypes = {
  tasksCounter: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  getCurrentPage: PropTypes.func.isRequired
};

export default connect(
  (state) => ({
    tasksCounter: getFilteredTasksLength(state),
    limit: state.todo.pagination.limit,
    currentPage: state.todo.pagination.currentPage
  }),
  { getCurrentPage }
)(CustomPagination);
