import {createSlice} from "@reduxjs/toolkit";

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        showMsg: null,
        friend: [],
        friendFilter: [],
        messages: [],
        sendTo: {},
        searchField: '',
    },
    reducers: {
        showMsgHandle(state, action) {
            state.showMsg = action.payload
        },

        closeMsgHandle(state, action) {
            state.showMsg = action.payload
        },

        onSearchChange (state, action) {
            state.searchField = action.payload;
            state.friendFilter = state.friend.filter(friend => friend.username.toLowerCase().includes(state.searchField.toLowerCase()))
        },

        sendToFriend (state, action) {
            state.sendTo = action.payload;
        },

        getAllFriend (state, action) {
            state.friend = action.payload
            state.friendFilter = state.friend
        },

        getMessages (state, action) {
            state.messages = action.payload
        },

        createMessage (state, action) {
            state.messages.push(action.payload)
        },

        deleteMessage (state,action) {
            state.messages = state.messages.filter(texts => texts._id !== action.payload)
        }
    },
})

export const messageAction = messageSlice.actions;