import { Fragment } from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getPokemons } from '../../store/actions/pokemonActions.js'
import { NavLink } from 'react-router-dom';
import ballWaiting from '../../images/ballWaiting.gif'
import loading from '../../images/loading.png'
import './index.css'

function PokemonCards({ pokemons, getPokemons }) {
  function getPokemonsFunction() {
    getPokemons()
  }
  useEffect(() => {
    getPokemonsFunction();
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
  return (
    <Fragment>
      {pokemons?.map((pokemon) => {
        let types = [`${pokemon.type[0]}${pokemon.type[1] ? ', ' + pokemon.type[1] : ' '}`]
        return (
          <NavLink key={pokemon.id} to={`/pokemons/${pokemon.name}`}  >
            <div className='Card' >
              <br></br>
              <p className='cardName' >{pokemon.name.toUpperCase()}</p>
              <img src={pokemon.img ? pokemon.img : pokemon.image}
                alt='https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif'
                className='imagePokemon'
              />
              <p className='cardTypes'>{pokemon.type[1] ? 'Types:' : 'Type:'} {types}</p>
              <br></br>
            </div>
          </NavLink>
        );
      })}
    </Fragment>
  );
}

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