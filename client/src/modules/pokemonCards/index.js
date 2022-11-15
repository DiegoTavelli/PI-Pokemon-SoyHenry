// import { Fragment } from 'react'
import { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import Mapping from './mapping';
import DetailCard from './detailCard';
// import { getPokemons } from 'store/actions/pokemonActions.js'
import { setPokemons } from 'store/actions/setPokemons'
import Pagination from 'modules/pokemonCards/pagination'
import ballWaiting from 'images/ballWaiting.gif'
import loading from 'images/loading.png'
import './index.css'


function PokemonCards({ refresh, pokemons, showDetail, setShowDetail }) {

  const dispatch = useDispatch();
  const [/*isRefreshed */, setIsRefreshed] = useState('');
  const [allData, setAllData] = useState([])

  const setLocalStorage = () => {
    if (pokemons && pokemons?.length > 2) {
      const verify = pokemons && pokemons.length > 2 ? pokemons : null;
      localStorage.setItem('POKEMONS_DATA', JSON.stringify(verify));
    }
  }

  const getLocalStorage = () => {
    // if (!allData && !allData?.length > 2) {
    const data = (JSON.parse(localStorage.getItem('POKEMONS_DATA')));
    setAllData(data)
    dispatch(setPokemons(data));
    // }
  }

  useEffect(() => {
    window.scrollTo({
      top: 0
    })
    // searchInState();
    setIsRefreshed(refresh)
    setLocalStorage()
    getLocalStorage();
  }, []);


  // Paginate
  const [currentPage, setCurrentPage] = useState(1);
  const [pkmnPerPage] = useState(15);

  const indexOfLastPkmn = currentPage * pkmnPerPage;
  const indexOfFistPkmn = indexOfLastPkmn - pkmnPerPage;
  const currentPkmns = pokemons?.slice(indexOfFistPkmn, indexOfLastPkmn);

  let paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }


  return !pokemons && !allData ?
    <div>
      <img src={ballWaiting} alt='Loading...' className='waitingBall' />
      <br></br>
      <img src={loading} alt='Loading...' className='loading' />
    </div>
    :
    <div>
      <div className='fullCard'>
        {
          showDetail ?
            <DetailCard setShowDetail={setShowDetail}
            />
            : null
        }
        {
          pokemons ?
            <div>
              <Mapping
                showDetail={showDetail}
                setShowDetail={setShowDetail}
                pokemons={currentPkmns}
                paginate={paginate}
                refresh={refresh}
              />
              <div>
                <Pagination
                  currentPage={currentPage}
                  pkmnPerPage={pkmnPerPage}
                  totalPkmn={pokemons?.length}
                  paginate={paginate}
                />
              </div>
            </div>
            :
            <div>
              <img src={ballWaiting} style={{ marginTop: '150px' }} alt='Loading...' className='waitingBall' />
              <br></br>
              <img src={loading} style={{ marginTop: '150px' }} alt='Loading...' className='loading' />
            </div>
        }
      </div>
    </div>
};

const mapStateToProps = (state) => {
  return {
    pokemons: state.pokemons,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getPokemons: () => {
    //   dispatch(getPokemons())
    // },
    setPokemons: (data) => {
      dispatch(setPokemons(data))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonCards);

