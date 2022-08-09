module.exports = io => {
    const socket_phim = io.of('/phim')

    socket_phim.on('connection', socket => {
        socket.on('join-comment', data => {
            socket.join(data)
        })
        socket.on('client-send-server-comment', data => {
            socket.broadcast.to(data.slug).emit('server-send-client-comment', data.data)
        })

        socket.on('client-send-server-delete-comment', data => {
            socket.broadcast.to(data.slug).emit('server-send-client-delete-comment', data.id)
        })
    })

    io.on('connection', socket => {
        console.log('client connection...')
    })
}
