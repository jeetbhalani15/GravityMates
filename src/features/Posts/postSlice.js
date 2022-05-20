import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

const initialState = {
    posts: [],
    bookmarks: [],
    isLoading: false,
    deleteError: "",
    errorMessage: ""

}

export const getPost = createAsyncThunk("post/getPost",async()=>{
    try {
        const res = await axios.get('/api/posts');
        console.log(res.data.posts)
        return res.data
    } catch (error) {
        console.log(error)
    }

}) 
export const deletePost = createAsyncThunk("post/deletePost",async({ postId , token })=>{
    console.log(postId)
    console.log(token)
    try {
        console.log("innn")
        const res = await axios.delete(`/api/posts/${postId}`, {
            headers: {
              authorization: token,
            }});
            console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }

}) 
export const addPost = createAsyncThunk(
    "post/addPost",
    async ({ postData, token}) => {
        console.log("helllo")
        console.log(postData)
      try {
        const res = await axios.post("/api/posts", { postData }, { headers: {
            authorization: token,
          }});
        return res.data;
      } catch (error) {
        console.log(error.response);
      }
    }
  ); 
export const editPost = createAsyncThunk(
    "post/editPost",
    async ({ postData, token, postId}) => {
        console.log("helllo")
        console.log(postData)
      try {
        const res = await axios.post(`/api/posts/edit/${postId}`, { postData }, { headers: {
            authorization: token,
          }});
        return res.data;
      } catch (error) {
        console.log(error.response);
      }
    }
  ); 
export const getPostById = createAsyncThunk(
    "post/getPostById",
    async ({postId}) => {
        console.log("helllo")
        console.log(postData)
      try {
        const res = await axios.get(`/api/posts/${postId}`)
        return res.data;
      } catch (error) {
        console.log(error);
      }
    }
  ); 

//COMMENTS   
export const addCommentOnPost = createAsyncThunk(
    "post/addCommentOnPost",
    async ({postId, commentData, token}) => {
        console.log("comment")
        console.log(token)
        console.log(postId)
        console.log(commentData)
      try {
        const {data: {comments}} = await axios.post(`/api/comments/add/${postId}`, {commentData} , {headers:{
            authorization: token,
          }});

          console.log(comments)
        return {comments, postId}
      } catch (error) {
        console.log(error)
      }
    }
  ); 

  export const fetchEditComment = createAsyncThunk("post/fetchEditComment", async ({token, postId, commentId, commentData}) => {
    try {
        const {data : { comments }} = await axios.post(`/api/comments/edit/${postId}/${commentId}`,{commentData},
        {
          headers: {
            authorization: token,
          },
        }
      );
        return { comments, postId };

    } catch (error) {
        return error;
    }
})
  export const deleteComment = createAsyncThunk("post/deleteComment", async ({token, postId, commentId}) => {
    try {
        const {data : { comments }} = await axios.post(`/api/comments/delete/${postId}/${commentId}`,{},
        {
          headers: {
            authorization: token,
          },
        }
      );
        return { comments, postId };

    } catch (error) {
        return error;
    }
})

