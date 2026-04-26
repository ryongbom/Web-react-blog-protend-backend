import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Article from "./pages/Articles"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('username')
    if (token) {
      setIsLoggedIn(true)
      setUsername(user)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setIsLoggedIn(false)
    setUsername('')
    window.location.href = '/'
  }

  return (
    <BrowserRouter>
      <nav style={navStyle}>
        <div style={navContainerStyle}>
          <Link to="/" style={logoStyle}>MiniBlog</Link>
          
          <div style={navLinksStyle}>
            <Link to="/" style={linkStyle}>Home</Link>
            <Link to="/article" style={linkStyle}>Articles</Link>
            
            {!isLoggedIn ? (
              <>
                <Link to="/register" style={linkStyle}>Register</Link>
                <Link to="/login" style={linkStyle}>Login</Link>
              </>
            ) : (
              <>
                <span style={userNameStyle}>{username}</span>
                <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div style={contentStyle}>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path="/article" element={<Article />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

const navStyle = {
  backgroundColor: '#f8f9fa',
  borderBottom: '1px solid #eaeaea',
  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  backdropFilter: 'blur(0px)'
}

const navContainerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '16px 24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const logoStyle = {
  fontSize: '22px',
  fontWeight: '700',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textDecoration: 'none',
  letterSpacing: '-0.5px'
}

const navLinksStyle = {
  display: 'flex',
  gap: '28px',
  alignItems: 'center'
}

const linkStyle = {
  color: '#4a5568',
  textDecoration: 'none',
  fontSize: '15px',
  fontWeight: '500',
  padding: '6px 0',
  position: 'relative',
  transition: 'color 0.2s ease'
}

const userNameStyle = {
  color: '#667eea',
  fontSize: '14px',
  fontWeight: '500',
  backgroundColor: '#f0f0ff',
  padding: '6px 14px',
  borderRadius: '20px'
}

const logoutButtonStyle = {
  backgroundColor: 'transparent',
  color: '#e53e3e',
  border: '1px solid #e53e3e',
  padding: '6px 14px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.2s ease'
}

const contentStyle = {
  minHeight: 'calc(100vh - 60px)'
}

export default App