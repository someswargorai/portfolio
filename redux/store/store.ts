import { configureStore } from '@reduxjs/toolkit'
import dockSlice from '../slices/dockSlice'
import wallpaperSlice from '../slices/wallpaperSlice'
import zIndexSlice from '../slices/zIndexSlice'

export const store=configureStore({
    reducer:{
        dock:dockSlice,
        wallpaper:wallpaperSlice,
        zIndex: zIndexSlice
    }
});

export type selector = ReturnType<typeof store.getState>
export type dispath = typeof store.dispatch; 