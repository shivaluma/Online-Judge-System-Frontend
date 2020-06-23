import React, { useEffect } from 'react';

import Header from '../components/UI/Header';
export default () => {
  useEffect(() => {}, []);
  return (
    <div
      className='w-screen h-screen'
      style={{
        backgroundImage:
          'radial-gradient(closest-side at 50% 135%, #ffffff 50%, #eceff1 100%)',
      }}
    >
      <Header />
    </div>
  );
};
