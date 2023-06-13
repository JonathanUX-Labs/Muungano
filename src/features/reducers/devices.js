import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createSlice } from '@reduxjs/toolkit'
import { verifyResponse } from '../../Utils'
import moment from 'moment';

export const api = createApi({
  reducerPath: 'devices_api',
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
    fetchDeviceById: build.mutation({
      query: (params) => ({
        url: `/devices?id=${id}`,
        params
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        console.log("onQueryStarted devices by id");
        try {
          const { data } = await queryFulfilled
          if (verifyResponse(data, dispatch)) {
            if (data.data) dispatch(setDevices(data.data));
            dispatch(setLastUpdated(moment().unix()));
          }
        } catch (err) {
          console.log("devices by id error: ", err);
        }
      },
      async onCacheEntryAdded() {
        console.log("onCacheEntryAdded devices by id");
      },
    }),
    createDevice: build.mutation({
      query: ({ client, place, building, floor, room, name, mac, device_id }) => ({
        url: `/devices`,
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `device_id=${device_id}&name=${name}${client ? `&client=${client}` : ''}${place ? `&place=${place}` : ''}${building ? `&building=${building}` : ''}${floor ? `&floor=${floor}` : ''}${room ? `&room=${room}` : ''}${mac ? `&mac=${mac}` : ''}`
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        console.log("onQueryStarted devices");
        try {
          const { data } = await queryFulfilled
          console.log(data);
          if (verifyResponse(data, dispatch)) {
            if (data.data) dispatch(setDevices(data.data));
            dispatch(setLastUpdated(moment().unix()));
          }
        } catch (err) {
          console.log("create devices error: ", err);
        }
      },
      async onCacheEntryAdded() {
        console.log("onCacheEntryAdded create devices");
      },
    }),
    editDevice: build.mutation({
      query: ({ client, place, building, floor, room, name, mac, device_id }) => ({
        url: `/devices`,
        method: 'PUT',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `device_id=${device_id}&name=${name}${client ? `&client=${client}` : ''}${place ? `&place=${place}` : ''}${building ? `&building=${building}` : ''}${floor ? `&floor=${floor}` : ''}${room ? `&room=${room}` : ''}${mac ? `&mac=${mac}` : ''}`
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        console.log("onQueryStarted edit devices");
        try {
          const { data } = await queryFulfilled
          console.log(data);
          if (verifyResponse(data, dispatch)) {
            if (data.data) dispatch(setDevices(data.data));
            dispatch(setLastUpdated(moment().unix()));
          }
        } catch (err) {
          console.log("edit devices error: ", err);
        }
      },
      async onCacheEntryAdded() {
        console.log("onCacheEntryAdded edit devices");
      },
    }),
    fetchDevices: build.mutation({
      query: () => ({
        url: `/devices`,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        console.log("onQueryStarted devices");
        try {
          const { data } = await queryFulfilled
          console.log(data);
          if (verifyResponse(data, dispatch)) {
            if (data.data) dispatch(setDevices(data.data));
            dispatch(setLastUpdated(moment().unix()));
          }
        } catch (err) {
          console.log("devices error: ", err);
          alert("Error al cargar los dispositivos");
        }
      },
      async onCacheEntryAdded() {
        console.log("onCacheEntryAdded devices");
      },
    })
  })
})

export const { useFetchDeviceByIdMutation, useCreateDeviceMutation, useEditDeviceMutation, useFetchDevicesMutation } = api

export const s = createSlice({
  name: 'devices',
  initialState: {
    devices: [],
    last_updated: null
  },
  reducers: {
    setDevices: (state, action) => {
      console.log("setDevices: ", action.payload);
      state.devices = action.payload
    },
    setLastUpdated: (state, action) => {
      console.log("setLastUpdated: ", action.payload);
      state.last_updated = action.payload
    },
  },
})

export const { setDevices, setLastUpdated } = s.actions

export default s.reducer