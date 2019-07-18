import React, { Component } from "react";

// components
import Form from "./Form/Form";

class App extends Component {
  state = { items: [] };

  mapTitleToItems = item => {
    const items = [...this.state.items, item];
    this.setState({ items });
  };
  render() {
    return <Form mapTitleToItems={this.mapTitleToItems} />;
  }
}

export default App;
