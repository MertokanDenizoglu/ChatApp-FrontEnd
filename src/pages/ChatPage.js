import React from 'react'
import Chat from '../components/Chat/Chat'

const ChatPage = ({socket ,username ,room}) => {
  return (
    <div className='bg-black'>
       <Chat socket={socket} username={username} room={room}/>
    </div>
  )
}

export default ChatPage