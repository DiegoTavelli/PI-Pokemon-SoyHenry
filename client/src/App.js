import React from 'react';
import { Route } from 'react-router';
import './App.css';

import PokemonCards from './modules/pokemonCards'
import DetailCard from './modules/pokemonCards/detailCard'
import LandingPage from './modules/landingPage/landingPage';


function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/pokemons' component={PokemonCards} />
      <Route path='/pokemons/:name' component={DetailCard} />
    </div>
  );
}

export default App;
