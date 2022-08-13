// import { Fragment } from 'react'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Mapping from './mapping';
import { getPokemons } from 'store/actions/pokemonActions.js'
import Pagination from 'modules/pokemonCards/pagination'
import ballWaiting from 'images/ballWaiting.gif'
import loading from 'images/loading.png'
import './index.css'


function PokemonCards({ pokemons, refresh }) {
  const [isRefreshed, setIsRefreshed] = useState('');
  useEffect(() => {
    setIsRefreshed(refresh)
  }, []);


  // Paginate
  const [currentPage, setCurrentPage] = useState(1);
  const [pkmnPerPage] = useState(12);

  const indexOfLastPkmn = currentPage * pkmnPerPage;
  const indexOfFistPkmn = indexOfLastPkmn - pkmnPerPage;
  const currentPkmns = pokemons?.slice(indexOfFistPkmn, indexOfLastPkmn);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // console.log(pokemons)
  if (!pokemons) {
    return (
      <div>
        <img src={ballWaiting} alt='Loading...' className='waitingBall' />
        <br></br>
        <img src={loading} alt='Loading...' className='loading' />
      </div>
    );
  };
  return (
    <div className='fullCard'>
      <div>
        <Mapping pokemons={currentPkmns} />
        <div>
          <Pagination
            pkmnPerPage={pkmnPerPage}
            totalPkmn={pokemons.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    pokemons: state.pokemons,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPokemons: (pokemon) => {
      dispatch(getPokemons(pokemon))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonCards);


