import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import setIcon from './setIcon';
import { useDispatch, useSelector } from 'react-redux';
import { getByName } from 'store/actions/getByNameActions';
import { clearPokemon } from 'store/actions/clearPokemonActions';
import pokeBall from 'images/pokeball.png'
import giphy from 'images/giphy.webp'
import './index.css'
import backImage from '../../images/backCard2.png'
const Mapping = ({ showDetail, pokemons, paginate, refresh, setShowDetail }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
    return () => refresh
  }, [])

  if (!pokemons || !pokemons[0]?.name) {
    paginate(1);
  }

  const submitInfo = (e, value) => {
    if (!showDetail) {
      dispatch(getByName(value));
      setShowDetail(true);
    }
  }


  return (

    <div className='backgroundIndex' style={{ marginTop: '130px' }}  >
      {
        pokemons && pokemons?.map((pokemon) => {
          let typesTo = [];
          if (pokemon.types) {
            typesTo = [`${pokemon.types[0]?.name}${pokemon.types[1]?.name ? ', ' + pokemon.types[1].name : ' '}`];
          } else if (pokemon.type) {
            typesTo = [`${pokemon.type[0]}${pokemon.type[1] ? ', ' + pokemon.type[1] : ' '}`]
          } else {
            typesTo = ['undefined'];
          }
          return (
            <div key={pokemon.id} >
              <div className={showDetail ? 'Card' : 'Card CardHover'} onClick={(e) => submitInfo(e, pokemon.name)} >
                <img src={backImage} className='backImageBlue' alt='' />
                <br></br>
                <p className='cardName' >{pokemon?.name[0]?.toUpperCase() + pokemon.name.slice(1)}</p>
                <img src={pokemon.img ? pokemon.img : pokemon.image ? pokemon.image : pokeBall}
                  alt='Pokemon'
                  className='imagePokemon'
                />
                <br></br>
                <br></br>
                <div className='contTypId' >
                  <p className='cardTypeIcon' >
                    {typeof pokemon.id === 'number' ? '# ' + pokemon.id : '#' + pokemon.id.slice(0, 3) + '..'}
                  </p>
                  <p className='attackData' >🥊{pokemon.attack} 💙{pokemon.hp}</p>
                  <p className='cardTypes'>{setIcon(pokemon) + ' ' + typesTo} </p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  )
}

export default Mapping;
