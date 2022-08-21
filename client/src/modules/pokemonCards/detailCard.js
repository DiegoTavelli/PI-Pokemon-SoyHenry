import React from 'react';
import { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import setIcon from '../pokemonCards/setIcon'
import './detailCard.css'

// actions
import { getByName } from 'store/actions/getByNameActions';
import { getDetails } from 'store/actions/detailCardActions.js'
import { clearPokemon } from 'store/actions/clearPokemonActions';

//images
import pokeBall from 'images/pokeball.png'
import ballWaiting from 'images/ballWaiting.gif'
import loading from 'images/loading.png'
import giphy from 'images/giphy.webp'

function DetailCard({ byName, getByName, details, getDetails }) {
  const dispatch = useDispatch();
  const { name, id } = useParams();

  useEffect(() => {
    getByName(name);
    getDetails(id);
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
    return () => {
      dispatch(clearPokemon())
    }
  }, []);

  return !byName ?
    <div className='loadingPage' >
      <img src={ballWaiting} alt='Loading...' className='waitingBall' />
      <img src={loading} alt='Loading...' className='loading' />
      <br></br>
    </div>
    : !byName?.id && !details?.name ?
      <div>
        <div className='cardNotFound'>
          <br></br>
          <p className='detailName' >{byName.name}</p>
          <img className='detailPicNotFound' src={giphy} alt='notFoundLogo' />
          <p className='parrafId' >We couldn't find Pokemon with that name</p>
        </div>
      </div>
      :
      <div className='allDetailCard' >
        <div className='card'>
          <br></br>
          <p className='detailName' >{byName.name}</p>
          <p className={typeof byName.id === 'number' ? 'parrafId' : 'parrafId idDb'}
          ># {byName.id}
          </p>
          <img
            src={byName.img ? byName.img : byName.image ? byName.image : pokeBall}
            alt='pokemon'
            className='detailPic'
          />
        </div>
        <div className='detailsData' >
          <p className='parraf' >Hp: {byName.hp}</p>
          <p className='parraf' >Attack: {byName.attack}</p>
          <p className='parraf' >Defense: {byName.defense}</p>
          <p className='parraf' >Speed: {byName.speed}</p>
          <p className='parraf' >Height: {byName.height}</p>
          <p className='parraf' >Weight: {byName.weight}</p>
          <p className='parraf' >Type: {
            byName.types ? byName.types[0]?.name :
              byName.type[0].concat(byName.types
                ? ', ' + byName.types[1]?.name : byName.type[1]
                  ? ', ' + byName.type[1] : ' ')}{setIcon(byName)}</p>
        </div>
      </div>
}

const mapStateToProps = (state) => {
  return {
    byName: state.byName,
    details: state.details
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getByName: (byName) => {
      dispatch(getByName(byName));
    },
    getDetails: (details) => {
      dispatch(getDetails(details));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailCard);



