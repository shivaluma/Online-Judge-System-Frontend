/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';

import Header from '../../components/UI/Header';
import { FaCode, FaFacebookF, FaGoogle, FaGithub } from 'react-icons/fa';
import FormSignIn from '../../components/UI/FormSignIn';
import FormSignUp from '../../components/UI/FormSignUp';
import isEmail from 'validator/lib/isEmail';
import API from '../../api';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateUser } from '../App/actions';

const Auth = ({ isLoginMode, history, currentUser, updateUser }) => {
  const [mode, setMode] = useState(isLoginMode);
  const [formInfo, setFormInfo] = useState({
    username: {
      value: '',
      error: true,
      errorDesc: '',
      changed: false,
    },
    email: {
      value: '',
      error: true,
      errorDesc: '',
      changed: false,
    },
    pwd: {
      value: '',
      error: true,
      errorDesc: '',
      changed: false,
    },
    confirmPwd: {
      value: '',
      error: true,
      errorDesc: '',
      changed: false,
    },
  });
  const [wrongInfo, setWrongInfo] = useState({
    status: false,
    description: '',
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    document.title = mode ? 'Login' : 'Sign Up';
    setFormInfo({
      username: {
        value: '',
        error: true,
        errorDesc: '',
        changed: false,
      },
      email: {
        value: '',
        error: true,
        errorDesc: '',
        changed: false,
      },
      pwd: {
        value: '',
        error: true,
        errorDesc: '',
        changed: false,
      },
      confirmPwd: {
        value: '',
        error: true,
        errorDesc: '',
        changed: false,
      },
    });
    setWrongInfo({
      status: false,
      description: '',
    });
  }, [mode]);

  const loginHandler = async (event) => {
    event.preventDefault();
    if (isLoading) return;
    setLoading(true);
    const body = {
      username: formInfo.username.value,
      password: formInfo.pwd.value,
    };

    try {
      const response = await API.post('auth/login', body);
      localStorage.setItem('brosjudge-token', response.data.accessToken);
      updateUser(response.data.user);
      history.replace('/');
    } catch (err) {
      setWrongInfo({
        status: true,
        description: 'Wrong username or password.',
      });
    }
    setLoading(false);
  };

  const registerHandler = async (event) => {
    event.preventDefault();
    event.preventDefault();
    if (isLoading) return;
    setLoading(true);
    const body = {
      username: formInfo.username.value,
      password: formInfo.pwd.value,
      confirmPassword: formInfo.confirmPwd.value,
      email: formInfo.email.value,
    };

    try {
      const response = await API.post('auth/signup', body);
      console.log(response);
      setMode(true);
    } catch (err) {
      if (
        err.response.data.duplicate &&
        err.response.data.duplicate.hasOwnProperty('username')
      ) {
        const newUsername = { ...formInfo.username };
        newUsername.error = true;
        newUsername.errorDesc = 'Username has exist.';
        setFormInfo({
          ...formInfo,
          username: newUsername,
        });
      }

      if (
        err.response.data.duplicate &&
        err.response.data.duplicate.hasOwnProperty('email')
      ) {
        const newEmail = { ...formInfo.email };
        newEmail.error = true;
        newEmail.errorDesc = 'Email has exist.';
        setFormInfo({
          ...formInfo,
          email: newEmail,
        });
      }
    }
    setLoading(false);
  };

  const facebookLoginHandler = async (response) => {
    try {
      const loginResult = await API.post('auth/facebook', {
        id: response.id,
        fbAccessToken: response.accessToken,
      });

      if (loginResult.status === 200) {
      }
    } catch (err) {
      setWrongInfo({
        status: true,
        description: err.response.data.message,
      });
    }
  };
  const googleLoginHandler = async (response) => {
    try {
      const loginResult = await API.post('auth/google', {
        ggAccessToken: response.accessToken,
      });

      if (loginResult.status === 200) {
      }
    } catch (err) {
      console.log(err.response);
      if (err.response.status === 302) {
        history.push({
          pathname: `/accounts/social-login/`,
          state: {
            email: err.response.data.email,
            token: err.response.data.usernameToken,
          },
        });
      } else {
        setWrongInfo({
          status: true,
          description: err.response.data.message,
        });
      }
    }
  };

  const formChangeHandler = (value, key) => {
    if (wrongInfo && mode) {
      setWrongInfo({
        status: false,
        description: '',
      });
    }
    if (key === 'username') {
      const newUsername = { ...formInfo.username };
      newUsername.changed = true;
      newUsername.value = value;
      if (newUsername.value.length === 0 && newUsername.changed) {
        newUsername.error = true;
        newUsername.errorDesc = 'Username cannot be empty.';
      } else {
        newUsername.error = false;
      }
      setFormInfo({
        ...formInfo,
        username: newUsername,
      });
    }
    if (key === 'pwd') {
      const newPwd = { ...formInfo.pwd };
      newPwd.changed = true;
      newPwd.value = value;
      if (newPwd.value.length === 0 && newPwd.changed) {
        newPwd.error = true;
        newPwd.errorDesc = 'Password cannot be empty.';
      } else {
        newPwd.error = false;
      }
      setFormInfo({ ...formInfo, pwd: newPwd });
    }
    if (key === 'email') {
      const newEmail = { ...formInfo.email };
      newEmail.changed = true;
      newEmail.value = value;
      if (!isEmail(newEmail.value) && newEmail.changed) {
        newEmail.error = true;
        newEmail.errorDesc = 'Not a valid email.';
      } else {
        newEmail.error = false;
      }
      setFormInfo({ ...formInfo, email: newEmail });
    }
    if (key === 'confirmPwd') {
      const newConfirmPwd = { ...formInfo.confirmPwd };
      newConfirmPwd.changed = true;
      newConfirmPwd.value = value;
      if (newConfirmPwd.value !== formInfo.pwd.value) {
        newConfirmPwd.error = true;
        newConfirmPwd.errorDesc = 'Confirm password do not match.';
      } else {
        newConfirmPwd.error = false;
      }
      setFormInfo({ ...formInfo, confirmPwd: newConfirmPwd });
    }
  };

  const socialLoginRedirect = (id) => {
    history.push(`/accounts/social-login/${id}`);
  };

  return (
    <div
      className='w-screen h-screen'
      style={{
        backgroundImage:
          'radial-gradient(closest-side at 50% 135%, #ffffff 50%, #eceff1 100%)',
      }}
    >
      <Header />

      <div
        className='mt-32 mx-auto text-center bg-white'
        style={{ width: '400px' }}
      >
        <div className='flex flex-col items-center pt-12'>
          <FaCode className='text-2xl text-black' />
          <span className='typo-round text-2xl'>BrosCode</span>
        </div>
        {mode ? (
          <FormSignIn
            username={formInfo.username}
            pwd={formInfo.pwd}
            handler={formChangeHandler}
            submitHandler={loginHandler}
            wrongInfo={wrongInfo}
            loading={isLoading}
          />
        ) : (
          <FormSignUp
            username={formInfo.username}
            pwd={formInfo.pwd}
            confirmPwd={formInfo.confirmPwd}
            email={formInfo.email}
            handler={formChangeHandler}
            submitHandler={registerHandler}
            wrongInfo={wrongInfo}
            loading={isLoading}
          />
        )}
        {mode ? (
          <div className='mt-3 text-sm px-8 flex justify-between text-teal-700'>
            <span>Forgot Password?</span>
            <span
              className='cursor-pointer hover:underline'
              onClick={() => setMode(false)}
            >
              Sign Up
            </span>
          </div>
        ) : (
          <div className='mt-3 text-sm px-8 text-center text-gray-500'>
            Have an account?{' '}
            <span
              className='cursor-pointer hover:underline text-teal-700'
              onClick={() => setMode(true)}
            >
              Login
            </span>
          </div>
        )}

        <div className='mx-auto pb-1 mt-2'>
          <span className='text-center text-sm text-gray-500'>
            or sign {mode ? 'up' : 'in'} with
          </span>
        </div>

        <div className='flex justify-between px-8 mt-1 pb-16'>
          <FacebookLogin
            appId='297734224952735'
            callback={facebookLoginHandler}
            render={(renderProps) => (
              <button
                className='text-blue-700 px-10 py-3 border-blue-700 border-2 rounded-lg hover:bg-blue-700 hover:text-white transition-all duration-300 focus:outline-none'
                onClick={renderProps.onClick}
              >
                <FaFacebookF />
              </button>
            )}
          />

          <GoogleLogin
            clientId='796130238984-t9jd9p7s9178cngceio9ctipia1rumfm.apps.googleusercontent.com'
            render={(renderProps) => (
              <button
                className='text-red-700 px-10 py-3 border-red-700 border-2 rounded-lg hover:bg-red-700 hover:text-white transition-all duration-300 focus:outline-none'
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FaGoogle />
              </button>
            )}
            buttonText='Login'
            onSuccess={googleLoginHandler}
            onFailure={googleLoginHandler}
            cookiePolicy={'single_host_origin'}
          />

          <button className='text-black px-10 py-3 border-black border-2 rounded-lg hover:bg-black hover:text-white transition-all duration-300 focus:outline-none'>
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.global.currentUser,
  userData: state.global.userData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateUser }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
