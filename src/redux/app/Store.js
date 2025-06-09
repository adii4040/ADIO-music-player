import { configureStore } from "@reduxjs/toolkit";
import songReducer from '../features/song/SongSlice'
import { sazamApi } from "../services/SazamApi";

const store = configureStore({
    reducer: {
        songs: songReducer,
        [sazamApi.reducerPath]: sazamApi.reducer,
    },


    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sazamApi.middleware),
})

export default store


