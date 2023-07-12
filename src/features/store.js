import { compose, applyMiddleware, createStore, configureStore } from '@reduxjs/toolkit'
import { persistStore } from "redux-persist"
import { api as session_api } from './reducers/session'
import { api as devices_api } from './reducers/devices'
import { api as signup_api } from './reducers/signup'
import { api as users_api } from './reducers/users'
import { api as workouts_api } from './reducers/workouts'
import reducers from "./reducers"

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false })
        .concat(
            session_api.middleware,
            devices_api.middleware,
            signup_api.middleware,
            users_api.middleware,
            workouts_api.middleware
        );
    }
})

export const persistor = persistStore(store)