import React from 'react';
import Sidebar from './Sidebar';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';

export default function Home({ OtherComponent }) {
  const hasChildContent = !!Outlet({});

  return (
    <div>
      <Nav />
      <div className='d-flex '>
        <div>
          <Sidebar />
        </div>
        <div className='d-flex justify-content-center mx-5'>
          <Outlet />
          {!hasChildContent && <OtherComponent />}
        </div>
      </div>
    </div>
  );
}
