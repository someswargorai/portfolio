import { configureStore } from '@reduxjs/toolkit'
import dockSlice from '../slices/dockSlice'

export const store=configureStore({
    reducer:{
        dock:dockSlice
    }
});

export type selector = ReturnType<typeof store.getState>
export type dispath = typeof store.dispatch; 