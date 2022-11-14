import React from 'react'
import { connect, useDispatch } from 'react-redux'
import setIcon from '../pokemonCards/setIcon'
import './detailCard.css'

// actions
import { getByName } from 'store/actions/getByNameActions';
import { getDetails } from 'store/actions/detailCardActions.js'
import { clearPokemon } from 'store/actions/clearPokemonActions';

//images
import pokeBall from 'images/pokeball.png'
import ballWaiting from 'images/ballWaiting.gif'
import closeIcon from '../../images/X.png'
import leftArrow from '../../images/leftArrow.png'
import rightArrow from '../../images/rightArrow.png'


function DetailCard({ byName, setShowDetail }) {

  const dispatch = useDispatch();
  let idCheck = 0;

  const closeModal = (e) => {
    dispatch(clearPokemon())
    setShowDetail(false);
  }

  const leftArrowSubmit = (e, id) => {
    dispatch(clearPokemon())
    idCheck = id === 1 ? 900 : id - 1;
    if (byName) {
      dispatch(getByName(idCheck));
    }
  }

  const rightArrowSubmit = (e, id) => {
    dispatch(clearPokemon())
    const idCheck = id === 900 ? 1 : id + 1;
    if (byName) {
      dispatch(getByName(idCheck));
    }
  }


  return !byName ?
    <div>
      <div className='loadingPageModal' >
        <img src={ballWaiting} alt='Loading...' className='waitingBallModal' />
        <img
          src={closeIcon}
          alt=''
          className='closeButtonModal'
          onClick={(e) => closeModal(e)}
        />
        <br></br>
      </div>
    </div>
    :
    byName ?
      <div>
        <div className='allDetailCard' >
          <div className='cardArrowContainer' >

            {typeof byName.id === 'number' &&
              <img
                src={leftArrow}
                onClick={(e) => leftArrowSubmit(e, byName.id)}
                className='leftArrowModal'
                alt=''
              />
            }
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
            {typeof byName.id === 'number' &&
              <img
                src={rightArrow}
                onClick={(e) => rightArrowSubmit(e, byName.id)}
                className='rightArrowModal'
                alt=''
              />
            }
          </div>
          <div className='detailsData' >
            <p className='parraf' >Hp: {byName.hp.toString()}</p>
            <p className='parraf' >Attack: {byName.attack.toString()}</p>
            <p className='parraf' >Defense: {byName.defense.toString()}</p>
            <p className='parraf' >Speed: {byName.speed.toString()}</p>
            <p className='parraf' >Height: {(byName.height / 10).toString() + 'm'}</p>
            <p className='parraf' >Weight: {(byName.weight / 10).toString() + 'kg'}</p>
            <p className='parraf' >Type: {
              byName && byName.types ? (byName?.types[0]?.name) :
                byName && byName.type[0]?.concat(byName?.types
                  ? ', ' + byName.types[1]?.name : byName.type[1]
                    ? ', ' + byName.type[1] : '')}{setIcon(byName)}</p>
          </div>
          <img
            src={closeIcon}
            alt=''
            className='closeButtonModal'
            onClick={(e) => closeModal(e)}
          />
        </div>
      </div>
      : null;
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



