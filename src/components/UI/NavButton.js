import React from 'react';
import { Link } from 'react-router-dom';
export default ({ color, to, text }) => (
  <Link to={to}>
    <button
      className='focus:outline-none mx-2 px-4 py-2 font-thin hover:bg-current group'
      style={{
        borderRadius: '1020px',
        color: `${color}`,
      }}
    >
      <span className='text-white group-hover:text-black'>{text}</span>
    </button>
  </Link>
);
