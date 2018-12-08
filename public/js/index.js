var socket=io();
socket.on('connect',function () {
    console.log('connected to server');
    // socket.emit('createEmail',{
    //     to:'qwerty@example.com',
    //     text:'random'
    // });
    // socket.emit('createMessage',{
    //     to:'qwerty@example.com',
    //     text:'random'
    // });
});

socket.on('disconnect',function(){
    console.log('disconnected from server');
});

// socket.on('newEmail',function (data) {
//     console.log('new email',data);
// });

socket.on('newMessage',function (data) {
    console.log('new message',data);
});
