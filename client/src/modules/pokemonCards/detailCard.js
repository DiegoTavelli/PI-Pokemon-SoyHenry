import React from 'react';
import { Fragment } from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom';
import { getDetails } from '../../store/actions/detailCardActions'
import ballWaiting from '../../images/ballWaiting.gif'
import loading from '../../images/loading.png'
import './detailCard.css'

function DetailCard({ details, getDetails }) {


  useEffect(() => getDetails(), []);
  console.log(details)
  if (!details) {
    return (
      <div>
        <img src={ballWaiting} alt='Loading...' className='waitingBall' />
        <br></br>
        <img src={loading} alt='Loading...' className='loading' />
      </div>
    )
  } else {
    // const { name, image, id, height, weight, hp, attack, defense, speed, typeOne, typeTwo, } = details;
    return (
      <Fragment className='card'>
        <img src={details.img ? details.img : details.image} alt='Pokemon Pic' />
        <p>{details.name}</p>
        <p># {details.id}</p>
        <p>{details.hp}</p>
        <p>{details.attack}</p>
        <p>{details.defense}</p>
        <p>{details.speed}</p>
        <p>{details.height}</p>
        <p>{details.weight}</p>
        {/* <p>{typeOne}</p>
        <p>{typeTwo}</p> */}
      </Fragment>
    )
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailCard)



