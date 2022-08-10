
export const FILTER_POKEMONS = 'FILTER_POKEMONS';
export const FILTER_AZ = 'FILTER_AZ';
export const FILTER_TYPE = 'FILTER_TYPE';


export function filterPokemons(payload) {
  return (dispatch) => {
    return dispatch({
      type: FILTER_POKEMONS,
      payload: payload,
    });
  }
}

export function filterAZ(payload) {
  return (dispatch) => {
    return dispatch({
      type: FILTER_AZ,
      payload: payload,
    });
  }
}

export function filterType(payload) {
  return (dispatch) => {
    return dispatch({
      type: FILTER_TYPE,
      payload: payload,
    });
  }
}


