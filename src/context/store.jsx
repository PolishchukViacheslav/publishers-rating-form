import React, { createContext, useReducer } from 'react';
import { data } from '../data/data';
import { addRatingToMax3, sorter } from '../helpers';

const withRating = addRatingToMax3(data);
const preparedAuthorsList = withRating.map((item, idx) => ({ ...item, orderNumber: idx + 1 }));

const initialState = {
  initialAuthorsList: preparedAuthorsList,
  sortedAuthorsList: null,
  searchResults: null,
  authorsToShow: [],
  perPage: 10,
  currentPage: 1,
  nextPage: 2,
  prevPage: 0,
  totalCountAuthors: preparedAuthorsList.length,
};
const store = createContext(initialState);
const { Provider } = store;
const reducer = (state, action) => {
  switch (action.type) {
    case 'SORT_BY': {
      const sortType = action.payload;
      const {
        perPage, currentPage, prevPage, initialAuthorsList, searchResults,
      } = state;
      const newState = sorter((searchResults || initialAuthorsList), sortType);

      return {
        ...state,
        sortedAuthorsList: newState,
        authorsToShow: newState.slice((prevPage * perPage), (currentPage * perPage)),
      };
    }
    case 'SHOW_ALL_AUTHORS': {
      const {
        initialAuthorsList, perPage, searchResults, sortedAuthorsList,
      } = state;
      const newState = {
        ...state,
        sortedAuthorsList: searchResults ? null : sortedAuthorsList,
        totalCountAuthors: initialAuthorsList.length,
        searchResults: null,
        perPage: 10,
        currentPage: 1,
        nextPage: 2,
        prevPage: 0,
        authorsToShow: initialAuthorsList.slice(0, perPage),
      };
      return newState;
    }
    case 'SEARCH_AUTHORS': {
      const { sortedAuthorsList, initialAuthorsList } = state;
      const searchResults = (sortedAuthorsList || initialAuthorsList)
        .filter(
          ({ name }) => name.toLowerCase().includes(action.payload),
        );

      if (!searchResults.length) {
        return {
          ...state,
          searchResults: null,
          authorsToShow: (sortedAuthorsList || initialAuthorsList).slice(0, 10),
          totalCountAuthors: (sortedAuthorsList || initialAuthorsList).length,
        };
      }

      const authorsToShow = searchResults.slice(0, 10);
      const nextPage = (
        searchResults
        || sortedAuthorsList
        || initialAuthorsList
      ).length > 10 ? 2 : 0;
      return {
        ...state,
        searchResults,
        authorsToShow,
        currentPage: 1,
        nextPage,
        prevPage: 0,
        totalCountAuthors: searchResults.length,
      };
    }
    case 'PAGE_CHANGE': {
      const {
        prevPage,
        nextPage,
        perPage,
        currentPage,
        searchResults,
        sortedAuthorsList,
        initialAuthorsList,
        totalCountAuthors,
      } = state;
      if (action.payload === 'next') {
        const newState = {
          ...state,
          prevPage: currentPage,
          currentPage: nextPage,
          nextPage: ((perPage * nextPage) <= totalCountAuthors) ? nextPage + 1 : 0,
          authorsToShow: (searchResults
            || sortedAuthorsList
            || initialAuthorsList).slice(currentPage * perPage, nextPage * perPage),
        };
        return newState;
      }
      if (action.payload === 'prev') {
        const newState = {
          ...state,
          nextPage: currentPage,
          currentPage: prevPage,
          prevPage: (prevPage > 1) ? prevPage - 1 : 0,
          authorsToShow: (searchResults
            || sortedAuthorsList
            || initialAuthorsList).slice((prevPage - 1) * perPage, prevPage * perPage),
        };
        return newState;
      }
      return {};
    }
    default:
      console.error(new Error());
      return state;
  }
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

const actions = {
  searchAuthors: (payload) => ({ type: 'SEARCH_AUTHORS', payload }),
  showAllAuthors: () => ({ type: 'SHOW_ALL_AUTHORS' }),
  sortBy: (payload) => ({ type: 'SORT_BY', payload }),
  onPageChange: (payload) => ({ type: 'PAGE_CHANGE', payload }),
};

export { store, StateProvider, actions };
