import React from 'react';

export const ButtonGroup = ({ label, onClick, id }) => (
  <div className="flex justify-between mb-2">
    <span className="text-gray-400 font-bold">{`Sort by ${label}:`}</span>
    <div className="mr-8">
      <button type="button" onClick={onClick} value={`${id}_asc`} className="text-gray-50 border px-1 transition duration-500 ease-in-out bg-primary hover:bg-gray-700 focus:outline-none rounded font-bold">asc</button>
      <button type="button" onClick={onClick} value={`${id}_desc`} className="text-gray-50 border px-1 transition duration-500 ease-in-out bg-primary hover:bg-gray-700 focus:outline-none rounded font-bold ml-1">desc</button>
      <button type="button" onClick={onClick} value={`${id}_init`} className="text-gray-50 border px-1 transition duration-500 ease-in-out bg-primary hover:bg-gray-700 focus:outline-none rounded font-bold ml-1">init</button>
    </div>
  </div>
);
