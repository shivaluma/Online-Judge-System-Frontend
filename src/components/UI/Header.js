import React from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FaCode } from 'react-icons/fa';
import {
  makeSelectCurrentUser,
  makeSelectUserData,
} from '../../containers/App/selectors';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { removeUser } from '../../containers/App/actions';
const Header = ({ isLogin, user, removeUser }) => {
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem('brosjudge-token');
    removeUser();
    history.replace('/');
  };

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
        <Link to='/'>
          <span className='text-xl font-normal text-gray-200 typo-round'>
            BrosCode
          </span>
        </Link>

        <nav className='list-none flex text-sm text-gray-200 ml-8'>
          <li>Explore</li>
          <li className='ml-6'>Problems</li>
          <li className='ml-6'>Mock</li>
          <li className='ml-6'>Contest</li>
          <Link to='/playground'>
            <li className='ml-6 hover:text-orange-500'>Playground</li>
          </Link>
          <li className='ml-6'>Discuss</li>
        </nav>

        <div className='ml-auto px-6 border-l border-gray-600 text-gray-200 text-sm'>
          {!isLogin ? (
            <>
              <Link to='/accounts/signup'>
                <span className='mr-2 font-semibold'>Signup</span>
              </Link>
              <span className='font-thin text-gray-500'>or</span>
              <Link to='/accounts/login'>
                <span className='ml-2 font-semibold'>Login</span>
              </Link>
            </>
          ) : (
            <>
              <span className='mr-2 font-semibold'>Hi, {user.username}</span>

              <span
                className='ml-2 font-semibold text-red-400 hover:cursor-pointer'
                onClick={logoutHandler}
              >
                logout
              </span>
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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ removeUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
