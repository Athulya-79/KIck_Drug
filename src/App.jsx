
import {  Route, Routes,  } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Details from './pages/Details'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Downloads from './pages/Downloads'
import Landing from './pages/Landing'



function App() {

  return (
    <Routes>
                  <Route path='/home' element={<Home/>} />

                  <Route path='/details' element={<Details/>} />
                  <Route path='/dashboard' element={<Dashboard/>} />
                  <Route path='/navbar' element={<Navbar/>} />
                  <Route path='/downloads' element={<Downloads/>} />
                  <Route path='/' element={<Landing/>} />


      
    </Routes>
  )
}

export default App
