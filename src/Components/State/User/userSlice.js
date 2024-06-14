import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    firstName: "",
    lastName: "",
    email: "",
    role: [],
    isLogged: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { setUser } = userSlice.actions;
