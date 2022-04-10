import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';

import Dashboard from './pages/dashboard';
import Navbar from './components/Navbar';
// import NotFound from './pages/NotFound';

const Routes = () => {
  return (
    <Navbar>
      <Switch>
        <Route path="app" exact element={<Dashboard />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Switch>
    </Navbar>
  );
};

export default Routes;
