import React, { useLayoutEffect } from 'react';
import { store } from '../store';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const SplashScreen = () => {
  const { signed, token } = store.getState().auth;
  useLayoutEffect(() => {
    if (signed) {
      const expires_date = jwt_decode(token).exp;
      const now = (Date.now() / 1000).toFixed(0);
      if (now >= expires_date) {
        window.localStorage.clear();
        return <Navigate to="/" />;
      }
    }
  }, [signed, token]);
  return (
    <div>
      <h1>SplashScreen</h1>
    </div>
  );
};
export default SplashScreen;
