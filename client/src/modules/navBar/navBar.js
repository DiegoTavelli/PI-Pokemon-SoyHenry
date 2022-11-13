import React, { useState } from 'react';
import { filterAZ, filterPokemons, filterType } from 'store/actions/filterPokemonsActions'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import { getPokemons } from 'store/actions/pokemonActions';
import { getByName } from 'store/actions/getByNameActions';
import { clearPokemon } from 'store/actions/clearPokemonActions';
import './navBar.css';
// import PokemonBanner from '../../images/pokemon.png'
import setIcon from 'modules/pokemonCards/setIcon';
import gifLoading from '../../images/gifLoading.gif'

function NavBar({ refresh, setShowDetail }) {

  const dispatch = useDispatch();
  const history = useHistory();
  const allTypes = useSelector((store) => store.types);
  const allPokemons = useSelector((store) => store.copyPokemon);
  const [pokemon, setPokemons] = useState('');
  // const data = allPokemons ? (JSON.parse(localStorage.getItem('POKEMONS_DATA'))) : null;
  // console.log(allPokemons)


  let filterSend = allPokemons && allPokemons?.filter((p) => p.name === pokemon);


  const submit = (e) => {
    e.preventDefault();
    dispatch(clearPokemon())
    if (filterSend?.length ? true : pokemon >= 1 && pokemon <= 900 ? true : false) {
      let toLowerName = pokemon.toLowerCase()
      dispatch(getByName(toLowerName));
      setShowDetail(true)
      setPokemons('')
    } else return alert('No Pokemon found with that NAME or ID 😢');
  }

  const submitOnClick = (ev, value) => {
    dispatch(clearPokemon())
    let toLowerName = value.toLowerCase()
    dispatch(getByName(toLowerName));
    setShowDetail(true)
    setPokemons('')
  }

  const handleInputChange = (e) => {
    setPokemons(e.target.value);
  }

  //official - created
  const submitFilter = (e) => {
    dispatch(filterPokemons(e.target.value))
    // history.push('/pokemons')
    refresh(e.target.value);
    setPokemons('');
    if (setShowDetail) {
      setShowDetail(false);
    }
  }

  const submitAZ = (e) => {
    dispatch(filterAZ(e.target.value));
    refresh(e.target.value);
    setPokemons('');
    if (setShowDetail) {
      setShowDetail(false);
    }
  }

  const findByType = (e) => {
    dispatch(filterType(e.target.value));
    refresh(e.target.value);
    setPokemons('');
    if (setShowDetail) {
      setShowDetail(false);
    }
  }

  const handleGoHome = (e) => {
    history.push('/');
    refresh(e.target.value);
  }

  const handleGoBack = () => {
    history.push('/pokemons');
  }

  const handleCreate = (e) => {
    history.push('/create');
    refresh(e.target.value);
  }


  if (window.location.pathname === '/pokemons') {
    return (
      <div>

        <nav className='formNav'>
          <div className='homeAndCreate'>
            <button onClick={handleGoHome} className='homeButton'>Home</button>
            <button onClick={handleCreate} className='createButton'>Create</button>
          </div>
          <form onSubmit={(e) => submit(e)} className='onlyForm' >
            <div className='inputContainer'>
              <input
                autoComplete='off'
                type="text"
                id='searchpkm'
                value={pokemon}
                onChange={handleInputChange}
                className='searchInput'
                placeholder='Search by name or id'
              />
              <button type='submit' disabled={!pokemon} className='searchButton'>Search</button>
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
        <div className='dropdown'>
          <div className='contInter'>
            {allPokemons ?
              allPokemons?.filter((p) => {
                return p.name.includes(pokemon.toLowerCase()) &&
                  pokemon.length > 1 &&
                  p.name !== pokemon
              }).map((e, index) =>
                index < 10 &&
                <div key={e.id} className='divInput'>
                  <div
                    onClick={(ev) => submitOnClick(ev, e.name)}
                    className='spanInput'
                  >
                    {e.name}
                    <div className='spanType'>
                      {`${setIcon(e)}`}
                    </div>
                  </div>
                </div>
              )
              : !allPokemons && pokemon ?
                <img src={gifLoading} className='gifLoading' alt='' /> : null
            }
          </div>
        </div>
      </div>
    );
  } else if (window.location.pathname === '/create') {
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


