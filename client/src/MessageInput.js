import React, { useEffect } from 'react'
import { useState } from 'react'
import Form from 'react-bootstrap/Form';

const MessageInput = ({ws}) => {
 
  const[message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    ws.send(message)    // send message to server using "send" method
    setMessage('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control type="text" placeholder="Enter message" value={message} onChange={(e) => setMessage(e.target.value)} className="form-control" />
        <button type="submit" className="btn btn-primary mt-5 btn-lg">Send</button>
      </Form.Group>
      
    </Form>
  )
}

export default MessageInput