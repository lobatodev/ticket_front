import React, { lazy, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Load from './pages/SplashScreen';
import Login from './pages/login';
const Routes = lazy(() => import('./routes'));

function App() {
  const signIn = localStorage.getItem('user') || false;
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Suspense fallback={<Load />}>
          {signIn ? <Routes /> : <Login />}
        </Suspense>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
