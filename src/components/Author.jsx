/* eslint-disable camelcase */
import React from 'react';
import { ratingIconPreparator } from '../helpers';

export const Author = ({ author }) => {
  const isRated = Object.prototype.hasOwnProperty.call(author, 'rating');
  let rating = null;
  let ratingIcon = null;
  if (isRated) {
    rating = author.rating;
    ratingIcon = ratingIconPreparator(rating);
  }
  const {
    orderNumber, name, count_pub, pageviews,
  } = author;
  return (
    <li className="flex items-center justify-between p-2 h-12 odd:bg-odd even:bg-even">
      <div className="flex items-center">
        <span className="text-xxs mr-4 text-gray-400 w-3 text-center">{orderNumber}</span>
        <div className="flex justify-center items-center mr-2 w-7 h-7 rounded-full bg-indigo-500 shadow-sm">
          <span>{name[0]}</span>
        </div>
        <div className="flex flex-col">
          <div className="text-xs text-gray-700 font-bold leading-3">{name}</div>
          <span className="text-xs text-gray-400 leading-3">{`${count_pub} публ.`}</span>
        </div>
      </div>
      {isRated && <span>{ratingIcon}</span>}
      <span className="text-xs text-gray-700 font-bold">{pageviews}</span>
    </li>
  );
};
