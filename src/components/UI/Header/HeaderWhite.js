import React from 'react';
import { Link } from 'react-router-dom';
import { FaCode } from 'react-icons/fa';
const HeaderWhite = () => {
  return (
    <div className='flex items-center w-full h-12 px-3 border border-gray-300'>
      <Link to='/'>
        <img
          src='https://assets.leetcode.com/static_assets/public/webpack_bundles/images/logo-dark.e99485d9b.svg'
          style={{ height: '20px' }}
          alt='logo'
        />
      </Link>

      <div className='flex ml-8 text-sm text-gray-600'>
        <nav>
          <Link to='/problemset'>Problem</Link>
          <Link to='/discuss' className='ml-5'>
            Discuss
          </Link>
          <Link to='/contest' className='ml-5'>
            Contest
          </Link>
        </nav>
      </div>

      <div className='ml-auto'>
        <svg
          viewBox='0 0 24 24'
          width='1.5em'
          height='1.5em'
          className='fill-current'
        >
          <path
            fillRule='evenodd'
            d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22z'
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeaderWhite;
