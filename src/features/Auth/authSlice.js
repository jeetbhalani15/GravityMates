import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
1
const initialState = {
    token :  JSON.parse(localStorage.getItem('user'))?.token || "",
    user :  JSON.parse(localStorage.getItem('user'))?.user || "",
    allUsers : [],
    error : ''
}



export const fetchLoginUserData = createAsyncThunk('user/fetchLoginUserData', async (userData) => {
    console.log("in")
    console.log(userData)
    console.log("in")
    console.log("in")
    const response = await axios.post("/api/auth/login", userData)
    console.log(response.data.encodedToken)
    try {
        if(response.status === 200){
            return response.data;
        }
    } catch (error){
        console.log(error);
    }

})

export const fetchSignupUserData = createAsyncThunk('user/fetchSignupUserData', async (userData) => {
    try {
        const response = await axios.post("/api/auth/signup", userData)
        if(response.status === 201){ 
            return response.data;
        }
    } catch (error){
        return error;
    }

})

export const fetchUserData = createAsyncThunk('user/fetchAllUsersData', async (userId)=>{
   try {
       const res = await axios.get(`/api/users/${userId}`)
       if(res.status === 200){
           return res.data
       }
   } catch (error) {
       return error
   }

})

export const fetchAllUsersData = createAsyncThunk('user/fetchUsersData', async ()=>{
   try {
       const res = await axios.get("/api/users")
       if(res.status === 200){
           return res.data
       }
   } catch (error) {
       return error
   }

})

export const editUser = createAsyncThunk(
    'user/editUser', 
    async ({userData, token})=>{
    try {
        console.log("try")
        console.log(userData)
        const res = await axios.post("/api/users/edit", {userData},{
            headers: {
              authorization: token,
            }});
        return res.data
    } catch (error) {
        console.log(error)
        
    }
});

const authSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        logoutUser: state => {
            localStorage.removeItem("user");
            state.token = "",
            state.user = ""
        },
    },

    extraReducers : (builder) => {
        builder.addCase(fetchLoginUserData.pending, state => {
            state.token = ''
        })

        builder.addCase(fetchLoginUserData.fulfilled, (state, action) => {
            state.token = action.payload.encodedToken
            state.user = action.payload.foundUser
            localStorage.setItem("user", JSON.stringify({token:action.payload.encodedToken, user:action.payload.foundUser}))
        })

        builder.addCase(fetchLoginUserData.rejected, (state, action) => {
            state.error = action.payload
        })

        builder.addCase(fetchSignupUserData.pending, state => {
            state.token = ''
        })

        builder.addCase(fetchSignupUserData.fulfilled, (state, action) => {
            state.token = action.payload.encodedToken
            state.user = action.payload.createdUser
            localStorage.setItem("user", JSON.stringify({token: action.payload.encocdedToken, user:action.payload.createdUser}))
        })

        builder.addCase(fetchSignupUserData.rejected, (state, action) => {
            state.error = action.payload
        })
        builder.addCase(fetchAllUsersData.pending, (state) => {
            state.allUsers = []
        })
        builder.addCase(fetchAllUsersData.fulfilled, (state,action) => {
            state.allUsers = action.payload
        })
        builder.addCase(fetchAllUsersData.rejected, (state,action) => {
            state.error = action.payload
        })
        builder.addCase(fetchUserData.pending, (state) => {
            state.users = []
        })
        builder.addCase(fetchUserData.fulfilled, (state,action) => {
            state.users = action.payload
        })
        builder.addCase(fetchUserData.rejected, (state,action) => {
            state.error = action.payload
        })
        builder.addCase(editUser.pending, (state, action) => {
            state.error = ''
        })
        builder.addCase(editUser.fulfilled, (state, action) => {
            state.user = action.payload?.user;
        })
        builder.addCase(editUser.rejected, (state, action) => {
            state.error = action.payload;
        })
    }
}
)

export default authSlice.reducer; 
export const {logoutUser} = authSlice.actions;
export const useAuth = ()=> useSelector(state=>state.user)