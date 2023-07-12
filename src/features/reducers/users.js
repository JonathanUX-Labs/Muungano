import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createSlice } from '@reduxjs/toolkit'
import { verifyResponse } from '../../Utils'
import moment from 'moment';

export const api = createApi({
  reducerPath: 'users_api',
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
    fetchUserById: build.mutation({
      query: (id = '0') => ({
        url: `/users?id=${id}`,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        console.log("onQueryStarted users by id");
        try {
          const { data } = await queryFulfilled
          if (verifyResponse(data, dispatch)) {
            if (data.data) dispatch(setUsers(data.data));
            dispatch(setLastUpdated(moment().unix()));
          }
        } catch (err) {
          console.log("users by id error: ", err);
        }
      },
      async onCacheEntryAdded() {
        console.log("onCacheEntryAdded users by id");
      },
    }),
    createUser: build.mutation({
      query: ({ nombre, apellidos, password, email, telefono, fecha_nacimiento, peso }) => ({
        url: `/users`,
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `first_name=${first_name}${last_name?`&last_name=${last_name}`:''}&email=${email}${phone?`&phone=${phone}`:''}&role=${role}&permission_places=${permission_places}&password=${password}`
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
          console.log("create users error: ", err);
        }
      },
      async onCacheEntryAdded() {
        console.log("onCacheEntryAdded create users");
      },
    }),
    editUser: build.mutation({
      query: ({ user_id, first_name, last_name, email, phone, role, permission_places }) => ({
        url: `/users`,
        method: 'PUT',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `user_id=${user_id}&first_name=${first_name}${last_name?`&last_name=${last_name}`:''}&email=${email}${phone?`&phone=${phone}`:''}&role=${role}&permission_places=${permission_places}`
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
          console.log("edit users error: ", err);
        }
      },
      async onCacheEntryAdded() {
        console.log("onCacheEntryAdded edit users");
      },
    }),
    fetchUsers: build.mutation({
      query: () => ({
        url: `/users`,
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
          console.log("users error: ", err);
          alert("Error al cargar los usuarios");
        }
      },
      async onCacheEntryAdded() {
        console.log("onCacheEntryAdded users");
      },
    }),
    fetchRunners: build.mutation({
      query: () => ({
        url: `/test2`,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        console.log("onQueryStarted runners");
        try {
          const { data } = await queryFulfilled
          //console.log('runners', data);
          if (verifyResponse(data, dispatch)) {
            if (data.data) dispatch(setRunners(data.data));
            dispatch(setLastUpdated(moment().unix()));
          }
        } catch (err) {
          console.log("users error: ", err);
          alert("Error al cargar los corredores");
        }
      },
      async onCacheEntryAdded() {
        console.log("onCacheEntryAdded runners");
      },
    })
  })
})

export const { useFetchUserByIdMutation, useCreateUserMutation, useEditUserMutation, useFetchUsersMutation, useFetchRunnersMutation } = api

export const s = createSlice({
  name: 'users',
  initialState: {
    users: [],
    runners: [],
    last_updated: null
  },
  reducers: {
    setUsers: (state, action) => {
      console.log("setUsers: ", action.payload);
      state.users = action.payload
    },
    setRunners: (state, action) => {
      console.log("setRunner: ", action.payload);
      state.runners = action.payload
    },
    setLastUpdated: (state, action) => {
      console.log("setLastUpdated: ", action.payload);
      state.last_updated = action.payload
    },
  },
})

export const { setUsers, setRunners, setLastUpdated } = s.actions

export default s.reducer
