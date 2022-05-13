import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    token: "",
    error: '',
}

export const fetchSignupUserData = createAsyncThunk('user/fetchSignupUserData',async(userData)=>{
    try {
        const res = await axios.post("/api/auth/signup",userData)
        if(res.status === 200){
            localStorage.setItem("token", res.data.encodedtoken)
            localStorage.setItem("user",JSON.stringify(res.data.createUser))
            return res.data
        }
    } catch (error) {
        return error
    }
})

export const fetchLoginUserData = createAsyncThunk('user/fetchLoginUserData',async(userData)=>{
    console.log("hello")
    const res = await axios.post("/api/auth/login",userData)
    console.log(res)
    try {
        if(res.status === 200){
            localStorage.setItem("token", res.data.encodedtoken)
            localStorage.setItem("user",JSON.stringify(res.data.foundUser))
            return res.data
        }
        console.log(res.data)
    } catch (error) {
        return error
    }
})


const authSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(fetchSignupUserData.pending, state =>{
            state.token = ''
        })
        builder.addCase(fetchSignupUserData.fulfilled, (state,action) =>{
            state.token = action.payload.encodedtoken
        })
        builder.addCase(fetchSignupUserData.rejected, (state,action) =>{
            state.error = action.payload
        })
        builder.addCase(fetchLoginUserData.pending, state =>{
            state.token = ''
        })
        builder.addCase(fetchLoginUserData.fulfilled, (state,action) =>{
            state.token = action.payload.encodedtoken
        })
        builder.addCase(fetchLoginUserData.rejected, (state,action) =>{
            state.error = action.payload
        })
    } 

})

export default authSlice.reducer;