import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.component';


export default function Layout() {
  return <>
    <Navbar />
    <Outlet></Outlet>
  </>
}
