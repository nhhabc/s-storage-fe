import {configureStore, createSlice} from "@reduxjs/toolkit";

const storageSlice = createSlice({
    name: 'storage',
    initialState: {
        folders: [],
        filteredFolders: [],
        files: [],
        filteredFiles: [],
        searchField: ''
    },
    reducers: {
        getAllFile(state, action) {
            state.files = action.payload
            state.filteredFiles = action.payload
        },

        getAllFolder(state, action) {
            state.folders = action.payload
            state.filteredFolders = action.payload
        },

        onSearchChange(state, action) {
            state.searchField = action.payload;

            state.filteredFolders = state.folders.filter(items => {
                return items.name.toLowerCase().includes(state.searchField.toLowerCase())
            })

            state.filteredFiles = state.files.filter(items => {
                return items.name.toLowerCase().includes(state.searchField.toLowerCase())
            })
        },

        addFolder(state, action) {
            const newFolder = action.payload;
            state.folders.push(newFolder);
        },
        addFile(state, action) {
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