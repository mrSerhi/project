import React from "react";
import PropTypes from "prop-types";

const ListOfItems = ({ items }) => {
  const renderingItems = () => {
    if (items.length === 0)
      return (
        <h3 className="text-center text-info">No one titles is found...</h3>
      );

    return items.map(item => {
      return (
        <li key={item.id} className="list-group-item">
          {item.title}
        </li>
      );
    });
  };

  return <ul className="list-group mt-5">{renderingItems()}</ul>;
};

ListOfItems.propTypes = {
  items: PropTypes.array.isRequired
};

export default ListOfItems;
