import React, { useContext, useEffect, useState } from 'react';
import { searchIcon } from '../icons/icons';
import { actions, store } from '../context/store';

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const { dispatch } = useContext(store);

  useEffect(() => {
    const timer = setTimeout(() => {
      const stateValueName = (inputValue.toLowerCase() === '') ? null : inputValue.toLowerCase();
      if (!stateValueName) {
        dispatch(actions.showAllAuthors());
        return;
      }
      dispatch(actions.searchAuthors(stateValueName));
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = ({ target: { value } }) => {
    setInputValue(value);
  };
  return (
    <div className="flex w-full p-2 bg-even">
      <div role="img" className="flex items-center mr-2">{searchIcon}</div>
      <input
        type="text"
        className="placeholder-grey h-8 w-full bg-even pl-1 outline-none"
        placeholder="поиск авторов по имени"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};
