import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
1
const initialState = {
    token :  JSON.parse(localStorage.getItem('user'))?.token || "",
    user :  JSON.parse(localStorage.getItem('user'))?.user || "",
    allUsers : [],
    error : ''
}



export const fetchLoginUserData = createAsyncThunk('user/fetchLoginUserData', async (userData) => {
    console.log(userData)
    const response = await axios.post("/api/auth/login", userData)
    console.log(response.data.encodedToken)
    try {
        if(response.status === 200){
            toast.success('Login Successfully!');
            return response.data;
        }
    } catch (error){
        toast.error('Something went wrong!');
    }

})

export const fetchSignupUserData = createAsyncThunk('user/fetchSignupUserData', async (userData) => {
    try {
        const response = await axios.post("/api/auth/signup", userData)
        if(response.status === 201){
            toast.success('Signup Successfully!'); 
            return response.data;
        }
    } catch (error){
        toast.error('Something went wrong!');
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
            toast.success('Profile Updated!');
        return res.data
    } catch (error) {
        console.log(error)
        
    }
});

export const fetchFollowUser = createAsyncThunk("user/fetchFollowUser", async ({token, userId}) => {
    try {
        console.log("hiii")
        const response = await  axios.post(`/api/users/follow/${userId}`,
        {},
        {
          headers: {
            authorization: token,
          },
        });
        if(response.status === 200){
            console.log(response.data);
            return response.data;
        }
    } catch (error){
       console.log(error);
    }
})

export const fetchUnFollowUser = createAsyncThunk("user/fetchUnFollowUser", async ({token, userId}) => {
    try {
        console.log("oyee")
        console.log(userId)
        console.log(token)
        const response = await axios.post(`/api/users/unfollow/${userId}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );
        if(response.status === 200){
            console.log(response.data);
            return response.data;
        }
    } catch (error){
       console.log(error);
    }
})

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

        // LOGIN
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

        // SIGN UP
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

        // FETCH ALL USERS DATA
        builder.addCase(fetchAllUsersData.pending, (state) => {
            state.allUsers = []
        })
        builder.addCase(fetchAllUsersData.fulfilled, (state,action) => {
            state.allUsers = action.payload
        })
        builder.addCase(fetchAllUsersData.rejected, (state,action) => {
            state.error = action.payload
        })

        // FETCH USERS DATA
        builder.addCase(fetchUserData.pending, (state) => {
            state.user = []
        })
        builder.addCase(fetchUserData.fulfilled, (state,action) => {
            state.user = action.payload
        })
        builder.addCase(fetchUserData.rejected, (state,action) => {
            state.error = action.payload
        })

        // EDIT USER PROFILE
        builder.addCase(editUser.pending, (state, action) => {
            state.error = ''
        })
        builder.addCase(editUser.fulfilled, (state, action) => {
            state.user = action.payload?.user;
        })
        builder.addCase(editUser.rejected, (state, action) => {
            state.error = action.payload;
        })

         // follow 
         builder.addCase(fetchFollowUser.pending, state => {
            state.error = "";
        })
        builder.addCase(fetchFollowUser.fulfilled, (state, { payload : {user, followUser} }) => {
            state.allUsers.users = state.allUsers.users.map(existUser => existUser._id === user?._id ? user : existUser);
            state.allUsers.users = state.allUsers.users.map(existUser => existUser._id === followUser._id ? followUser : existUser);
        })
        builder.addCase(fetchFollowUser.rejected, (state, action) => {
            state.error = action.payload;
        })

        // unfollow 
        builder.addCase(fetchUnFollowUser.pending, state => {
            state.error = "";
        })
        builder.addCase(fetchUnFollowUser.fulfilled, (state, { payload : {user, followUser} } ) => {
            state.allUsers.users = state.allUsers.users.map(existUser => existUser._id === user?._id ? user : existUser);
            state.allUsers.users = state.allUsers.users.map(existUser => existUser._id === followUser._id ? followUser : existUser);
        })
        builder.addCase(fetchUnFollowUser.rejected, (state, action) => {
            state.error = action.payload;
        })
    }
}
)

export default authSlice.reducer; 
export const {logoutUser} = authSlice.actions;
export const useAuth = ()=> useSelector(state=>state.user)