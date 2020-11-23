import React, { Component } from "react";
import axios from "axios";

class SelectType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
      type: "all",
    };
    this.getType = this.getType.bind(this);
  }

  getType() {
    return this.state.type;
  }

  async componentDidMount() {
    const type = "https://pokeapi.co/api/v2/type/";

    const endPointTypes = await axios.get(type);
    const allEndpointTypes = [
      {
        name: "all",
        url: "all",
      },
    ]
      .concat(endPointTypes.data.results)
      .map((result) => ({
        name: result.name,
        type: result.url,
      }));

    this.setState({
      types: allEndpointTypes,
      type: "all",
    });
  }

  handleGetType = (e) => {
    this.setState({
      type: e.target.value,
    });
    this.props.setType(e.target.value);
  };

  render() {
    return (
      <>
        <select
          className="custom-select"
          onChange={(e) => this.handleGetType(e)}
          value={this.state.type}
        >
          {this.state.types.map((t) => (
            <option key={t.name} value={t.type}>
              {t.name}
            </option>
          ))}
        </select>
      </>
    );
  }
}

export default SelectType;
