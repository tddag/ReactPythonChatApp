import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './state/store.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
            <BrowserRouter>
              <App />    
            </BrowserRouter>
          </PersistGate>            
      </Provider>           
    
  </StrictMode>,
)
