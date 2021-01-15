import React from 'react';

export const Pagination = ({
  start, end, isFirst, isLast, onClick,
}) => (
  <div className="flex justify-center mb-2">
    <div>
      {!isFirst && <button type="button" value="prev" onClick={onClick} className="text-light-grey focus:outline-none">{'<'}</button>}
      <span className="text-white">{` ${start} - ${end} `}</span>
      {!isLast && <button type="button" value="next" onClick={onClick} className="text-light-grey focus:outline-none">{'>'}</button>}
    </div>
  </div>
);
