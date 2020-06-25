import React, { memo } from 'react';

import { FaCode } from 'react-icons/fa';
import {
  makeSelectCurrentUser,
  makeSelectUserData,
} from '../../containers/App/selectors';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const Header = ({ isLogin, user }) => {
  return (
    <div
      className='w-full h-12 border-0'
      style={{
        //   background: 'linear-gradient(15deg, #8e2de2, #4a00e0)',
        background: '#222',
      }}
    >
      <div className='container flex h-full items-center'>
        <FaCode className='inline-block mr-2 text-xl font-normal text-gray-200' />
        <span className='text-xl font-normal text-gray-200 typo-round'>
          BrosCode
        </span>

        <nav className='list-none flex text-sm text-gray-200 ml-8'>
          <li>Explore</li>
          <li className='ml-6'>Problems</li>
          <li className='ml-6'>Mock</li>
          <li className='ml-6'>Contest</li>
          <li className='ml-6'>Article</li>
          <li className='ml-6'>Discuss</li>
        </nav>

        <div className='ml-auto px-6 border-l border-gray-600 text-gray-200 text-sm'>
          {!isLogin ? (
            <>
              <span className='mr-2 font-semibold'>Signup</span>
              <span className='font-thin text-gray-500'>or</span>
              <span className='ml-2 font-semibold'>Login</span>
            </>
          ) : (
            <>
              <span className='mr-2 font-semibold'>Hi, {user.username}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLogin: makeSelectCurrentUser(),
  user: makeSelectUserData(),
});

export default connect(mapStateToProps)(Header);
