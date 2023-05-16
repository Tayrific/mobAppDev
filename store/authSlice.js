import { createSlice } from "@reduxjs/toolkit";
import { reducer } from "../utils/reducers/formReducer";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    userData: null,
  },
  reducers: {
    // Add reducers here
    authenticate: (state, action) => {
      const { payload } = action;
      state.token = payload.token;
      state.userData = payload.userData;
      console.log(state);

      
    },
  },
});

export const authenticate = authSlice.actions.authenticate;
export default authSlice.reducer;
