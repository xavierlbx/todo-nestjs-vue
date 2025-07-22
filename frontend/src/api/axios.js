import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/', // URL base
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de requisição (ex: adicionar token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor de resposta (ex: tratar erro 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Não autorizado. Faça login novamente.')
    }
    return Promise.reject(error)
  }
)

export default api
