import axios from 'axios';

import { POKEMONS_URL } from '../../constants';

export const GET_BY_NAME = 'GET_BY_NAME';


export const getByName = (name) => async (dispatch) => {
  const response = await axios.get(`${POKEMONS_URL}?name=${name}`);
  if (response.data.name) {
    dispatch({
      type: GET_BY_NAME,
      payload: response.data
    });
  }
  else {
    dispatch({
      type: GET_BY_NAME,
      payload: { info: 'not found' }
    })
  }
}


// export function getByName(name) {
//   return async (dispatch) => {
//     const response = await axios.get(`${POKEMONS_URL}?name=${name}`);
//     dispatch({
//       type: GET_BY_NAME,
//       payload: response.data
//     })
//     // console.log(response.data)
//   }
// };


