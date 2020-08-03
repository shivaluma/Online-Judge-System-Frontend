import React from 'react';
import Header from '../components/UI/Header';
import Footer from '../components/UI/Footer';

const Layout = ({ children, className }) => {
  return (
    <div className={className}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
