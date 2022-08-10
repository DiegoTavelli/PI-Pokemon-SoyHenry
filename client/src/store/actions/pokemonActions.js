import axios from 'axios';
import { POKEMONS_URL } from '../../constants';

export const GET_POKEMONS = 'GET_POKEMONS';


export function getPokemons() {
  return function (dispatch) {
    return axios.get(POKEMONS_URL).then((response) => {
      dispatch({
        type: GET_POKEMONS,
        payload: response.data
      });
    }).catch((error) => console.log("Error on getPokemons actions", error))
  };
}