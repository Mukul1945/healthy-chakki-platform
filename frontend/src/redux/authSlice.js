import { createSlice } from "@reduxjs/toolkit";

// Always start with null so server and client first paint match (avoids hydration error).
// Auth is restored from localStorage in AuthCartRestorer after mount.
const initialState = { token: null, user: null, hydrated: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.hydrated = true;
      localStorage.setItem("token", action.payload.token);
      if (action.payload.user) {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.hydrated = true;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setHydrated: (state) => {
      state.hydrated = true;
    },
  },
});

export const { loginSuccess, logout, setHydrated } = authSlice.actions;

export default authSlice.reducer;
