import {configureStore} from '@reduxjs/toolkit';
import UserSlice from './UserSlice';
import CountSlice from './CountSlice';
export const store = configureStore({
  reducer: {
    user: UserSlice,
    count: CountSlice,
  },
});
