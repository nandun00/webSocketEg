import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';  


const MessageField = ({messages, userID}) => {

  
  return (
    <div className="container  m-5  w-auto">
      {messages.map((message, index) => {
        if (message.userID === userID && !message.isInitMessage) {
          return (
            <div className="message" key={index}>
              <div className="message-content">
                
              <div className="border border-black m-1" style={{ backgroundColor: 'lightblue', padding:'10px' }}>{message.message}</div>
              </div>
            </div>
          )
        } else if (!message.isInitMessage) {
          return (
            <div className="message" key={index}>
              <div className="message-content">
               
              <div className="border border-black m-1 " style={{ backgroundColor: 'lightgreen', padding:'10px' }}>{message.message}</div>
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default MessageField