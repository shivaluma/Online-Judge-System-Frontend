import React from 'react';

import DefaultAvatar from '../../assets/images/default_avatar.jpg';

const Avatar = ({ url, username, isRound, size }) => {
  const imgSize = `h-${size} w-${size}`;
  return url ? (
    <img src={url} alt={username + ' avatar'} />
  ) : (
    <img
      src={DefaultAvatar}
      className={`${imgSize} object-cover bg-center ${
        isRound ? 'rounded-full' : 'rounded-md'
      }`}
      alt={username + ' avatar'}
    />
  );
};

export default Avatar;
