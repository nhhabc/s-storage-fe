import io from 'socket.io-client'

const url = process.env.REACT_APP_SOCKET_IO_DOMAIN ? process.env.REACT_APP_SOCKET_IO_DOMAIN : 'localhost:3098/'

const path = process.env.REACT_APP_SOCKET_IO_DOMAIN ? {path: "/socket/socket.io"} : '';

export const socket = io(url, path, {transports: ['websocket']}, { autoConnect: false })

export default {
    join(token) {
        socket.emit('join', token)
    },

    disconnect (username) {
        socket.emit('Disconnect', username)
    },

    sendMessage (msg) {
        socket.emit('sendMessage', msg)
    },

    displayMs(msg) {
        socket.on('message', msg)
    }
}
