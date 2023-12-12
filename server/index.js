const WebSocket = require('ws'); // import websocket library

const { v4: uuidv4 } = require('uuid');

const wss = new WebSocket.Server({ port: 8080 }, () => { // create websocket server
  console.log('WebSocket server started on port 8080');
}); 

const users = []; // array to store connections

wss.on('connection', (ws) => {  // on connection established
  ws.clientId = uuidv4(); // generate unique id for each client 
  users.push(ws); // store new connection in array of connections

  console.log(`Client connected: ${ws.clientId}`);

  ws.send(JSON.stringify({message:'',userID:ws.clientId, isInitMessage:true})); // send empty message to client to initialize connection

  users.forEach((user) => {
    if (user.clientId !== ws.clientId) 
      user.send(JSON.stringify({message:'New user joined',userID:'', isInitMessage:false})); // send message to all users except sender
    });

  ws.on('message', data => { // when message is received from client
    console.log(`${data}`);  
    users.forEach((user) => {
        user.send(JSON.stringify({message:`${data}`,userID:ws.clientId, isInitMessage:false}));
    });

  ws.on('close', () => {  // when connection is closed
    console.log(`Client disconnected: ${ws.clientId}`);
    users.forEach((user) => {user.send(JSON.stringify({message:'User disconnected',userID:ws.clientId, isInitMessage:false})); 
    });
  });

  });

})