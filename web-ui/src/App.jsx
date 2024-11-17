import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AuthContext from './context/AuthContext'

export default function App() {
  const [user, setUser] = useState(null)

  return (
    <ChakraProvider>
      <AuthContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </ChakraProvider>
  )
}