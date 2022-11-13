import React from "react";
import CustomButton from './CustomButton'
import "./pagination.css";


const Pagination = ({ pkmnPerPage, totalPkmn, paginate, currentPage }) => {
  // const [isActive, setIsActive] = useState(false);
  const pageNumbers = [];


  for (let i = 1; i <= Math.ceil(totalPkmn / pkmnPerPage); i++) {
    pageNumbers.push(i);
  }

  const clickHandler = (number) => {
    paginate(number);
  }

  const leftClickHandler = () => {
    const prev = currentPage >= 1 ? currentPage - 1 : 1;
    if (currentPage > 1) {
      paginate(prev);
    }
  }
  const rightClickHandler = () => {
    const next = currentPage + 1;
    if (currentPage < pageNumbers.length) {
      paginate(next);
    }
  }
  // console.log(pageNumbers.length - 4)
  return (
    <nav className='paginationContainer'>
      <div className='pagination'>
        {
          pageNumbers.length > 1 ?
            <button
              onClick={() => leftClickHandler()}
              className='pageLinkArrow'
              style={{ fontWeight: '700' }}
            >
              {`<`}
            </button>
            : null
        }
        <p
          onClick={() => paginate(1)}
          className='tresPuntosPaginate'
          style={
            currentPage > 3 ? { color: 'aliceblue' } : null}
        > ...</p>
        {
          pageNumbers && pageNumbers.map((number) => {
            return (currentPage >= pageNumbers.length - 1 && number >= pageNumbers.length - 4) ?
              <CustomButton
                currentPage={currentPage}
                clickHandler={clickHandler}
                key={number}
                number={number}
              />
              : (currentPage === 1 && number < 6) ?
                <CustomButton
                  currentPage={currentPage}
                  clickHandler={clickHandler}
                  key={number}
                  number={number}
                />
                : (currentPage === 2 && number < 6) ?
                  <CustomButton
                    currentPage={currentPage}
                    clickHandler={clickHandler}
                    key={number}
                    number={number}
                  />
                  : (number > currentPage - 3 && number < currentPage + 3)
                    ? (
                      <CustomButton
                        currentPage={currentPage}
                        clickHandler={clickHandler}
                        key={number} number={number}

                      />
                    )
                    : null
          })
        }
        <p
          onClick={() => paginate(pageNumbers.length)}
          className='tresPuntosPaginate'
          style={
            currentPage < pageNumbers.length ?
              { color: 'aliceblue' } : null}
        > ... </p>
        {pageNumbers.length > 1 ?
          <button
            onClick={() => rightClickHandler()}
            className='pageLinkArrow'
            style={{ fontWeight: '700', transform: 'rotate(180deg)' }}
          >
            {`<`}
          </button>
          : null
        }
      </div>
    </nav>
  );
};

export default Pagination;