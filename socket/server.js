const io = require("socket.io")(4001, {
    cors: {
      origin: "http://localhost:3001",
    },
  });

io.on('connection', (socket) => {
  socket.on('join_conversation', (conversationId) => {
    socket.join(conversationId);
    const messageData = {
      conversation_id: conversationId,
      sender_id: 'fdsfasffasfasfsafsfsfaffdfdssdfsfsf',
      text: 'Hello, User B!',
    };
    io.to(conversationId).emit('receive_message', messageData);
  });
  console.log('A user connected');
  
  socket.on('sendMessage', (data) => {
    console.log('Received message:', data);
    
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


