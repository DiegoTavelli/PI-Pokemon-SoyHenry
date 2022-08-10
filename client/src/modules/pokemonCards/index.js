// import { Fragment } from 'react'
import { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import setIcon from './setIcon';
// actions
import { getPokemons } from '../../store/actions/pokemonActions.js'
// images
import ballWaiting from '../../images/ballWaiting.gif'
import loading from '../../images/loading.png'
import './index.css'


function PokemonCards({ pokemons, getPokemons, refresh }) {
  const [isRefreshed, setIsRefreshed] = useState('');
  useEffect(() => {
    // getPokemons();
    setIsRefreshed(refresh)
  }, []);

  if (!pokemons) {
    return (
      <div>
        <img src={ballWaiting} alt=' ' className='waitingBall' />
        <br></br>
        <img src={loading} alt='Loading...' className='loading' />
      </div>
    )
  }

  // const ready = (pokemons[pokemons.length - 2].name);
  // if (ready) {

  return (
    <div className='fullCard'>
      <div>
        {pokemons?.map((pokemon) => {
          let types = [];
          if (pokemon.types) {
            types = [`${pokemon.types[0].name}, ${pokemon.types[1].name}`];
          } else {
            types = [`${pokemon.type[0]}${pokemon.type[1] ? ', ' + pokemon.type[1] : ' '}`]
          }
          return (
            <NavLink key={pokemon.id} to={`/pokemons/${pokemon.id}`}  >
              <div className='Card' >
                <br></br>
                <p className='cardName' >{pokemon.name.toUpperCase()}</p>
                <img src={pokemon.img ? pokemon.img : pokemon.image}
                  alt='https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif'
                  className='imagePokemon'
                />
                <br></br>
                <br></br>
                <p className='cardTypeIcon'>{setIcon(pokemon)} </p>
                <p className='cardTypes'>{types} </p>

              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
// }

const mapStateToProps = (state) => {
  return {
    pokemons: state.pokemons,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPokemons: (pokemon) => {
      dispatch(getPokemons(pokemon))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonCards);

