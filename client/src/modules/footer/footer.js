import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faGithub
} from '@fortawesome/free-brands-svg-icons'
import './footer.css'

export function Footer() {

  const handleClickLinkedIn = () => {
    window.open('https://www.linkedin.com/in/diegotavelli');
  }
  const handleClickGitHub = () => {
    window.open('http://github.com/DiegoTavelli');
  }


  return (
    <div className="footer" >
      <a
        href="mailto:diegotavelli@gmail.com?body=Contact Diego Tavelli"
        className='footerName' >@Diegotavelli</a >
      <p onClick={handleClickLinkedIn} className='footerLink' >
        <FontAwesomeIcon icon={faLinkedin} size='2x' />
      </p>
      <p onClick={handleClickGitHub} className='footerGit' >
        <FontAwesomeIcon icon={faGithub} size='2x' />
      </p>
    </div>
  )
}