import axios from 'axios';
import { POKEMONS_URL } from '../../constants';

export const CREATE_POKEMON = 'CREATE_POKEMON';


export function createPokemon(pokemon) {
  return (dispatch) => {
    return axios.post(POKEMONS_URL, pokemon)
      .then((response) => {
        dispatch({
          type: CREATE_POKEMON,
          payload: response.data
        });
      }).catch((error) => console.log(error))
  };
}