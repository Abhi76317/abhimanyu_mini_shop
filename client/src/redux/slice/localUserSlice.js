import { createSlice } from '@reduxjs/toolkit';
export const initialState = {
  user: window.localStorage.getItem('user') ?  JSON.parse(window.localStorage.getItem('user')) : null,
  token:window.localStorage.getItem('token') ?  window.localStorage.getItem('token'): null,
};
const localUserSlice = createSlice({
  name: 'localUserState',
  initialState,
  reducers: {
    setLocalUser: (state, action) => {
      state.user = action.payload;
      window.localStorage.setItem('user', JSON.stringify(state.user))
    },
    setToken: (state, action) => {
      state.token = action.payload;
      window.localStorage.setItem('token', state.token)
    },
    unsetLocalUserAndToken: (state, action) => {
      state.user = null;
      state.token = null;
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('token')
    }

  },
});
export const { setLocalUser, setToken , unsetLocalUserAndToken} = localUserSlice.actions;
export default localUserSlice.reducer;