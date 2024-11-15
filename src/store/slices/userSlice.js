import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    firstName: null,
    lastName: null,
    email: null,
    userName: null,
    role: null,
    authorized: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { firstName, lastName, email, userName, role  , id} = action.payload;
      state.user = {
        firstName,
        lastName,
        email,
        userName,
        role,
        id,
        authorized: true,
      };
    },
    logoutUser: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
