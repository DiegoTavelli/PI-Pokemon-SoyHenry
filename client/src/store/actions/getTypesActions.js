import axios from 'axios';
import { TYPES_URL } from '../../constants';


export const GET_TYPES = 'GET_TYPES';

export function getTypes() {
  return (dispatch) => {
    return axios.get(`${TYPES_URL}`)
      .then((response) => {
        dispatch({
          type: GET_TYPES,
          payload: response.data
        });
      }).catch((error) => console.log("Error on getTypes Action", error))
  };
}