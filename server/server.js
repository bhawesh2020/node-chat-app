const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

const {generateMessage, generateLocationMessage}=require('./utils/message');
const publicPath=path.join(__dirname,'../public');
const port =process.env.PORT || 3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{

    socket.emit('newMessage',generateMessage('admin','welcome to chat app'));

    socket.broadcast.emit('newMessage',generateMessage('admin','New user joined'));

    console.log(`new user connected`);

    // socket.emit('newEmail',{
    //     from:'someone@qwerty.com',
    //     createdAt:12345,
    //     text:'Hello world'
    // });

    // socket.emit('newMessage',{
    //     from:'someone@qwerty.com',
    //     createdAt:12345,
    //     text:'Hello world'
    // });

    // socket.on('createEmail',(data)=>{
    //     console.log('create email',data);
    // });

    socket.on('createMessage',(data,callback)=>{
        console.log('create message',data);
        io.emit('newMessage',generateMessage(data.from,data.text));
        callback('This is from the server');
        // socket.broadcast.emit('newMessage',{
        //         from:data.from,
        //         text:data.text,
        //         creeatedAt:new Date().getTime()
        // });

    });

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });

    socket.on('disconnect',()=>{
        console.log('User disconnected');
    });
});

server.listen(port,()=>{   
    console.log(`Server started on port ${port}`);
});