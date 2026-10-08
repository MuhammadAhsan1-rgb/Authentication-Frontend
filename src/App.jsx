import React, { useState } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Register from './components/Register'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || '')
  const [showRegister, setShowRegister] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = (newToken) => {
    localStorage.setItem("token" , newToken)
    setToken(newToken)
    setMessage('')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken('')
  }

  const handleRegister = () => {
    setShowRegister(false)
    setMessage("Account Created successfuly.")
  }

  if(token) {
    return <Dashboard token={token} onLogout={handleLogout} />
  }

  if (showRegister) {
    return (
      <Register
        onRegistered={handleRegister}
        onSwitch={() => setShowRegister(false)}
      />
    );
  }

  return (
    <Login
      onLogin={handleLogin}
      onSwitch={() => {
        setShowRegister(true);
        setMessage("");
      }}
      message={message}
    />
  );
}

export default App