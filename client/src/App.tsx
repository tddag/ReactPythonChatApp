

import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Conversations from './pages/Conversations'
import NavBar from './components/NavBar'
import ProtectedRoute from './components/ProtectedRoute'
import Users from './pages/Users'
import Home from './pages/Home'
function App() {

  return (
    <>
      <div className="h-screen">

        <NavBar/>
        <Routes>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route element={<Home/>}>
              <Route path="/" element={<Conversations/>}/>
              <Route path="/conversations" element={<Conversations/>}/>
              <Route path="/conversations/:id" element={<Conversations/>}/>
              <Route path="/users" element={<Users/>}/>            
            </Route>
          </Route>
          
        </Routes>
      </div>
    </>
  )
}

export default App
