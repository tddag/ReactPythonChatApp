

import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Conversations from './pages/Conversations'
import NavBar from './components/NavBar'
function App() {

  return (
    <>
      <div>

        <NavBar/>
        <Routes>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/conversations" element={<Conversations/>}/>
          <Route path="/conversations/:id" element={<Conversations/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
