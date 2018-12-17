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
    var li=jQuery('<li></li>');
    li.text(`${data.from}:${data.text}`);
    jQuery('#messages').append(li);
});

// socket.emit('createMessage',{
//     from:'Bhawesh',
//     text:'hello world'
// },function (d){
//     console.log('got it',d);
// });

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    
    socket.emit('createMessage',{
        from:'user',
        text:jQuery('[name=message]').val()
    },function(){

    });

});
