import React from 'react';
import { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import setIcon from '../pokemonCards/setIcon'
import './detailCard.css'

// actions
import { getDetails } from 'store/actions/detailCardActions.js'
import { clearPokemon } from 'store/actions/clearPokemonActions';

//images
import pokeBall from 'images/pokeball.png'
import ballWaiting from 'images/ballWaiting.gif'
import loading from 'images/loading.png'
import giphy from 'images/giphy.webp'

function DetailCard({ details, getDetails }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    getDetails(id)
    return () => {
      dispatch(clearPokemon())
    }
  }, []);

  return !details ?
    <div>
      <img src={ballWaiting} alt='Loading...' className='waitingBall' />
      <br></br>
      <img src={loading} alt='Loading...' className='loading' />
    </div>
    : !details.id ?
      <div>
        <div className='cardNotFound'>
          <br></br>
          <p className='detailName' >{details.name}</p>
          <img className='detailPicNotFound' src={giphy} alt='notFoundLogo' />
          <p className='parrafId' >We couldn't find Pokemon with that name</p>
        </div>
      </div>
      :
      <div className='allDetailCard' >
        <div className='card'>
          <br></br>
          <p className='detailName' >{details.name}</p>
          <p className='parrafId' ># {details.id}</p>
          <img
            src={details.img ? details.img : details.image ? details.image : pokeBall}
            alt='pokemon'
            className='detailPic'
          />
          <p> </p>
        </div>
        <div className='detailsData' >
          <p className='parraf' >Hp: {details.hp}</p>
          <p className='parraf' >Attack: {details.attack}</p>
          <p className='parraf' >Defense: {details.defense}</p>
          <p className='parraf' >Speed: {details.speed}</p>
          <p className='parraf' >Height: {details.height}</p>
          <p className='parraf' >Weight: {details.weight}</p>
          <p className='parraf' >Type: {
            details.types ? details.types[0]?.name :
              details.type[0].concat(details.types
                ? ', ' + details.types[1]?.name : details.type[1]
                  ? ', ' + details.type[1] : ' ')}{setIcon(details)}</p>
        </div>
      </div>
}

const mapStateToProps = (state) => {
  return {
    details: state.details,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetails: (details) => {
      dispatch(getDetails(details))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailCard);



