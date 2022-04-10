import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Dashboard from './pages/dashboard';
import Ticket from './pages/ticket';
import NotFound from './pages/NotFound';

const Routes = () => {
  return (
    <Navbar>
      <Switch>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="tickets" exact element={<Ticket />} />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </Navbar>
  );
};

export default Routes;
