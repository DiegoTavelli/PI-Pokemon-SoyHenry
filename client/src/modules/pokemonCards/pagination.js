import React from "react";
import "./pagination.css";


const Pagination = ({ pkmnPerPage, totalPkmn, paginate }) => {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPkmn / pkmnPerPage); i++) {
    pageNumbers.push(i);
  }

  const clickHandler = (number) => {
    paginate(number)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => {
              clickHandler(number);
            }}
            href={number}
            className='pageLink'
          >
            {` ${number}`}
          </button>
        ))}

      </ul>
    </nav>
  );
};

export default Pagination;