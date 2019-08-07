import React, { useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";
import uuid from "uuid";
import { connect } from "react-redux";
import { getFilteredTasksLength } from "../../store/selectors";
import { getCurrentPage } from "../../store/task/task-actions";

const CustomPagination = ({
  tasksCounter,
  currentPage,
  limit,
  getCurrentPage
}) => {
  useEffect(() => {
    const countAllPages = Math.ceil(tasksCounter / limit);

    if (currentPage > countAllPages && tasksCounter > 0) {
      getCurrentPage(currentPage - 1);
    }
  });
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

  return <Pagination className="align-self-center mt-2">{pages}</Pagination>;
};

const mapStateToProps = (state) => ({
  tasksCounter: getFilteredTasksLength(state),
  limit: state.todo.pagination.limit,
  currentPage: state.todo.pagination.currentPage
});

export default connect(
  mapStateToProps,
  { getCurrentPage }
)(CustomPagination);
