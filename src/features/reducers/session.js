import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createSlice } from '@reduxjs/toolkit'
import { clearUserData, verifyResponse } from '../../Utils'
import moment from 'moment';
import { setUserToken } from './main'
import { setRunners } from './users'

export const api = createApi({
  reducerPath: 'session_api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://muungano.mx/v1',
    prepareHeaders: (headers, { getState }) => {
      let token = getState().main.user_token
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
    init: {
      mode: 'no-cors',
      cache: 'default',
    }
  }),
  endpoints: (build) => ({
    authenticate: build.mutation({
      query: (data) => ({
        url: `/login`,
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: Object.keys(data)
        .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
        .join('&')
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        console.log("onQueryStarted authenticate");
        try {
          const { data } = await queryFulfilled
          console.log('arg', arg);
          console.log(data);
          if (verifyResponse(data, dispatch)) {
            if (data.token && data.user) {
              await dispatch(setUserToken(data.token))
              await dispatch(setUser(data.user))
              // await dispatch(setRunners(data.runners))
              await dispatch(setOnboardingStatus(true))
            } else alert("Error tratando de iniciar sesión")
            dispatch(setLastUpdated(moment().unix()))
          }
        } catch (err) {
          console.log("create authenticate error: ", err);
        }
      },
      async onCacheEntryAdded() {
        console.log("onCacheEntryAdded create authenticate");
      },
    }),
    deauthenticate: build.mutation({
      query: (data) => ({
        url: `/logout`,
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: Object.keys(data)
        .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
        .join('&')
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        console.log("onQueryStarted deauthenticate");
        try {
          const { data } = await queryFulfilled
          console.log(data);
          if (verifyResponse(data, dispatch)) {
            clearUserData(dispatch);
          } else alert("Error tratando de cerrar sesión");
        } catch (err) {
          console.log("create deauthenticate error: ", err);
        }
      },
      async onCacheEntryAdded() {
        console.log("onCacheEntryAdded create deauthenticate");
      },
    }),
    requestPasswordLink: build.mutation({
      query: (data) => ({
        url: `/reset_password`,
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: Object.keys(data)
        .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
        .join('&')
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        console.log("onQueryStarted requestPasswordLink");
        try {
          const { data } = await queryFulfilled
          console.log(data);
          if (verifyResponse(data, dispatch))
            dispatch(setLastUpdated(moment().unix()));
        } catch (err) {
          console.log("create requestPasswordLink error: ", err);
        }
      },
      async onCacheEntryAdded() {
        console.log("onCacheEntryAdded create requestPasswordLink");
      },
    }),
    sendNewPassword: build.mutation({
      query: ({ accessToken, password }) => ({
        url: `/reset_password`,
        method: 'PUT',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Bearer ${accessToken}`
        },
        body: `password=${password}`
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        console.log("onQueryStarted sendNewPassword");
        try {
          const { data } = await queryFulfilled
          console.log(data);
          if (verifyResponse(data, dispatch)) {
            if (data.token && data.user) {
              await dispatch(setUserToken(data.token));
              await dispatch(setUser(data.user));
              // await dispatch(setRunners(data.runners));
            } else alert("Error trying to reset password");
            dispatch(setLastUpdated(moment().unix()));
          }
        } catch (err) {
          console.log("create sendNewPassword error: ", err);
        }
      },
      async onCacheEntryAdded() {
        console.log("onCacheEntryAdded create sendNewPassword");
      }
    })
  })
})

export const { useAuthenticateMutation, useDeauthenticateMutation, useRequestPasswordLinkMutation, useSendNewPasswordMutation } = api

export const s = createSlice({
  name: 'session',
  initialState: {
    user: {},
    onboardingStatus: false,
    messageChanged: null,
    last_updated: null
  },
  reducers: {
    setUser: (state, action) => {
      console.log("setUser: ", action.payload);
      state.user = action.payload
    },
    setOnboardingStatus: (state, action) => {
      console.log("setOnboardingStatus: ", action.payload);
      state.onboardingStatus = action.payload
    },
    setMessageChanged: (state, action) => {
      console.log("setMessageChanged: ", action.payload);
      state.messageChanged = action.payload
    },
    setLastUpdated: (state, action) => {
      console.log("setLastUpdated: ", action.payload);
      state.last_updated = action.payload
    },
    logout: (state, action) => {
      console.log("logout: ", action.payload);
    }
  },
})

export const { setUser, setOnboardingStatus, setMessageChanged, setLastUpdated, logout } = s.actions

export default s.reducer