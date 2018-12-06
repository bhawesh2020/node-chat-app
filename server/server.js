const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

const publicPath=path.join(__dirname,'../public');
const port =process.env.PORT || 3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log(`new user connected`);

    // socket.emit('newEmail',{
    //     from:'someone@qwerty.com',
    //     createdAt:12345,
    //     text:'Hello world'
    // });

    socket.emit('newMessage',{
        from:'someone@qwerty.com',
        createdAt:12345,
        text:'Hello world'
    });

    // socket.on('createEmail',(data)=>{
    //     console.log('create email',data);
    // });

    socket.on('createMessage',(data)=>{
        console.log('create message',data);
    });

    socket.on('disconnect',()=>{
        console.log('User disconnected');
    });
});

server.listen(port,()=>{   
    console.log(`Server started on port ${port}`);
});