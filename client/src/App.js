import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './Pages/core/HomePage'
import LoginPage from './Pages/auth/LoginPage'
import RegisterPage from './Pages/auth/RegisterPage'
import Navbar from './Components/core/Navbar'

const App = () => {
  return (
    <div>
    <Navbar />
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/login' exact component={LoginPage} />
        <Route path='/register' exact component={RegisterPage} />
      </Switch>
    </div>
  )
}

export default App
