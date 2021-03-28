const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const router = require('./router');
const app = express();

const { addUser, removeUser, getUser, getUserInRoom} = require('./users');

app.use(cors());

app.use(router);
const server = http.createServer(app);


const io = socketio(server);


io.on('connect', (socket) =>{
    console.log('connected');

    socket.on('join',({room, name}, cb) =>{
        const {error, user} = addUser({id: socket.id, name, room})

        if(error) return cb(error);

        socket.emit('message', {user:'admin', text:`${user.name} welcomes you to ${user.room}` })

        socket.broadcast.to(user.room).emit('message',{user: 'admin', text:`${user.name}, has Joined!`})
        socket.join(user.room)

        cb();
    })

    socket.on('sendMessage', (message, cb) =>{
        const user = getUser(socket.id);

        // console.log(user.room);

        io.to(user.room).emit('message', {user:user.name, text:message})


        cb();
    });

    socket.on('disconnect', () =>{
        console.log('user gone');
        const user = removeUser(socket.id);
    })
})

server.listen(PORT, () =>{
    console.log(`serving on ${PORT}`);
})