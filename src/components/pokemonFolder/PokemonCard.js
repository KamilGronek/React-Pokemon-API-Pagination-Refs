import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: black;
  &:hover {
    text-decoration: none;
  }
  .card {
    border: 4px solid red;
  }
  .card-header {
    background-color: #ffcccb;
  }
  .name {
    text-transform: uppercase;
  }
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  transition: transform 0.6s;
  &:hover {
    transform: scale(1.4);
  }
`;

class PokemonCard extends Component {
  state = {
    name: "",
    pokemonIndex: "",
    imageUrl: "",
  };

  componentDidMount() {
    const { name, type } = this.props;
    const pokemonIndex = type.split("/")[type.split("/").length - 2];
    // console.log(pokemonIndex);
    const imageUrl = `http://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
    this.setState({
      name: name,
      imageUrl: imageUrl,
      pokemonIndex: pokemonIndex,
    });
  }

  render() {
    const { name, pokemonIndex, imageUrl } = this.state;

    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <StyledLink to={`pokemon/${pokemonIndex}`}>
          <div className="card">
            <div className="card-header">
              <h5>{pokemonIndex}</h5>
            </div>
            <Thumbnail
              className="card-img-top rounded mx-auto mt-2"
              src={imageUrl}
            />
            <div className="card-body mx-auto">
              <h6 className="name">{name}</h6>
            </div>
          </div>
        </StyledLink>
      </div>
    );
  }
}

export default PokemonCard;
