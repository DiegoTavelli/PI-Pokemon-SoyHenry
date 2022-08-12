import React, { useState } from 'react';
import './navBar.css';
import { getByName } from 'store/actions/getByNameActions';
import { filterAZ, filterPokemons, filterType } from 'store/actions/filterPokemonsActions'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function NavBar({ refresh }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const allTypes = useSelector((store) => store.types);
  const [pokemon, setPokemons] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (pokemon !== '') {
      dispatch(getByName(pokemon));
      history.push(`/pokemons/${pokemon}`)
      setPokemons('')
    }
  }

  const handleInputChange = (e) => {
    setPokemons(e.target.value);
  }

  const submitFilter = (e) => {
    // e.preventDefault();
    // console.log(e.target.value)
    dispatch(filterPokemons(e.target.value))
    history.push('/pokemons')
  }

  const submitAZ = (e) => {
    dispatch(filterAZ(e.target.value));
    refresh(e.target.value);
  }

  const finyByType = (e) => {
    // console.log(e.target.value)
    dispatch(filterType(e.target.value));
  }

  const handleGoHome = () => {
    history.push('/pokemons');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  const handleGoBack = () => {
    history.push('/pokemons');
  }

  const handleCreate = () => {
    history.push('/create');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  if (window.location.pathname === '/pokemons') {
    return (
      <nav className='formNav'>
        <div className='homeAndCreate'>
          <button onClick={handleGoHome} className='homeButton'>Home</button>
          <button onClick={handleCreate} className='createButton'>Create</button>
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
          <select onChange={(e) => finyByType(e)} className='selectOption1' >
            <option value='all'>all types</option>{allTypes?.map((t) => {
              return <option key={t.id} value={t.name} >{t.name}</option>
            })}</select>
          <select onChange={(e) => submitAZ(e)} className='selectOption2' >
            <option value='sort' >Sort</option>
            <option value='asc' >A-Z</option>
            <option value='desc' >Z-A</option>
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


