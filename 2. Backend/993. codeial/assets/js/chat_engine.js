// class ChatEngine {
//     constructor(chatBoxId, userEmail) {
//         this.chatBox = $(`#${chatBoxId}`);
//         this.userEmail = userEmail;

//         //now we have initiate a connection
//         this.socket = io.connect('http://localhost:5000'); //io is a global variable available as soon as we include cdnjs in home js

//         if (this.userEmail) {
//             this.connectHandler();
//         }
//     }

//     connectHandler() {

//         let self = this;

//         this.socket.on('connect', function () {
//             console.log('connection established using sockets...');
//         });

//         self.socket.emit('join_room', {
//             user_email: self.userEmail,
//             chatroom: 'codeial'
//         });

//         self.socket.on('user_joined', function (data) {
//             console.log('a user has joined');
//         });

//         //CHANGE :: send a message on clicking the send message button
//         $('#send-message').click(function () {
//             let msg = $('chat-message-input').val();

//             if (msg != '') {
//                 self.socket.emit('send_message', {
//                     message: msg,
//                     user_email: self.userEmail,
//                     chatroom: 'codeial'
//                 });
//             }
//         });

//         self.socket.on('receive_message', function (data) {
//             console.log('message received', data.message);

//             let message = $('<li>');
//             let messageType = 'other-messsage'
//             if (data.user_email == self.userEmail) {
//                 messageType = 'self-message'
//             }
//             newMessage.append($('<span>', {
//                 'html': data.message
//             }));

//             newMessage.append($('<sub>', {
//                 'html': data.user_email
//             }));

//             newMessage.addClass(messageType);

//             $('#chat-messages-list').append(newMessage);

//         })
//     }
// }




class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail) {
            this.connectionHandler();
        }

    }


    connectionHandler() {
        let self = this;

        this.socket.on('connect', function () {
            console.log('connection established using sockets...!');


            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined', function (data) {
                console.log('a user joined!',data);
            })


        });

        // CHANGE :: send a message on clicking the send message button
        $('#send-message').click(function () {
            let msg = $('#chat-message-input').val();
            document.getElementById('chat-message-input').value = '';
            if (msg != '') {
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);


            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<div>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })

        // self.socket.on('receive_message', function (data) {
        //      console.log('message received', data.message);
            
        //     function appendMessage(data) {
        //         let newMessage = $('<li>');

        //         let messageType = 'other-message';

        //         if (data.user_email == self.userEmail) {
        //             messageType = 'self-message';
        //         }

        //         newMessage.append($('<span>', {
        //             'html': data.message
        //         }));

        //         newMessage.append($('<sub>', {
        //             'html': data.user_email
        //         }));

        //         newMessage.addClass(messageType);

        //         $('#chat-messages-list').append(newMessage);
        //     }
            // const messages = document.getElementById('chat-messages-list');
            // scrollToBottom();
            // getMessages(data);
            // function getMessages(data) {
            //     // Prior to getting your messages.
            //     var shouldScroll = messages.scrollTop + messages.clientHeight === messages.scrollHeight;
            //     /*
            //      * Get your messages, we'll just simulate it by appending a new one syncronously.
            //      */
            //     appendMessage(data);
            //     // After getting your messages.
            //     if (!shouldScroll) {
            //         scrollToBottom();
            //     }
            // }
    
            // function scrollToBottom() {
            //     messages.scrollTop = messages.scrollHeight;
            // }
    
        // })
    }
}