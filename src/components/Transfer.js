import React, { Component } from "react";
import PokemonList from "./pokemonFolder/PokemonList";

class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  triggerChangePokemonsInChild(type, offset, limit) {
    this.refs.pokemonList.triggerGetPokemonsBy(type, offset, limit);
  }

  triggerChoseName(letterInput) {
    this.refs.pokemonList.triggerGetPokemonName(letterInput);
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <PokemonList ref="pokemonList" />
        </div>
      </div>
    );
  }
}

export default Transfer;
