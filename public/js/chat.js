var socket=io();

function scrollToBottom(){
    //selector
    var messages=jQuery("#messages");
    var newMessage=messages.children('li:last-child');
    //height
    var clientHeight=messages.prop('clientHeight');
    var scrollTop=messages.prop('scrollTop');
    var scrollHeight=messages.prop('scrollHeight');
    var newMessageHeight=newMessage.innerHeight();
    var lastMessageHeight=newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }

}

socket.on('connect',function () {
    var params=jQuery.deparam(window.location.search);
    socket.emit('join',params , function(err){
        if(err){
            alert(err);
            window.location.href='/';
        } else{
            console.log('no error');
        }
    });
    // socket.emit('createEmail',{
    //     to:'qwerty@example.com',
    //     text:'random'
    // });
    // socket.emit('createMessage',{
    //     to:'qwerty@example.com',
    //     text:'random'
    // });
});

socket.on('newLocationMessage',function(data){
    var formattedTime=moment(data.createdAt).format('h:mm a');
    var template=jQuery("#location-message-template").html();
    var html=Mustache.render(template,{
        url:data.url,
        from:data.from,
        createdAt:formattedTime
    });
    jQuery("#messages").append(html);
    scrollToBottom();
    // var li=jQuery('<li></li>');
    // var a=jQuery('<a target="_blank">My current location</a>');
    // li.text(`${data.from} ${formattedTime}:`);
    // a.attr('href',data.url);
    // li.append(a);
    // jQuery('#messages').append(li);
});

socket.on('disconnect',function(){
    console.log('disconnected from server');
});

// socket.on('newEmail',function (data) {
//     console.log('new email',data);
// });

socket.on('updateUserList',function(users){
    var ol=jQuery('<ol></ol>');
    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery("#users").html(ol);
});

socket.on('newMessage',function (data) {
    var formattedTime=moment(data.createdAt).format('h:mm a');
    var template=jQuery("#message-template").html();
    var html=Mustache.render(template,{
        text:data.text,
        from:data.from,
        createdAt:formattedTime
    });

    jQuery("#messages").append(html);
    scrollToBottom();
    
    // var li=jQuery('<li></li>');
    // li.text(`${data.from} ${formattedTime}: ${data.text}`);
    // jQuery('#messages').append(li);
});

// socket.emit('createMessage',{
//     from:'Bhawesh',
//     text:'hello world'
// },function (d){
//     console.log('got it',d);
// });

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    var params=jQuery.deparam(window.location.search);
    var messageTextBox=jQuery('[name=message]');

    socket.emit('createMessage',{
        from:'user',
        text:messageTextBox.val()
    },function(){
        messageTextBox.val('')
    });

});

var locationButton=jQuery('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by browser');
    }
    locationButton.attr('disabled','disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
        latitude:position.coords.latitude,
        longitude:position.coords.longitude
    });
    },function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});