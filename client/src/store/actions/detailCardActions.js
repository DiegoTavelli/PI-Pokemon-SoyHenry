import axios from 'axios';
import { POKEMONS_URL } from '../../constants';


export const GET_DETAILS = 'GET_DETAILS';


export function getDetails(name) {
  return function (dispatch) {
    return axios.get(`${POKEMONS_URL}/${name}`)
      .then((response) => {
        dispatch({
          type: GET_DETAILS,
          payload: response.data
        });
      }).catch((error) => console.log(error))
  };
}