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
      <div className="container">
        <div className="row">
          <div className="col-sm-6 m-auto">
            <Form mapTitleToItems={this.mapTitleToItems} />

            <ListOfItems items={items} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
