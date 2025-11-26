'use server'
import axios from 'axios'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const privateApi = axios.create({
  baseURL: `${process.env.BACKEND_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

const publicApi = axios.create({
  baseURL: `${process.env.BACKEND_URL}/auth`,
  headers: { 'Content-Type': 'application/json' },
})
// Request interceptor
privateApi.interceptors.request.use(async (config) => {
  const cookieSession = await cookies()
  const token = cookieSession.get('token') // Get token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token.value}` // Attach token to headers
  }
  return config
})

// Response interceptor
privateApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      redirect('/login')
    }
    return Promise.reject(error)
  },
)

export { publicApi, privateApi }
