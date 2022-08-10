import axios from 'axios';
import { POKEMONS_URL } from '../../constants';

export const GET_DETAILS = 'GET_DETAILS';


export function getDetails(id) {
  return (dispatch) => {
    return axios.get(`${POKEMONS_URL}/${id}`)
      .then((response) => {
        dispatch({
          type: GET_DETAILS,
          payload: response.data
        });
      }).catch((error) => console.log("Error on getDetails Action", error))
  };
}