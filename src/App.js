import React, { lazy, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Load from './pages/SplashScreen';
import Login from './pages/login';
import { store } from './store';
const Routes = lazy(() => import('./routes'));

function App() {
  const { signed } = store.getState().auth;
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Suspense fallback={<Load />}>
          {signed ? <Routes /> : <Login />}
        </Suspense>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
