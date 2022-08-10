

export const CLEAR_POKEMON = 'CLEAR_POKEMON';

export function clearPokemon() {
  return (dispatch) => {
    return dispatch({
      type: CLEAR_POKEMON,
      payload: null
    });
  };
}