import React, { useEffect } from "react";
import './landingPage.css';
import { useState } from 'react'
import { useHistory } from "react-router-dom";

import videoLanding from '../../images/MiVideoFinal.mp4'
import gifStart from 'images/gifStart.gif';
import gifIntro from 'images/gifIntro.gif';
import logo from 'images/pokemon.png'
import welcomeLogo from 'images/welcomeLogo.png'

export default function LandingPage() {
  const [selectedGif, setSelectedGif] = useState(gifIntro);
  const history = useHistory();
  const delay = (e) => {
    e.preventDefault()
    setTimeout(() => {
      history.push('/pokemons');
    }, 1500)
  }

  return (
    <div className="backG">
      <video
        src={videoLanding}
        autoPlay
        loop
        muted
        className="video"
      />
      <div className="allData" ><img src={welcomeLogo} alt='' className="welcome" />
        <div onClick={delay}>
          <img src={selectedGif} alt='loading...' className="gif"
            onClick={() => setSelectedGif(gifStart)} />
        </div>
        <div>
          <img src={logo} alt='' className="logo" />
        </div>
      </div>
    </div>
  )
}

