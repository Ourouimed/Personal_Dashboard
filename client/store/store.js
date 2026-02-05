import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice'
import projectReducer from './features/projects/projectSlice'
import timelineReducer from './features/timeline/timelineSlice'

export const store = configureStore({
    reducer : {
        auth : authReducer ,
        projects : projectReducer,
        timeline : timelineReducer
    }
})