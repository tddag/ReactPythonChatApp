import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { io } from 'socket.io-client'
import { Provider } from 'react-redux'
import { store } from './state/store.tsx'


const socket = io(import.meta.env.VITE_SERVER_URL)

export const SocketContext = createContext(socket);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
        <SocketContext.Provider value={socket}>
          <BrowserRouter>
            <App />    
          </BrowserRouter>
        </SocketContext.Provider>    
      </Provider>           
    
  </StrictMode>,
)
