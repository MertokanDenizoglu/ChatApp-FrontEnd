import React from 'react'
import Live from '../components/Live/Live'
const Home = ({username,setUserName,setRoom ,room , setChatScreen , socket}) => {
  return (
    <div className='bg-black'>
       <Live username={username} setUserName={setUserName} setRoom={setRoom} setChatScreen={setChatScreen} room={room} socket={socket}/>
    </div>
  )
}

export default Home