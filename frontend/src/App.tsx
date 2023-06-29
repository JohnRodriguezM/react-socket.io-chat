import './css/App.css'
import io from 'socket.io-client'

const socket = io('http://localhost:3000')


export const App = () =>{

  return (
    <>
      <h1>React 18 Alpha</h1>
    </>
  )
}

