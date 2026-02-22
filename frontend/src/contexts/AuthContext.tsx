'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  firstName: string
  userEmail: string
  login: (firstName: string, userEmail: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [userEmail, setUserEmail] = useState('')

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName')
    const storedUserEmail = localStorage.getItem('userEmail')
    if (storedFirstName && storedUserEmail) {
      setFirstName(storedFirstName)
      setUserEmail(storedUserEmail)
      setIsLoggedIn(true)
    }
  }, [])

  const login = (firstName: string, userEmail: string) => {
    setFirstName(firstName)
    setUserEmail(userEmail)
    setIsLoggedIn(true)
    localStorage.setItem('firstName', firstName)
    localStorage.setItem('userEmail', userEmail)
  }

  const logout = () => {
    setFirstName('')
    setUserEmail('')
    setIsLoggedIn(false)
    localStorage.removeItem('firstName')
    localStorage.removeItem('userEmail')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, firstName, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
