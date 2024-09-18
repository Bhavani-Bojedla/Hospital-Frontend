// import {createSlice , configureStore} from "@reduxjs/toolkit";
// const authSlice=createSlice({
//     name:"auth",
//     initialState:{user:"", isloggedIn:false},
//     reducers:{
//         login(state){
//             state.isloggedIn=true;
//         },
//         logout(state){
//             state.isloggedIn=false;
//         }
//     } 
// });

// export const authActions =authSlice.actions;

// export const store=configureStore({
//     reducer:authSlice.reducer
// })

import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: "",
    isloggedIn: !!localStorage.getItem("isloggedIn"), // Load from localStorage
  },
  reducers: {
    login(state) {
      state.isloggedIn = true;
      localStorage.setItem("isloggedIn", "true"); // Persist login status
    },
    logout(state) {
      state.isloggedIn = false;
      localStorage.removeItem("isloggedIn"); // Remove login status
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
