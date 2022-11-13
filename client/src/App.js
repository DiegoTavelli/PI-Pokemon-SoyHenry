import React, { useLayoutEffect, useRef, useEffect, useState, StrictMode } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
  const [showDetail, setShowDetail] = useState(false);
  const dispatch = useDispatch();
  const allPokemons = useSelector((store) => store.pokemons)
  const allTypes = useSelector((store) => store.types)

  // width refference for alert if user changes window size 
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  // const setWindowDimensions = () => {
  //   setWindowWidth(window.innerWidth)
  // }

  useEffect(() => {
    // window.addEventListener('resize', setWindowDimensions);
    if (!allTypes) dispatch(getTypes());
    dispatch(getPokemons());
    return () => {
      dispatch(getPokemons());
    }
  }, []);
  // console.log(allPokemons?.length)
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

