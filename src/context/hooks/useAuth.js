import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(true)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()


  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }

    setLoading(false)
  }, [])

  async function handleLogin(data) {
    const { data: { token }} = await api.post('/auth', data)

    localStorage.setItem('token', JSON.stringify(token))
    api.defaults.headers.Authorization = `Bearer ${token}`
    setAuthenticated(true)
    navigate('../orders')
  }

  async function handleLogout(data) {
    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    navigate('', { replace: true })
  }

  return { authenticated, loading, handleLogin, handleLogout}
}
