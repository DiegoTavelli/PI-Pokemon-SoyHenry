import { GET_POKEMONS } from '../actions/pokemonActions'
import { GET_DETAILS } from '../actions/detailCardActions'
const initialState = {
  pokemons: [],
  details: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      }
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      }
    default:
      return {
        state,
      }
  }
}

export default reducer;