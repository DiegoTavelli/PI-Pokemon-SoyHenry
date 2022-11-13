import React from 'react';


const CustomButton = ({ number, clickHandler, currentPage }) => {

  return (
    < button
      key={number}
      name={number}
      onClick={() => {
        clickHandler(number);
      }}
      href={number}
      className={
        number === currentPage ?
          'pageLink pageLinkActive' :
          'pageLink'}
    >
      {` ${number}`}
    </button>
  )
}

export default CustomButton;