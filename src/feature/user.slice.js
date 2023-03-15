import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      image: "",
      displayName: "",
      username: "",
    },
    isAuthenticated: false,
    pageAtuthentification: "signUp",
  },
  reducers: {
    setUserinfo: (state, action) => {
      const image = action.payload.image;
      const displayName = action.payload.displayName;
      const username = action.payload.username;

      state.userInfo = {
        image,
        displayName,
        username,
      };
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setPageAtuthentification: (state, action) => {
      state.pageAtuthentification = action.payload;
    },
  },
});

export const { setUserinfo, setAuthenticated, setPageAtuthentification } =
  userSlice.actions;
export default userSlice.reducer;
