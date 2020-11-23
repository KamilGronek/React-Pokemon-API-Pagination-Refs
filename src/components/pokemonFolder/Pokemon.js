import React, { Component } from "react";
import axios from "axios";
import { Accordion, Card } from "react-bootstrap";
import styled from "styled-components";

const Image = styled.img`
  width: 250px;
  height: 250px;
`;

const CardMain = styled(Card)`
  background-color: #ffcccb;
  cursor: pointer;

  h5 {
    font-weight: bold;
  }
`;

class Pokemon extends Component {
  state = {
    name: "",
    pokemonIndex: "",
    frontImageUrl: "",
    backImageUrl: "",
    height: "",
    weight: "",
    types: "",
    url: "",
    abilities: "",

    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      specialAttack: "",
      specialDefense: "",
    },
  };

  async componentDidMount() {
    const { pokemonIndex } = this.props.match.params;

    const pokemonType = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesType = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;
    const pokemonAbility = `https://pokeapi.co/api/v2/ability/${pokemonIndex}/`;

    const pokemonRes = await axios.get(pokemonType);

    const name = pokemonRes.data.name;
    const frontImageUrl = pokemonRes.data.sprites.front_default;
    const backImageUrl = pokemonRes.data.sprites.back_default;
    const url = pokemonRes.data.types
      .map((t) => t.type.url)
      .map((url) => url + " ");

    const types = pokemonRes.data.types
      .map((t) => t.type.name)
      .map((name) => name + ", ");

    const height = pokemonRes.data.height;
    const weight = pokemonRes.data.weight;

    let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

    pokemonRes.data.stats.map((stat) => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          attack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
        case "special-attack":
          specialAttack = stat["base_stat"];
          break;
        case "special-defense":
          specialDefense = stat["base_stat"];
          break;
        default:
          return "Something goes wrong";
      }
    });

    const abilities = pokemonRes.data.abilities
      .map((ability) => ability.ability.name)
      .map((name) => name + ", ");

    await axios.get(pokemonSpeciesType).then((res) => {
      let description = "";
      res.data.flavor_text_entries.some((flavor) => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
        }
      });

      const femaleRate = res.data["gender_rate"];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);

      const baseHappiness = res.data.base_happiness;
      const chatchRate = Math.round((100 / 255) * res.data["capture_rate"]);

      const eggGroups = res.data["egg_groups"].map((group) => group.name);

      this.setState({
        description,
        genderRatioFemale,
        genderRatioMale,
        baseHappiness,
        chatchRate,
        eggGroups,
      });
    });

    await axios.get(pokemonAbility).then((res) => {
      let effect = "";
      res.data.effect_entries.some((eff) => {
        if (eff.language.name === "en") {
          effect = eff.effect;
        }
      });

      this.setState({
        effect,
      });
    });

    this.setState({
      name,
      pokemonIndex,
      frontImageUrl,
      backImageUrl,
      height,
      weight,
      url,
      types,
      abilities,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense,
      },
    });
  }

  render() {
    const {
      backImageUrl,
      frontImageUrl,
      pokemonIndex,
      name,
      description,
      effect,
      types,
      height,
      weight,
      abilities,
    } = this.state;

    const {
      hp,
      attack,
      defense,
      speed,
      specialAttack,
      specialDefense,
    } = this.state.stats;

    return (
      <div className="col">
        <div className="pokemon-card">
          <div className="card-body bg-card">
            <div className="row">
              <div className="backImage">
                <img src={backImageUrl} alt="" />
              </div>
              <div className="row align-items-center">
                <div className="col-md-6">
                  <Image
                    className="rounded mx-auto d-block "
                    src={frontImageUrl}
                  />
                </div>
                <div className="col-md-6">
                  <div className="d-flex justify-content-between mainTitle">
                    <h1>{pokemonIndex}.</h1>
                    <h1 className="color">{name} </h1>
                    <h1 className="hp">{hp}HP</h1>
                  </div>
                  <div>
                    <p>
                      <span>Ability:</span>
                      {description} {effect}
                    </p>
                  </div>
                  <hr class="new4"></hr>
                  <Accordion>
                    <CardMain>
                      <Accordion.Toggle as={Card.Header} eventKey="0">
                        <h5>Skills:</h5>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <h6>Attack: {attack} </h6>
                          <h6>Defense: {defense} </h6>
                          <h6>Speed: {speed} </h6>
                          <h6>Special attack: {specialAttack} </h6>
                          <h6>Special defense: {specialDefense} </h6>
                        </Card.Body>
                      </Accordion.Collapse>
                    </CardMain>
                    <CardMain>
                      <Accordion.Toggle as={Card.Header} eventKey="1">
                        <h5>Parameters:</h5>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <h6>Type: {types}</h6>
                          <h6>Height: {height}</h6>
                          <h6>Weigth: {weight}</h6>
                        </Card.Body>
                      </Accordion.Collapse>
                    </CardMain>
                    <CardMain>
                      <Accordion.Toggle as={Card.Header} eventKey="2">
                        <h5>Extra:</h5>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          {" "}
                          <h6>{abilities}</h6>
                        </Card.Body>
                      </Accordion.Collapse>
                    </CardMain>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pokemon;
