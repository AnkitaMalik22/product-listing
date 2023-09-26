import React from 'react'

import {Routes ,Route} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import './styles/common.css'

const App = () => {

return (

<>
      <Routes>
        <Route path={'/'} element ={<Home/>} />
        <Route path={'/register'} element ={<Register/>} />
        <Route path={'/login'} element ={<Login/>} />
      </Routes>
 
    </>
    
  )
}

export default App