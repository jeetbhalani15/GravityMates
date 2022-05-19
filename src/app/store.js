import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/Auth/authSlice"
import { postReducer } from "../features/Posts/postSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        post : postReducer,
    },
})

export default store