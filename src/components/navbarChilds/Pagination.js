import React, { Component } from "react";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      offset: 0,
    };
    this.handlePrevPage = this.handlePrevPage.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
  }

  handleGeTNumberValue = (e) => {
    this.setState({
      limit: +e.target.value,
    });
    this.props.setLimit(+e.target.value);
  };

  getLimit() {
    return this.state.limit;
  }

  handlePrevPage() {
    let totalOffset = this.state.offset - this.state.limit;
    this.setState({
      offset: totalOffset,
    });
    this.props.setOffset(totalOffset);
  }

  handleNextPage() {
    let totalOffset = this.state.offset + this.state.limit;
    this.setState({
      offset: totalOffset,
    });
    this.props.setOffset(totalOffset);
  }

  getOffset() {
    return this.state.offset;
  }

  render() {
    return (
      <>
        {this.state.offset > 0 ? (
          <button
            type="button"
            class="btn btn-info"
            onClick={this.handlePrevPage}
          >
            prev
          </button>
        ) : (
          <button
            type="button"
            class="btn btn-info"
            onClick={this.handlePrevPage}
            disabled
          >
            prev
          </button>
        )}
        <select
          onChange={(e) => this.handleGeTNumberValue(e)}
          value={this.state.limit}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
        </select>

        {(this.state.offset + this.state.limit) / this.state.limit <
        Math.ceil(this.props.countPage / this.state.limit) ? (
          <button
            type="button"
            class="btn btn-info"
            onClick={this.handleNextPage}
          >
            next
          </button>
        ) : (
          <button
            type="button"
            class="btn btn-info"
            onClick={this.handleNextPage}
            disabled
          >
            next
          </button>
        )}
      </>
    );
  }
}
export default Pagination;
