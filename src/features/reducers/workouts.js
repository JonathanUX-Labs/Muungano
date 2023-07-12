import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createSlice } from '@reduxjs/toolkit'
import { verifyResponse } from '../../Utils'
import moment from 'moment';

export const api = createApi({
    reducerPath: 'workouts_api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://muungano.mx/v1',
        prepareHeaders: (headers, { getState }) => {
            let token = getState().main.user_token
            if (token) headers.set('Authorization', `Bearer ${token}`)
            console.log("token aqui: ", token)
            return headers
        },
        init: {
            mode: 'no-cors',
            cache: 'no-cache',
        }
    }),

    endpoints: (build) => ({
        createWorkout: build.mutation({
            query: (data) => ({
                url: `/test`,
                method: 'POST',
                mode: 'no-cors',
                cache: 'no-cache',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: Object.keys(data)
                .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
                .join('&')
                 // body: `id_usuarios=${id_usuarios}${workout_data?`&last_update=${last_update}`:''}`
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                console.log("onQueryStarted workouts");
                try {
                    const { data } = await queryFulfilled
                    console.log('Aqui data workouts', data)
                    if (verifyResponse(data, dispatch)) {
                        if (data.data) dispatch(setWorkouts(data.data))
                            dispatch(setLastUpdated(moment().unix()))
                    }
                } catch (err) {
                    console.log("workout error: ", err)
                }
            },
            async onCacheEntryAdded() {
                console.log("onCacheEntryAdded create workout");
            },
        })
    })
})

export const { useCreateWorkoutMutation } = api

export const s = createSlice({
    name: 'workout',
    initialState: {
        workouts: [],
        last_updated: null
    },
    reducers: {
        setWorkouts: (state, action) => {
            console.log("setWorkouts: ", action.payload);
            state.workouts = action.payload
        },
        setLastUpdated: (state, action) => {
            console.log("setLastUpdated Workouts: ", action.payload);
            state.last_updated = action.payload
        },
    }
})

export const { setWorkouts, setLastUpdated } = s.actions
export default s.reducer