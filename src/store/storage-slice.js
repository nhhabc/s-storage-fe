import {configureStore, createSlice} from "@reduxjs/toolkit";

const storageSlice = createSlice({
    name: 'storage',
    initialState: {
        folders:[],
        files:[],
        searchfield:''
    },
    reducers: {
        getAllFile(state, action) {
            state.files = action.payload
        },

        getAllFolder(state, action) {
            state.folders = action.payload
        },

        onSearchChange(state, action) {
            state.searchfield = action.payload;
            state.folders = state.folders.filter(items => {
                return items.name.toLowerCase().includes(action.payload.toLowerCase())
            })
            state.files = state.files.filter(items => {
                return items.name.toLowerCase().includes(state.searchfield.toLowerCase())
            })
        },

        addFolder (state, action) {
            const newFolder = action.payload;
            state.folders.push(newFolder);
        },
        addFile (state, action) {
            const newFile = action.payload;
            state.files.push(newFile)
        },

        deleteFolder(state, action) {
            const folderId = action.payload
            state.folders = state.folders.filter(folder => folder._id !== folderId)
        },

        deleteFile(state, action) {
            const fileId = action.payload
            state.files = state.files.filter(file => file._id !== fileId)
        }

    }
})

export const storageAction = storageSlice.actions;

export const store = configureStore({
    reducer: {storage: storageSlice.reducer}
})