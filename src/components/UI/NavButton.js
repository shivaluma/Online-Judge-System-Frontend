import React from 'react';
import { Link } from 'react-router-dom';
export default ({ color, to, text }) => (
  <Link to={to}>
    <button
      className='px-4 py-2 mx-2 font-thin focus:outline-none hover:bg-current group'
      style={{
        borderRadius: '1020px',
        color: `${color}`,
      }}
    >
      <span className='text-white group-hover:text-black'>{text}</span>
    </button>
  </Link>
);
