import React, { useContext, useEffect, useState } from 'react';
import { Author } from './Author';
import { store, actions } from '../context/store';
import { ButtonGroup } from './ButtonGroup';
import { Pagination } from './Pagination';

export const AuthorsList = () => {
  const [authors, setAuthors] = useState([]);
  const {
    state: {
      authorsToShow, perPage, currentPage, prevPage, nextPage, totalCountAuthors,

    }, dispatch,
  } = useContext(store);
  const handleNameSort = ({ target }) => { dispatch(actions.sortBy(target.value)); };
  const [isLast, setIsLast] = useState(nextPage === 0);
  const [isFirst, setIsFirst] = useState(prevPage === 0);
  const getEndCount = () => {
    if (perPage * currentPage <= totalCountAuthors) {
      return perPage * currentPage;
    }
    if (totalCountAuthors < 10) {
      return totalCountAuthors;
    }
    return totalCountAuthors;
  };
  const end = getEndCount();
  const handlePageChange = ({ target }) => {
    dispatch(actions.onPageChange(target.value));
  };

  useEffect(() => {
    setAuthors(authorsToShow);
  }, [authorsToShow]);

  useEffect(() => {
    setIsLast(nextPage === 0);
    setIsFirst(prevPage === 0);
  }, [nextPage, prevPage]);

  return (
    <>
      <ul className="">
        {authors.map((author) => (
          <Author key={author.name} author={author} />
        ))}
        <div className="mt-2 px-8">
          <ButtonGroup label="name" onClick={handleNameSort} id="name" />
          <ButtonGroup label="page views" onClick={handleNameSort} id="pageviews" />
        </div>
      </ul>
      <Pagination
        start={prevPage * perPage + 1}
        end={end}
        isLast={isLast}
        isFirst={isFirst}
        onClick={handlePageChange}
      />
    </>
  );
};
