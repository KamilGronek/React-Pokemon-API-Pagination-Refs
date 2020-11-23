import React, { Component } from "react";
import SelectType from "./navbarChilds/SelectType";
import InputType from "./navbarChilds/InputType";
import Pagination from "./navbarChilds/Pagination";
import { Navbar, Nav } from "react-bootstrap/";
import styled from "styled-components";

const Logo = styled.img`
  width: 200px;
`;

class NavBar extends Component {
  getLimit() {
    return this.refs.pagination.getLimit();
  }

  getType() {
    return this.refs.selectType.getType();
  }

  getOffset() {
    return this.refs.pagination.getOffset();
  }

  render() {
    return (
      <Navbar fixed="top" bg="dark" expand="lg">
        <Navbar.Brand href="/">
          <Logo src={"img/pokedex.png"} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link style={{ color: "#ffffff" }}>
              <p>Select type:</p>
            </Nav.Link>
            <Nav.Link>
              <SelectType setType={this.props.setType} ref="selectType" />
            </Nav.Link>
            <Nav.Link>
              <InputType setInput={this.props.setInput} />
            </Nav.Link>
            <Nav.Link style={{ display: "inherit" }}>
              <Pagination
                setLimit={this.props.setLimit}
                ref="pagination"
                setOffset={this.props.setOffset}
                countPage={this.props.countPage}
                pokemons={this.props.pokemons}
              />
            </Nav.Link>
            <Nav.Link>
              <small>Total Pokemons: {this.props.countPage}</small>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default NavBar;
