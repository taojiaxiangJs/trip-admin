import axios from 'axios'
import { resReject, resResolve, reqReject, reqResolve } from './interceptors'

export function createAxios(options = {}, { reqResolve, reqReject, resResolve, resReject }) {
  const defaultOptions = {
    timeout: 12000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
  const service = axios.create({
    ...defaultOptions,
    ...options
  })
  if (reqResolve && reqReject && resResolve && resReject) {
    service.interceptors.request.use(reqResolve, reqReject)
    service.interceptors.response.use(resResolve, resReject)
  }
  return service
}

export const request = createAxios(
  {
    baseURL: import.meta.env.VITE_BASE_API
  },
  {
    resReject,
    resResolve,
    reqReject,
    reqResolve
  }
)

export const ossUpload = createAxios(
  {
    headers: {
      'Content-Type': ''
    }
  },
  {}
)