export const fetchLikePost = createAsyncThunk("post/fetchLikePost", async ({token, postId}) => {
  try {
      const response = await  axios.post(`/api/posts/like/${postId}`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
      return response.data;

  } catch (error) {
      console.log(error);
  }
});
export const fetchDisLikePost = createAsyncThunk("post/fetchDisLikePost", async ({token, postId}) => {
  try {
      const response = await  axios.post(`/api/posts/dislike/${postId}`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
      return response.data;

  } catch (error) {
      console.log(error);
  }
});

export const addBookmark = createAsyncThunk("post/addBookmark", async ({token, postId}) => {
  try {
    console.log(token)
    console.log(postId)
      const response = await axios.post(`/api/users/bookmark/${postId}`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
      console.log(response);
      return response.data;

  } catch (error) {
      console.error(error);

  }
})
export const removeBookmark = createAsyncThunk("post/removeBookmark", async ({token, postId}) => {
  try {
    console.log(token)
    console.log(postId)
      const response = await axios.post(`/api/users/remove-bookmark/${postId}`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
      console.log(response);
      return response.data;

  } catch (error) {
      console.error(error);

  }
})
 
const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

        // GET POST
        builder.addCase(getPost.pending, state => {
            state.isLoading = true;
        })
        builder.addCase(getPost.fulfilled, (state,action) => {
            state.isLoading = false;
            state.posts = action.payload?.posts.reverse();
        })
        builder.addCase(getPost.rejected, (state) => {
            state.isLoading = false;
            state.errorMessage = "could not feth posts!"
        })


        // ADD POST
        builder.addCase(addPost.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(addPost.fulfilled, (state,action) => {
            state.isLoading = false;
            state.posts = action.payload?.posts.reverse();
        })
        builder.addCase(addPost.rejected, (state) => {
            state.isLoading = false;
            state.errorMessage = "could not add the post"
        })


        // GET POST BY ID
        builder.addCase(getPostById.pending, (state) => {
            state.isLoading = false;
        })
        builder.addCase(getPostById.fulfilled, (state,action) => {
            state.isLoading = false;
            state.posts = action.payload;
        })
        builder.addCase(getPostById.rejected, (state) => {
            state.isLoading = false;
            state.errorMessage="could not fetch post"
        })


        // DELETE POST
        builder.addCase(deletePost.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deletePost.fulfilled, (state,action) => {
            state.isLoading = true;
            state.posts = action.payload.posts;
        })
        builder.addCase(deletePost.rejected, (state,action) => {
            state.isLoading = true;
            state.deleteError = "could not delete post !";
        })


        // EDIT POST
        builder.addCase(editPost.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(editPost.fulfilled, (state,action) => {
            state.isLoading = true;
            state.posts = action.payload?.posts.reverse();
        })
        builder.addCase(editPost.rejected, (state) => {
            state.isLoading = false;
            state.errorMessage = "could not add the post"
        })


        // ADD COMMENT 
        builder.addCase(addCommentOnPost.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(addCommentOnPost.fulfilled, (state,action) => {
            state.isLoading = false;
            const postIndex = state.posts.findIndex((post)=>post._id === action.payload.postId);
            state.posts[postIndex].comments = action.payload?.comments;
        })
        builder.addCase(addCommentOnPost.rejected, (state) => {
            state.isLoading = false;
            state.errorMessage = "could not add post"
        })


        // edit comments
        builder.addCase(fetchEditComment.pending, (state, action) => {
          state.isLoading = true
        })

        builder.addCase(fetchEditComment.fulfilled, (state,action) => {
          state.isLoading= false;
          const postIndex = state.posts.findIndex((post) => post._id === action.payload.postId);
          state.posts[postIndex].comments = action.payload?.comments;
        })

        builder.addCase(fetchEditComment.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = "could not add post"
        })


          // delete comments
          builder.addCase(deleteComment .pending, (state, action) => {
            state.isLoading=true
        })

        builder.addCase(deleteComment.fulfilled, (state,action) => {
            const postIndex = state.posts.findIndex(post => post._id === action.payload.postId);
            state.posts[postIndex].comments = action.payload.comments;
        })

        builder.addCase(deleteComment.rejected, (state, action) => {
            state.error = action.payload
        })


        // like 
        builder.addCase(fetchLikePost.pending, (state, action) => {
        state.isLoading = true
        })

        builder.addCase(fetchLikePost.fulfilled, (state,action) => {
            state.posts = action.payload.posts.reverse();
        })

        builder.addCase(fetchLikePost.rejected, (state, action) => {
            state.error = action.payload;
        })


        // dislike 
        builder.addCase(fetchDisLikePost.pending, (state, action) => {
            state.isLoading = true;
        })

        builder.addCase(fetchDisLikePost.fulfilled, (state, action) => {
            state.posts = action.payload.posts.reverse();
        })

        builder.addCase(fetchDisLikePost.rejected, (state, action) => {
            state.error = action.payload;
        })

        // Add Bookmark 
        builder.addCase(addBookmark .pending, (state, action) => {
          state.error = "";
        })
        builder.addCase(addBookmark.fulfilled, (state, action) => {
          state.bookmarks = action.payload.bookmarks;
        })
        builder.addCase(addBookmark.rejected, (state, action) => {
          state.error = action.payload;
        })


        // Remove Bookmark 
        builder.addCase(removeBookmark .pending, (state, action) => {
          state.error = "";
        })
        builder.addCase(removeBookmark.fulfilled, (state, action) => {
          state.bookmarks = action.payload.bookmarks;
        })
        builder.addCase(removeBookmark.rejected, (state, action) => {
          state.error = action.payload;
        })

    }
})

export const postReducer = postSlice.reducer
export const usePosts = () => useSelector((state) => state.post);