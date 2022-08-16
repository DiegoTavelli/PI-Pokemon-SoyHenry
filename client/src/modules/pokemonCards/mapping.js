import React, { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import setIcon from "./setIcon";
import pokeBall from 'images/pokeball.png'
import './index.css'

const Mapping = ({ pokemons }) => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [])

  return (
    <div>
      {pokemons?.map((pokemon) => {
        let typesTo = [];
        if (pokemon.types) {
          typesTo = [`${pokemon.types[0]?.name}, ${pokemon.types[1]?.name}`];
        } else if (pokemon.type) {
          typesTo = [`${pokemon.type[0]}${pokemon.type[1] ? ', ' + pokemon.type[1] : ' '}`]
        } else {
          typesTo = ['undefined'];
        }
        return (
          <NavLink key={pokemon.id} to={`/pokemons/${pokemon.id}`}  >
            <div className='Card' >
              <br></br>
              <p className='cardName' >{pokemon.name.toUpperCase()}</p>
              <img src={pokemon.img ? pokemon.img : pokemon.image ? pokemon.image : pokeBall}
                alt='Pokemon'
                className='imagePokemon'
              />
              <br></br>
              <br></br>
              <p className='cardTypeIcon'>{setIcon(pokemon)} </p>
              <p className='cardTypes'>{typesTo} </p>
            </div>
          </NavLink>
        );
      })}
    </div>
  )
}

export default Mapping;
