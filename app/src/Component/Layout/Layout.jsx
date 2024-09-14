import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../Header/Header'; 
import SideMenu from '../Side menu/SideMenu'; 
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="d-flex">
        <div className="w-30"><SideMenu /></div>
        <Container className='main-content p-0 b-0'>
          <Outlet/>
        </Container>
      </div>
    </div>
  );
};

export default Layout;
