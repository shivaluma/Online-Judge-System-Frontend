import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';
import {
  FaCode,
  FaCaretDown,
  FaUser,
  FaHeart,
  FaFileCode,
  FaChartPie,
} from 'react-icons/fa';
import {
  makeSelectCurrentUser,
  makeSelectUserData,
} from '../../containers/App/selectors';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { removeUser } from '../../containers/App/actions';
import Avatar from './Avatar';
import UserBoard from './Header/UserBoard';
import useComponentVisible from '../../hooks/useComponentVisible';
const Header = ({ isLogin, user, removeUser, noContainer }) => {
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem('brosjudge-token');
    removeUser();
    history.replace('/');
  };

  const [isPopupShowing, setPopupShowing] = useState(false);

  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);

  const ToggleUserBoard = () => {
    setIsComponentVisible(true);
  };

  return (
    <div
      className='w-full h-12 border-0'
      style={{
        //   background: 'linear-gradient(15deg, #8e2de2, #4a00e0)',
        background: '#222',
      }}
    >
      <div
        className={`${
          !noContainer ? 'container' : 'px-3'
        } flex h-full items-center`}
      >
        <FaCode className='inline-block mr-2 text-xl font-normal text-gray-200' />
        <Link to='/'>
          <span className='text-xl font-normal text-gray-200 typo-round'>
            BrosCode
          </span>
        </Link>

        <nav className='list-none flex text-sm text-gray-500 ml-8'>
          <li className='hover:text-gray-200 cursor-pointer'>Explore</li>
          <Link to='/problemset'>
            <li className='ml-6 hover:text-gray-200 cursor-pointer'>
              Problems
            </li>
          </Link>
          <li className='ml-6 hover:text-gray-200 cursor-pointer'>Mock</li>
          <li className='ml-6 hover:text-gray-200 cursor-pointer'>Contest</li>
          <Link to='/playground'>
            <li className='ml-6 hover:text-orange-500 cursor-pointer'>
              Playground
            </li>
          </Link>
          <li className='ml-6 hover:text-gray-200 cursor-pointer'>Discuss</li>
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
            <div className='relative'>
              <div
                className='h-full flex items-center opacity-75 hover:opacity-100 duration-300 outline-none'
                onClick={ToggleUserBoard}
                tabIndex={-1}
              >
                <Avatar size={6} />
                <FaCaretDown className='text-xs ml-1' />
              </div>
              <div ref={ref}>
                {isComponentVisible && (
                  <UserBoard user={user} logout={logoutHandler} />
                )}
              </div>
            </div>
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
