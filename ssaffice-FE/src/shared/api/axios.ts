import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-type': 'application/json' },
  withCredentials: true,
})

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const access_token = localStorage.getItem('access_token')
  config.headers.Authorization = !!access_token ? `Bearer ${access_token}` : ''
  return config
}

const onErrorRequest = (err: AxiosError | Error): Promise<AxiosError> => {
  return Promise.reject(err)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { jwt } = response.data
  if (jwt) {
    localStorage.setItem('access_token', jwt)
  }
  return response
}

const onErrorResponse = (err: AxiosError | Error): Promise<AxiosError> => {
  return Promise.reject(err)
}

instance.interceptors.request.use(onRequest, onErrorRequest)
instance.interceptors.response.use(onResponse, onErrorResponse)
