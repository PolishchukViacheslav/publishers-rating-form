import React, { useContext, useEffect } from 'react';
import { store, actions } from '../context/store';
import { AuthorsList } from './AuthorsList';
import { SearchBar } from './SearchBar';

export const Authors = () => {
  const { dispatch } = useContext(store);
  useEffect(() => {
    dispatch(actions.showAllAuthors());
  }, []);

  return (
    <div className="border w-96 rounded">
      <SearchBar />
      <AuthorsList />
    </div>
  );
};
