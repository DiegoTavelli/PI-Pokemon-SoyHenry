import React, { useEffect, useState } from 'react';
import { Route } from 'react-router';
import './App.css';

import PokemonCards from './modules/pokemonCards'
import DetailCard from './modules/pokemonCards/detailCard'
import LandingPage from './modules/landingPage/landingPage';
import NavBar from './modules/navBar/navBar';
import { useDispatch } from 'react-redux';
import { Footer } from './modules/footer/footer';
import { getTypes } from './store/actions/getTypesActions';
import { getPokemons } from './store/actions/pokemonActions';
import CreatePokemon from './modules/createPokemon/createPokemon'

function App() {
  const [isRefreshed, setIsRefreshed] = useState('')
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());

  }, []);

  return (
    <div className="App">
      <React.StrictMode>
        <Route exact path='/' component={LandingPage} />
        <Route path='/pokemons' render={() => <NavBar refresh={setIsRefreshed} />} />
        <Route path='/create' render={() => <NavBar refresh={setIsRefreshed} />} />
        <Route exact path='/pokemons' render={() => <PokemonCards refresh={isRefreshed} />} />
        <Route exact path='/create' render={() => <CreatePokemon refresh={isRefreshed} />} />
        <Route path='/pokemons/:id' component={DetailCard} />
        <Footer />
      </React.StrictMode>
    </div>
  );
}

export default App;

