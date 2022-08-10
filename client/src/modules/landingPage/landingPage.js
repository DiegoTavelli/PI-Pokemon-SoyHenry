import React from "react";
import './landingPage.css';
import { useState } from 'react'
// import { NavLink } from 'react-router-dom';
// import { withRouter } from "react-router-dom";

import gifIntro from 'images/gifIntro.gif';
import gifStart from 'images/gifStart.gif';
import logo from 'images/pokemon.png'
import welcomeLogo from 'images/welcomeLogo.png'


export default function LandingPage(props) {
  const [selectedGif, setSelectedGif] = useState(gifIntro);

  const delay = (e) => {
    e.preventDefault()
    setTimeout(() => {
      props.history.push('/pokemons')
    }, 1500)
  }

  return (
    <div className="backG">
      <div><img src={welcomeLogo} alt='' className="welcome" /></div>
      <div onClick={delay}>
        <img src={selectedGif} alt='loading...' className="gif"
          onClick={() => setSelectedGif(gifStart)} />
      </div>
      <div><img src={logo} alt='' className="logo" /></div>
    </div>
  )
}

