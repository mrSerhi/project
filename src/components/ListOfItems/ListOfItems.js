import React from "react";
import PropTypes from "prop-types";

const ListOfItems = ({ items }) => {
  const renderingItems = () => {
    if (items.length === 0) return <h3>No one titles is found...</h3>;

    return items.map(item => <li key={item.id}>{item.title}</li>);
  };

  return <ul>{renderingItems()}</ul>;
};

ListOfItems.propTypes = {
  items: PropTypes.array.isRequired
};

export default ListOfItems;
