import { GET_POKEMONS } from '../actions/pokemonActions'
import { GET_DETAILS } from '../actions/detailCardActions'
import { GET_BY_NAME } from '../actions/getByNameActions'
import { GET_TYPES } from '../actions/getTypesActions'
import { CLEAR_POKEMON } from '../actions/clearPokemonActions';
import { FILTER_AZ, FILTER_POKEMONS, FILTER_TYPE } from '../actions/filterPokemonsActions'

const initialState = {
  pokemons: [],
  copyPokemon: [],
  details: null,
  byName: null,
  types: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        copyPokemon: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        byName: action.payload,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case CLEAR_POKEMON:
      return {
        ...state,
        byName: action.payload,
        details: action.payload,
      };
    case FILTER_POKEMONS:
      let pkmState = state.copyPokemon
      let pkmFilter =
        action.payload === 'official' ?
          pkmState.filter((p) => typeof p.id === 'number') :
          pkmState.filter((p) => typeof p.id !== 'number')
      return {
        ...state,
        pokemons: action.payload === 'all' ? pkmState : pkmFilter,
      };
    case FILTER_AZ:
      let sort =
        action.payload === 'asc'
          ? state.pokemons.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            if (b.name > a.name) {
              return -1;
            }
            return 0;
          })
          : action.payload === 'desc' ?
            state.pokemons.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            })
            : state.pokemons
      return {
        ...state,
        pokemons: sort
      };
    case FILTER_TYPE:
      const pokemons = state.copyPokemon;
      const filtApi = pokemons.filter((p) => p.type);
      const fromApi = filtApi.filter((p) => p.type.find((el) => el.toString() === action.payload));

      const filtDb = state.pokemons.filter((p) => p.types);
      const fromDb = filtDb.filter((p) => p.types.find((el) => el.name.toString() === action.payload));
      const both = [...fromApi, ...fromDb];
      const filtAll = action.payload === 'all' ? pokemons : both;
      return {
        ...state,
        pokemons: filtAll ? filtAll : pokemons
      };
    default:
      return {
        state,
      };
  };
}

export default reducer;

// case FILTER_TYPE:
//       let pokemons = state.copyPokemon;
//       console.log(action.payload)
//       let filtPkm =
//         action.payload === 'all' ? pokemons :
//           pokemons.type ? pokemons.filter((p) => p.type.includes(action.payload)) :
//             pokemons.filter((p) => p.types === action.payload)
//       return {
//         ...state,
//         pokemons: filtPkm
//       };