import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios.js'
import toast from 'react-hot-toast'

const initialState = {
    value: null
}

//fetch the user data
export const fetchUser = createAsyncThunk('user/fetchUser',async(token)=>{
  const {data} =   await api.get('/api/user/data',{
        headers:{Authorization: `Bearer ${token}`}
    })
        return data.success ? data.user : null

    //since i'm using the object destructuring for the first time 
    //this is an alternate solution that i used to make

    //const response = await api.get('/api/user/data', { ... });
    //const data = response.data; // Manually extracting the property

});

//update the existing user data
export const updateUser = createAsyncThunk('user/update',
    async(userData, token)=>{
     const {data} =   await api.post('/api/user/update',{
        headers:{Authorization: `Bearer ${token}`}
     })
        if (data.success) {
            toast.success(data.message)
            return data.user
        } else {
            toast.error(data.message)
            return null
        }
});


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{

    }, extraReducers:(builder)=>{
        builder.addCase(fetchUser.fulfilled,(state,action)=>{
            state.value  = action.payload
        }).addCase(updateUser.fulfilled,(state,action)=>{
            state.value  = action.payload
        })
    }
})

export default userSlice.reducer