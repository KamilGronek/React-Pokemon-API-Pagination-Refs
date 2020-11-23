import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Transfer";
import Pokemon from "./components/pokemonFolder/Pokemon";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countPage: 0,
      pokemons: [],
    };
    this.setOffset = this.setOffset.bind(this);
  }

  async componentDidMount() {
    await this.getAllpokemonsForType("all");
  }

  setType = (type) => {
    this.getAllpokemonsForType(type);
    let limit = this.refs.navBar.getLimit();
    this.refs.dashboard.triggerChangePokemonsInChild(type, 0, limit);
  };

  setInput = (letterInput) => {
    this.refs.dashboard.triggerChoseName(letterInput);
  };

  setLimit = (limit) => {
    let type = this.refs.navBar.getType();
    let offset = this.refs.navBar.getOffset();
    this.refs.dashboard.triggerChangePokemonsInChild(type, offset, limit);
  };

  setOffset(offset) {
    let type = this.refs.navBar.getType();
    let limit = this.refs.navBar.getLimit();
    this.refs.dashboard.triggerChangePokemonsInChild(type, offset, limit);
  }

  async getAllpokemonsForType(type) {
    let res = null;
    let countPage = 0;
    let pokemons = [];

    if (type === "all") {
      res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10"
      );
      countPage = res.data.count;
      pokemons = res.data.results;
      console.log(res.data.results);
    } else {
      res = await axios.get(type);
      console.log(res.data.results);
      countPage = res.data.pokemon.length;
      pokemons = res.data.pokemon;
    }

    this.setState({
      countPage: countPage,
      pokemons: pokemons,
    });
  }

  render() {
    return (
      <Router>
        <div className="App ">
          <NavBar
            ref="navBar"
            setType={this.setType}
            setInput={this.setInput}
            setLimit={this.setLimit}
            setOffset={this.setOffset}
            countPage={this.state.countPage}
            pokemons={this.state.pokemons}
          />
          <div className="container">
            <Switch>
              <Dashboard exact path="/" ref="dashboard" />
              <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
