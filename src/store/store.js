import {configureStore} from "@reduxjs/toolkit";
import {storageSlice} from "./storage-slice";
import {messageSlice} from './message-slice'

export const store = configureStore({
    reducer: {storage: storageSlice.reducer, message: messageSlice.reducer}
})