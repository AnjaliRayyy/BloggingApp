import Navbar from './components/Navbar'
import {BrowserRouter,Routes, Route} from 'react-router'
import './index.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import CreateBlog  from './pages/CreateBlog'
import BlogPage from './pages/BlogPage'
import BlogDetail from './pages/BlogDetail'

function App() {
  return (
    <>
   <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" index element={<Home/>} />
      <Route path="/blog" index element={<CreateBlog/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/categories/:category" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogDetail/>}/>
    </Routes>
   </BrowserRouter>
    </> 
  )
}

export default App
