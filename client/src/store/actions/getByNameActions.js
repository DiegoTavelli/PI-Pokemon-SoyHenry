import axios from 'axios';
import { POKEMONS_URL } from '../../constants';

export const GET_BY_NAME = 'GET_BY_NAME';


export function getByName(name) {
  return (dispatch) => {
    return axios.get(`${POKEMONS_URL}?name=${name}`)
      .then((response) => {
        dispatch({
          type: GET_BY_NAME,
          payload: response.data
        });
      }).catch((error) => console.log("Error on getByName Action", error))
  };
}