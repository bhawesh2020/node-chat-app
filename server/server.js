const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

const {generateMessage, generateLocationMessage}=require('./utils/message');
const {isRealString}=require('./utils/validation.js');
const {Users}=require('./utils/users');

const publicPath=path.join(__dirname,'../public');
const port =process.env.PORT || 3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);
var users=new Users();

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log(`new user connected`);

    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);
        
        io.to(params.room).emit('updateUserList',users.getUserList(params.room));

        socket.emit('newMessage',generateMessage('admin','welcome to chat app'));
        
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('admin',`${params.name} has joined`));
        callback();
    });

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
        var user=users.getUser(socket.id);
        if(user && isRealString(data.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name,data.text));
        }
        
        callback();
        // socket.broadcast.emit('newMessage',{
        //         from:data.from,
        //         text:data.text,
        //         creeatedAt:new Date().getTime()
        // });

    });

    socket.on('createLocationMessage',(coords)=>{
        var user=users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
        }
    });

    socket.on('disconnect',()=>{
        var user=users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('admin',`${user.name} has left`));
        }
    });
});

server.listen(port,()=>{   
    console.log(`Server started on port ${port}`);
});