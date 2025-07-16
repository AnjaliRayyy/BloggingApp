import Navbar from './components/Navbar'
import {BrowserRouter,Routes, Route} from 'react-router'
import './index.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'

function App() {
  return (
    <>
   <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" index element={<Home/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
   </BrowserRouter>
    </> 
  )
}

export default App
