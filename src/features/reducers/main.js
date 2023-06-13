import { createSlice } from '@reduxjs/toolkit'

export const s = createSlice({
  name: 'main',
  initialState: {
    user_token: null,
  },
  reducers: {
    setUserToken: (state, action) => {
      console.log("saving user_token: ", action.payload)
      state.user_token = action.payload
    }
  },
})

export const { setUserToken } = s.actions

export default s.reducer