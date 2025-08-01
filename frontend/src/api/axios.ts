import axios from 'axios';

const api: any = axios.create({
  baseURL: 'http://localhost:3000/', // URL base
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de requisição (ex: adicionar token)
api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Interceptor de resposta (ex: tratar erro 401)
api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response && error.response.status === 401) {
      console.warn('Não autorizado. Faça login novamente.');
    }
    return Promise.reject(error);
  }
);

export default api;
