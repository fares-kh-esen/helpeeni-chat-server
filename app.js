const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log('server started on ', PORT);
});


const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('connected successfully', socket.id);
    console.log('connected successfully', socket.handshake.query);
   

    
    chatID =  socket.handshake.query.roomId;
    socket.join('qq');
    // io.to('qq').emit("hi");

    // console.log(socket);

    socket.on('disconnect', () => {
        socket.leave(chatID);
        console.log('Disconnected', socket.id);
    });

    socket.on('message', (data) => {
        console.log('message',data);
        //Send message to only that particular room
        io.to('qq').emit('message-receive', data)
        // io.to(data.roomId).emit('message-receive', data);
        // io.emit('message-receive', data);
    });

    io.to('qq').on('message-receive' , (data) => {
        console.log('receive-message',data);

    });
})
