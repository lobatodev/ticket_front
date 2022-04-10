import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

// eslint-disable-next-line import/no-anonymous-default-export
export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'root',
      storage,
      whitelist: ['auth'],
    },
    reducers
  );

  return persistedReducer;
};
