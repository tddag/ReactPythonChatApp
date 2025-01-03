import { combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import storage from 'redux-persist/es/storage';
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const reducer = combineReducers({
    user: userReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export type RootState = ReturnType<typeof store.getState>;