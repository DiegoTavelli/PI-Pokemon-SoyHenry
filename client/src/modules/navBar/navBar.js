import React, { useState } from 'react';
import { filterAZ, filterPokemons, filterType } from 'store/actions/filterPokemonsActions'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPokemons } from 'store/actions/pokemonActions';
import { getByName } from 'store/actions/getByNameActions';
import './navBar.css';
// import PokemonBanner from '../../images/pokemon.png'



function NavBar({ refresh }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const allTypes = useSelector((store) => store.types);
  const [pokemon, setPokemons] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (pokemon !== '') {
      let toLowerName = pokemon.toLowerCase()
      dispatch(getByName(toLowerName));
      history.push(`/pokemons/${toLowerName}`)
      setPokemons('')
    }
  }

  const handleInputChange = (e) => {
    setPokemons(e.target.value);
  }
  //official - created
  const submitFilter = (e) => {
    // e.preventDefault();
    // console.log(e.target.value)
    dispatch(filterPokemons(e.target.value))
    history.push('/pokemons')
    refresh(e.target.value);
  }

  // const submitAttack = (e) => {
  //   dispatch(filterAttack(e.target.value))
  //   refresh(e.target.value);
  // }

  const submitAZ = (e) => {
    dispatch(filterAZ(e.target.value));
    refresh(e.target.value);
  }

  const findByType = (e) => {
    // console.log(e.target.value)
    dispatch(filterType(e.target.value));
    refresh(e.target.value);
  }

  const handleGoHome = (e) => {
    dispatch(getPokemons());
    history.push('/');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    refresh(e.target.value);
  }

  const handleGoBack = () => {
    history.push('/pokemons');
    // refresh(e.target.value);
  }

  const handleCreate = (e) => {
    history.push('/create');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    refresh(e.target.value);
  }

  if (window.location.pathname === '/pokemons') {
    return (
      <nav className='formNav'>
        <div className='homeAndCreate'>
          <button onClick={handleGoHome} className='homeButton'>Home</button>
          <button onClick={handleCreate} className='createButton'>Create</button>
          {/* <img className='bannerNavBar' src={PokemonBanner} alt='banner' /> */}
        </div>
        <form onSubmit={submit} className='onlyForm' >
          <div>
            <input
              type="text"
              id='searchpkm'
              value={pokemon}
              onChange={handleInputChange}
              className='searchInput'
              placeholder="Search Pokemon..."
            />
            <button type="submit" className='searchButton'>Search</button>
          </div>
        </form>
        <div className='filters' >
          <select onChange={(e) => findByType(e)} className='selectOption1' >
            <option value='all'>all types</option>{allTypes?.map((t) => {
              return <option key={t.id} value={t.name} >{t.name}</option>
            })}</select>
          <select onChange={(e) => submitAZ(e)} className='selectOption2' >
            <option value='sort' >Sort</option>
            <option value='asc' >A-Z</option>
            <option value='desc' >Z-A</option>
            <option value='up'>⬆Atack</option>
            <option value='down'>⬇Atack</option>
          </select>
          <select onChange={(e) => submitFilter(e)} className='selectOption3' >
            <option value='all'>all origins</option>
            <option value='official'>Officials</option>
            <option value='created'>Created</option>
          </select>
        </div>
      </nav>
    );
  } else if (window.location.pathname === '/create') {
    return (
      <nav className='formNavDetailsCreate'>
        <div className='onlyHome'>
          <button onClick={handleGoBack} className='homeButton homeButtonHome'>Go Back</button>
        </div>
      </nav>
    )
  } else {
    return (
      <nav className='formNavDetails'>
        <div className='homeAndCreate'>
          <button onClick={handleGoBack} className='homeButton homeButtonDetails'>Go Back</button>
          <button onClick={handleCreate} className='createButton'>Create</button>
        </div>
      </nav>
    )
  }
};

export default NavBar;


