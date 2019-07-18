import React, { Component, Fragment } from "react";

// components
import Form from "./Form/Form";
import ListOfItems from "./ListOfItems/ListOfItems";

class App extends Component {
  state = { items: [] };

  mapTitleToItems = item => {
    const items = [...this.state.items, item];
    this.setState({ items });
  };
  render() {
    const { items } = this.state;
    return (
      <Fragment>
        <Form mapTitleToItems={this.mapTitleToItems} />

        <ListOfItems items={items} />
      </Fragment>
    );
  }
}

export default App;
