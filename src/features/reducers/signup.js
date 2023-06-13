import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createSlice } from '@reduxjs/toolkit'
import { verifyResponse } from '../../Utils'
import moment from 'moment';

export const api = createApi({
    reducerPath: 'signup_api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://muungano.mx/v1',
        prepareHeaders: (headers, { getState }) => {
          let token = getState().main.user_token
          if (token) headers.set('Authorization', `Bearer ${token}`)
          console.log("token: ", token)
          return headers
        },
        init: {
          mode: 'no-cors',
          cache: 'no-cache',
        }
    }),

    endpoints: (build) => ({
        createUser: build.mutation({
            query: ({ first_name, last_name, email, phone, password }) => ({
              url: `/signup`,
              method: 'POST',
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
               body: `first_name=${first_name}${last_name?`&last_name=${last_name}`:''}&email=${email}${phone?`&phone=${phone}`:''}&password=${password}&role=7`
              //body: `&nombre=${first_name}`
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                console.log("onQueryStarted users");
                try {
                    const { data } = await queryFulfilled
                    console.log(data);
                    if (verifyResponse(data, dispatch)) {
                        if (data.data) dispatch(setUsers(data.data));
                            dispatch(setLastUpdated(moment().unix()));
                    }
                } catch (err) {
                    console.log("signup error: ", err);
                }
            },
            async onCacheEntryAdded() {
              console.log("onCacheEntryAdded create user");
            },
        }),
    })
})

export const { useFetchUserByIdMutation, useCreateUserMutation, useEditUserMutation, useFetchUsersMutation } = api


export const s = createSlice({
    name: 'signup',
    initialState: {
        users: [],
        last_updated: null
      },
      reducers: {
        setUsers: (state, action) => {
          console.log("setUsers: ", action.payload);
          state.users = action.payload
        },
        setLastUpdated: (state, action) => {
          console.log("setLastUpdated: ", action.payload);
          state.last_updated = action.payload
        },
      },
  })

export const { setUsers, setLastUpdated } = s.actions
export default s.reducer