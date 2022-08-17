import React from 'react';
import './detailCard.css'
import giphy from 'images/giphy.webp'

export default function WrongPathPage() {
  return (
    <div>
      <div className='cardNotFound'>
        <br></br>
        <img className='detailPicNotFound' src={giphy} alt='notFoundLogo' />
        <p className='parrafId' >We couldn't find the Page</p>
      </div>
    </div>
  );

}