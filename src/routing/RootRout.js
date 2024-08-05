import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Explore from '../component/explore/Explore';
import Login from '../component/Login/login';
import Reg from '../component/registration/reg';
import LeftDrawer from '../component/leftdrawer/leftDrawer';
const RootRout = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Explore />}/>
      <Route path="/register" element={<Reg />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/rightDrawer" element={<LeftDrawer />}/>
      
      </Routes>
    </Router>
  );
}

export default RootRout;
