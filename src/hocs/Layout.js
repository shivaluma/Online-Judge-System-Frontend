import React from 'react';
import Header from '../components/UI/Header';
import Footer from '../components/UI/Footer';

const Layout = ({ children, className, hideFooter }) => {
  return (
    <div className={className}>
      <Header />
      {children}
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
