

import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Conversations from './pages/Conversations'

function App() {


  return (
    <>
      <div>

        <Routes>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/conversations" element={<Conversations/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
