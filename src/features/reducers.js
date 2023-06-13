import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import AsyncStorage from '@react-native-async-storage/async-storage'
import session, { api as session_api } from './reducers/session'
import main from './reducers/main'
import devices, { api as devices_api } from './reducers/devices'
import signup, { api as signup_api } from "./reducers/signup"
import users, { api as users_api } from "./reducers/users"

const persistConfig = {
  storage: AsyncStorage,
  timeout: null,
}

let mainReducer = combineReducers({
  main: persistReducer({ ...persistConfig, key: 'main' }, main),
  session: persistReducer({ ...persistConfig, key: 'session' }, session),
  [session_api.reducerPath]: session_api.reducer,
  devices: persistReducer({ ...persistConfig, key: 'devices' }, devices),
  [devices_api.reducerPath]: devices_api.reducer,
  signup: persistReducer({ ...persistConfig, key: 'signup' }, signup),
  [signup_api.reducerPath]: signup_api.reducer,
  users: persistReducer({ ...persistConfig, key: 'users' }, users),
  [users_api.reducerPath]: users_api.reducer,
})

const rootReducer = (state, action) => {
  if (action.type == "session/logout") state = { session: { onboardingStatus: true }}
  return mainReducer(state, action)
}

export default persistReducer({ ...persistConfig, key: 'root' }, rootReducer)
