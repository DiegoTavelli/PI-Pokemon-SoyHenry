import React, { useEffect, useState, StrictMode } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import NavBar from './modules/navBar/navBar';
import PokemonCards from './modules/pokemonCards'
import DetailCard from './modules/pokemonCards/detailCard'
import LandingPage from './modules/landingPage/landingPage';
import { Footer } from './modules/footer/footer';
import { getTypes } from './store/actions/getTypesActions';
import { getPokemons } from './store/actions/pokemonActions';
import CreatePokemon from './modules/createPokemon/createPokemon'
// import WrongPathPage from 'modules/pokemonCards/wrongPathPage';
import './App.css';

function App() {
  const [isRefreshed, setIsRefreshed] = useState('')
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());

  }, []);
  return (
    <div className="App">
      <Switch>
        <StrictMode>
          <Route exact path='/' render={() => <LandingPage />} />
          <Route path='/pokemons' render={() => <NavBar refresh={setIsRefreshed} />} />
          <Route path='/create' render={() => <NavBar refresh={setIsRefreshed} />} />
          <Route exact path='/pokemons' render={() => <PokemonCards refresh={isRefreshed} />} />
          <Route exact path='/create' render={() => <CreatePokemon refresh={isRefreshed} />} />
          <Route path='/pokemons/:name' component={DetailCard} />
          {/* <Route component={WrongPathPage} /> */}
          <Footer />
        </StrictMode>
      </Switch>
    </div>
  );
}

export default App;

