import { configureStore } from '@reduxjs/toolkit'
import dockSlice from '../slices/dockSlice'
import wallpaperSlice from '../slices/wallpaperSlice'

export const store=configureStore({
    reducer:{
        dock:dockSlice,
        wallpaper:wallpaperSlice
    }
});

export type selector = ReturnType<typeof store.getState>
export type dispath = typeof store.dispatch; 