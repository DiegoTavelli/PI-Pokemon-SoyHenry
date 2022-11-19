import React, { useEffect, useState, StrictMode } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from './modules/navBar/navBar';
import PokemonCards from './modules/pokemonCards'
import LandingPage from './modules/landingPage/landingPage';
import { Footer } from './modules/footer/footer';
import { getTypes } from './store/actions/getTypesActions';
import { getPokemons } from './store/actions/pokemonActions';
import CreatePokemon from './modules/createPokemon/createPokemon'
// import WrongPathPage from 'modules/pokemonCards/wrongPathPage';
import './App.css';



function App() {

  const [isRefreshed, setIsRefreshed] = useState('')
  const [showDetail, setShowDetail] = useState(false);
  const dispatch = useDispatch();
  // const allPokemons = useSelector((store) => store.pokemons)
  const allTypes = useSelector((store) => store.types)

  useEffect(() => {
    if (!allTypes) dispatch(getTypes());
    dispatch(getPokemons());
  }, []);



  return (
    <div className='App' >
      <Switch>
        <StrictMode>
          <Route exact path='/' render={() => <LandingPage />} />
          <Route
            path='/create'
            render={() =>
              <NavBar
                refresh={setIsRefreshed}
                showDetail={showDetail}
                setShowDetail={setShowDetail}
              />}
          />
          <Route
            path='/pokemons'
            render={() =>
              <NavBar
                refresh={setIsRefreshed}

                showDetail={showDetail}
                setShowDetail={setShowDetail}
              />}
          />
          <Route exact path='/create' render={() => <CreatePokemon refresh={isRefreshed} />} />
          <Route
            exact
            path='/pokemons'
            render={() =>
              <PokemonCards
                refresh={isRefreshed}

                showDetail={showDetail}
                setShowDetail={setShowDetail}
              />}
          />
          <Route exact path='/pokemons'
            render={() => <Footer />}
          />
          <Route exact path='/create'
            render={() => <Footer />}
          />
        </StrictMode>
      </Switch>
    </div>
  );
}

export default App;

