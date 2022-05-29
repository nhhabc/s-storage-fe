import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: [],
        isSocialAccount:false,
        isChangingName: false,
        isChangingEmail: false,
        isChangingPassword: false,
        isDeleteAccount: false
    },
    reducers: {
        getCurrentUserInfo(state, action) {
            state.currentUser = action.payload;
        },
        changeName(state,action) {
            state.isChangingName = action.payload
        },
        changeEmail(state, action) {
            state.isChangingEmail = action.payload
        },
        changePassword(state, action) {
            state.isChangingPassword = action.payload
        },
        checkSocialUser(state, action) {
            state.isSocialAccount = action.payload
        },
        checkDeleteAccount (state,action) {
            state.isDeleteAccount = action.payload
        }
    }
})

export const userAction = userSlice.actions;