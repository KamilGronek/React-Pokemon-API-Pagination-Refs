import React, { Component } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cachePokemons: [],
      pokemons: [],
      previous: null,
      next: null,
      passUrl: "",
    };
    this.triggerGetPokemonsBy = this.triggerGetPokemonsBy.bind(this);
  }

  async componentDidMount() {
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=10");
    let pokemons = res.data.results.map((result) => ({
      name: result.name,
      type: result.url,
    }));
    this.setState({
      cachePokemons: pokemons,
      pokemons: pokemons,
      previous: res.data.previous,
      next: res.data.next,
    });
  }

  async triggerGetPokemonsBy(type, offset, limit) {
    let cachePokemons = null;
    let pokemons = null;
    if (type === "all") {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
      );

      pokemons = res.data.results.map((result) => ({
        name: result.name,
        type: result.url,
      }));

      cachePokemons = pokemons;
    } else {
      const res = await axios.get(type);
      pokemons = res.data.pokemon
        .map((p) => p.pokemon)
        .slice(offset, limit + offset)
        .map((result) => ({
          name: result.name,
          type: result.url,
        }));

      cachePokemons = pokemons;
    }
    this.setState({
      cachePokemons: cachePokemons,
      pokemons: pokemons,
    });
  }

  triggerGetPokemonName(letterInput) {
    let pokemons = this.state.cachePokemons.filter((pokemon) =>
      pokemon.name.includes(letterInput)
    );

    this.setState({
      pokemons: pokemons.length === 0 ? this.state.cachePokemons : pokemons,
    });
  }

  async getLimit(limit) {
    console.log(limit);

    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=${limit}`
    );

    let pokemons = res.data.results.map((result) => ({
      name: result.name,
      type: result.url,
    }));

    this.setState({
      pokemons: pokemons,
    });
  }

  render() {
    const { pokemons } = this.state;

    return (
      <>
        {pokemons ? (
          <div className="row">
            {pokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                type={pokemon.type}
              />
            ))}
          </div>
        ) : (
          <h1>Loading Pokemon</h1>
        )}
      </>
    );
  }
}

export default PokemonList;
