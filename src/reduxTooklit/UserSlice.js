import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAuth: null,
  id: '',
  name: '',
  email: '',
  callingCode: '',
  cca2: '',
  mobile: '',
  profile: '',
};

const UserSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const {setUser} = UserSlice.actions;
export default UserSlice.reducer;
