import React, { Component } from "react";

class InputType extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onKeyUp = (e) => {
    this.props.setInput(e.target.value);
  };

  render() {
    return (
      <input
        onKeyUp={(e) => this.onKeyUp(e)}
        type="text"
        className="form-control"
        placeholder="name of pokemon"
      />
    );
  }
}

export default InputType;
