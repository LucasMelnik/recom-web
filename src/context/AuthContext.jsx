import { createContext, useState } from 'react'

const Context = createContext()

import api from '../config/api'

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false)

  async function handleLogin(data) {
    await api.post('/auth', data)
    setAuthenticated(true)
  }

  return (
    <Context.Provider value={{ authenticated, handleLogin }}>
      {children}
    </Context.Provider>
  )
}

export { Context, AuthProvider }
