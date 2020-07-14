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
const Header = ({ isLogin, user, removeUser }) => {
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem('brosjudge-token');
    removeUser();
    history.replace('/');
  };

  const [isPopupShowing, setPopupShowing] = useState(false);

  const ToggleUserBoard = () => {
    setPopupShowing(!isPopupShowing);
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

        <nav className='list-none flex text-sm text-gray-500 ml-8'>
          <li className='hover:text-gray-200 cursor-pointer'>Explore</li>
          <li className='ml-6 hover:text-gray-200 cursor-pointer'>Problems</li>
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
              {isPopupShowing ? (
                <>
                  <div
                    className='bg-white rotate-45 absolute transform'
                    style={{
                      height: '10px',
                      width: '10px',
                      right: '23px',
                      bottom: '-16px',
                    }}
                  ></div>
                  <div
                    className='transition duration-300 absolute bg-white shadow-lg rounded-lg border-none py-2 overflow-hidden'
                    style={{ minWidth: '240px', right: '1%', top: '30px' }}
                  >
                    <div className='w-full h-6 text-gray-800 flex justify-between py-1 px-2'>
                      <div className='flex items-center text-sm'>
                        <FaUser />
                        <span className='font-semibold ml-1'>
                          {user.username}
                        </span>
                      </div>

                      <div
                        className='border rounded-md text-teal-700 border-teal-700'
                        style={{ fontSize: '9px', padding: '0px 5px' }}
                      >
                        Member
                      </div>
                    </div>

                    <div className='flex mt-2 border-t border-b border-gray-200'>
                      <div className='w-1/3 h-20 border-r flex flex-col items-center justify-center hover:bg-gray-200'>
                        <FaHeart className='text-red-600' />
                        <span
                          style={{
                            fontSize: '10px',
                            color: '#95a5a6',
                            marginTop: '5px',
                          }}
                        >
                          My List
                        </span>
                      </div>
                      <div className='w-1/3 h-20 border-r flex flex-col items-center justify-center hover:bg-gray-200'>
                        <FaChartPie className='text-orange-600' />
                        <span
                          style={{
                            fontSize: '10px',
                            color: '#95a5a6',
                            marginTop: '5px',
                          }}
                        >
                          Progress
                        </span>
                      </div>
                      <div className='w-1/3 h-20 border-r flex flex-col items-center justify-center hover:bg-gray-200'>
                        <FaFileCode className='text-green-600' />
                        <span
                          style={{
                            fontSize: '10px',
                            color: '#95a5a6',
                            marginTop: '5px',
                          }}
                        >
                          Submissions
                        </span>
                      </div>
                    </div>

                    <div className='px-2 py-2 text-sm text-gray-700 hover:bg-gray-200'>
                      Change Password
                    </div>
                    <div className='px-2 py-2 text-sm text-red-700 hover:bg-gray-200'>
                      Sign Out
                    </div>
                  </div>
                </>
              ) : null}
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
