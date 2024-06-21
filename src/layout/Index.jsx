import React from 'react';
import Header from './Header';
import Sidebar from './sidebar';
import Footer from './Footer';
import './index.css'


const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="page-content">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
