import {createSlice} from "@reduxjs/toolkit";

export const storageSlice = createSlice({
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
            state.filteredFiles = state.files
        },

        getAllFolder(state, action) {
            state.folders = action.payload
            state.filteredFolders = state.folders
        },

        onSearchChange(state, action) {
            state.searchField = action.payload;

            state.filteredFolders = state.folders.filter(items =>
                items.name.toLowerCase().includes(state.searchField.toLowerCase())
            )

            state.filteredFiles = state.files.filter(items =>
                items.name.toLowerCase().includes(state.searchField.toLowerCase())
            )
        },

        addFolder(state, action) {
            const newFolder = action.payload;
            state.folders.push(newFolder);
            state.filteredFolders = state.folders
        },
        addFile(state, action) {
            const newFile = action.payload;
            state.files.push(newFile)
            state.filteredFiles = state.files
        },

        deleteFolder(state, action) {
            const folderId = action.payload
            state.folders = state.folders.filter(folder => folder._id !== folderId)
            state.filteredFolders = state.folders
        },

        deleteFile(state, action) {
            const fileId = action.payload
            state.files = state.files.filter(file => file._id !== fileId)
            state.filteredFiles = state.files
        }

    }
})

export const storageAction = storageSlice.actions;
