import { createStore, applyMiddleware } from 'redux';

function createStoreMiddlewares(reducers, middlewares){
  const enhancer = applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};

export default createStoreMiddlewares;