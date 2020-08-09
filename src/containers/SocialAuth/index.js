import React, { useState, useRef } from 'react';

import Header from '../../components/UI/Header';
import { FaCode } from 'react-icons/fa';
import FormSocial from '../../components/UI/Form/FormSocial';
import API from '../../api';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateUser } from '../App/actions';
const SocialAuth = (props) => {
  const [username, setUsername] = useState({
    value: '',
    error: false,
    errDesc: '',
    changed: false,
  });

  const [email, setEmail] = useState({
    value: props.location?.state?.email || '',
    error: false,
    errDesc: '',
    changed: true,
  });

  const [emailError, setEmailError] = useState({
    error: false,
    errorDesc: '',
    isValid: false,
  });

  const [usernameError, setUsernameError] = useState({
    error: false,
    errorDesc: '',
    isValid: false,
  });

  const [wrongInfo, setWrongInfo] = useState({
    status: false,
    description: '',
  });
  const [isLoading, setLoading] = useState(false);

  const checkEmail = async (emailAddress) => {
    if (emailAddress.trim() === '') return;
    try {
      const response = await API.get('/auth/check-email?email=' + emailAddress);
      setEmailError({
        error: false,
        errorDesc: response.data.message,
        isValid: true,
      });
    } catch (err) {
      setEmailError({
        error: true,
        errorDesc: err.response.data.message,
        isValid: false,
      });
    }
  };

  const checkUsername = async (username) => {
    if (username.trim() === '') return;
    try {
      const response = await API.get(
        '/auth/check-username?username=' + username
      );
      setUsernameError({
        error: false,
        errorDesc: response.data.message,
        isValid: true,
      });
    } catch (err) {
      setUsernameError({
        error: true,
        errorDesc: err.response.data.message,
        isValid: false,
      });
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await API.post('/auth/update-username', {
        username: username.value,
        email: email.value,
        usernameToken: props.location?.state?.token || '',
      });
      console.log('response : ', response);
      console.log(props.history);
      localStorage.setItem('brosjudge-token', response.data.accessToken);
      props.updateUser(response.data.user);
      props.history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const debounceEmail = useRef(null);
  const debounceUsername = useRef(null);
  const formChangeHandler = (value, key) => {
    if (wrongInfo) {
      setWrongInfo(false);
    }

    if (key === 'username') {
      if (usernameError.error || usernameError.isValid) {
        setUsernameError({
          error: false,
          errorDesc: '',
          isValid: false,
        });
      }
      if (debounceUsername.current) {
        clearTimeout(debounceUsername.current);
      }
      debounceUsername.current = setTimeout(() => checkUsername(value), 400);
      const newUsername = { ...username };
      newUsername.changed = true;
      newUsername.value = value;

      if (newUsername.value.length === 0 && newUsername.changed) {
        newUsername.error = true;
        newUsername.errorDesc = 'Username cannot be empty.';
      } else {
        newUsername.error = false;
      }
      setUsername(newUsername);
    }

    if (key === 'email') {
      if (emailError.error || emailError.isValid) {
        setEmailError({
          error: false,
          errorDesc: '',
          isValid: false,
        });
      }
      if (debounceEmail.current) {
        clearTimeout(debounceEmail.current);
      }
      debounceEmail.current = setTimeout(() => checkEmail(value), 400);
      const newEmail = { ...email };
      newEmail.changed = true;
      newEmail.value = value;
      if (newEmail.value.length === 0 && newEmail.changed) {
        newEmail.error = true;
        newEmail.errorDesc = 'Email cannot be empty.';
      } else {
        newEmail.error = false;
      }
      setEmail(newEmail);
    }
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
        className='mt-32 mx-auto text-center bg-white py-12'
        style={{ width: '400px' }}
      >
        <div className='flex flex-col items-center '>
          <FaCode className='text-2xl text-black' />
          <span className='typo-round text-2xl'>BrosCode</span>
        </div>
        <span className='text-sm text-gray-700'>
          To finish registration by social account, please choose a username.
        </span>
        <FormSocial
          username={username}
          email={email}
          emailServerCheck={emailError}
          usernameServerCheck={usernameError}
          handler={formChangeHandler}
          submitHandler={submitHandler}
          wrongInfo={wrongInfo}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateUser }, dispatch);

export default connect(null, mapDispatchToProps)(SocialAuth);
