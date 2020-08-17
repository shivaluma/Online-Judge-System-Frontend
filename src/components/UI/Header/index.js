import React from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FaCode, FaCaretDown } from 'react-icons/fa';
import {
  makeSelectCurrentUser,
  makeSelectUserData,
} from '../../../containers/App/selectors';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { removeUser } from '../../../containers/App/actions';
import Avatar from '../Avatar';
import UserBoard from './UserBoard';
import useComponentVisible from '../../../hooks/useComponentVisible';
const Header = ({ isLogin, user, removeUser, noContainer }) => {
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem('brosjudge-token');
    removeUser();
    history.replace('/');
  };

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

        <nav className='flex ml-8 text-sm list-none text-gray-1000'>
          <li className='cursor-pointer hover:text-gray-200'>Explore</li>
          <Link to='/problemset'>
            <li className='ml-6 cursor-pointer hover:text-gray-200'>
              Problems
            </li>
          </Link>
          <li className='ml-6 cursor-pointer hover:text-gray-200'>Mock</li>
          <li className='ml-6 cursor-pointer hover:text-gray-200'>Contest</li>
          <Link to='/playground'>
            <li className='ml-6 cursor-pointer hover:text-orange-500'>
              Playground
            </li>
          </Link>
          <Link to='/discuss'>
            <li className='ml-6 cursor-pointer hover:text-gray-200'>Discuss</li>
          </Link>
        </nav>

        <div className='px-6 ml-auto text-sm text-gray-200 border-l border-gray-600'>
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
                className='flex items-center h-full outline-none opacity-75 hover:opacity-100 duration-300'
                onClick={ToggleUserBoard}
                tabIndex={-1}
              >
                <Avatar size={6} />
                <FaCaretDown className='ml-1 text-xs' />
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
