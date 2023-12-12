import 'bootstrap/dist/css/bootstrap.min.css';  
import { useEffect, useState } from 'react';
import MessageField from './MessageField';
import MessageInput from './MessageInput';

const ws = new WebSocket('ws://localhost:8080'); // create websocket connection

function App() {
  const [messages, setMessages] = useState([]); 
  const [userID, setUserID] = useState('');

  useEffect(() => {
    ws.onopen = () => {           //onopen event listener
      console.log('connected');  // when connection is established
    };

    ws.onmessage = (MessageEvent) => {  //onmessage event listener
      setMessages((prevMessages) => [...prevMessages, JSON.parse(MessageEvent.data)]);
      if (!userID && JSON.parse(MessageEvent.data).isInitMessage) {
        setUserID(JSON.parse(MessageEvent.data).userID);
      }
    };

    ws.onclose = (MessageEvent) => {  //onclose event listener
      setMessages((prevMessages) => [...prevMessages, JSON.parse(MessageEvent.data)]);
      if (!userID && JSON.parse(MessageEvent.data).isInitMessage) {
        setUserID(JSON.parse(MessageEvent.data).userID);
      }
    };

  }, [])

  return (
    <div className="container-fluid text-center p-5" style={{backgroundColor:"gray"}}>   
      <h1>Chat App</h1>
      <MessageField messages={messages} userID={userID} /> 
      <MessageInput ws={ws} />
    </div>
  );
}

export default App;
