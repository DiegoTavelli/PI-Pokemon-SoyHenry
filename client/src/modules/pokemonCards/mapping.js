import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import setIcon from "./setIcon";
import pokeBall from 'images/pokeball.png'
import './index.css'

const Mapping = ({ pokemons, paginate, refresh }) => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
    return () => refresh
  }, [])

  if (!pokemons[0]?.name) {
    paginate(1);
  }
  return (
    <div>
      {pokemons?.map((pokemon) => {
        let typesTo = [];
        if (pokemon.types) {
          typesTo = [`${pokemon.types[0]?.name}${pokemon.types[1]?.name ? ', ' + pokemon.types[1].name : ' '}`];
        } else if (pokemon.type) {
          typesTo = [`${pokemon.type[0]}${pokemon.type[1] ? ', ' + pokemon.type[1] : ' '}`]
        } else {
          typesTo = ['undefined'];
        }
        return (
          <Link key={pokemon.id} to={`/pokemons/${pokemon.name}`}  >
            <div className='Card' >
              <br></br>
              {/* <p className='idCard' >{typeof pokemon.id === 'number' ? '#' + pokemon.id : '  '}</p> */}
              <p className='cardName' >{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</p>
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
                <p className='attackData' >🥊 {pokemon.attack}</p>
                <p className='cardTypes'>{setIcon(pokemon) + ' ' + typesTo} </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  )
}

export default Mapping;
