import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { io } from 'socket.io-client'


const socket = io(import.meta.env.VITE_SERVER_URL)

export const SocketContext = createContext(socket);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <App />    
        </BrowserRouter>
      </SocketContext.Provider>        
    
  </StrictMode>,
)
