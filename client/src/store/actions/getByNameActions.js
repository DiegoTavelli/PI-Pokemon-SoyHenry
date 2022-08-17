import axios from 'axios';
import { POKEMONS_URL } from '../../constants';

export const GET_BY_NAME = 'GET_BY_NAME';


// export const getByName = (name) => async (dispatch) => {
//   const response = await axios.get(`${POKEMONS_URL}?name=${name}`);
//   console.log(response.data.name)
//   if (response.data.name) {
//     dispatch({
//       type: GET_BY_NAME,
//       payload: response.data
//     });
//   }
//   else {
//     const responseDb = await Pokemon.findOne
//   }
// }


export function getByName(name) {
  return (dispatch) => {
    return axios.get(`${POKEMONS_URL}?name=${name}`)
      .then((response) => {
        dispatch({
          type: GET_BY_NAME,
          payload: response.data
        });
        // console.log(response.data)
      }).catch((error) => console.log("Error on getByName Action", error))
  };
}

