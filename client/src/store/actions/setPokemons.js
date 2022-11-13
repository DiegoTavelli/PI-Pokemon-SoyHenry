
export const SET_POKEMONS = 'SET_POKEMONS';


export function setPokemons(payload) {
  return (dispatch) => {
    return dispatch({
      type: SET_POKEMONS,
      payload: payload,
    });
  };
}