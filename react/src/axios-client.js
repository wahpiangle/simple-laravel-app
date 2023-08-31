import axios from "axios"

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

// interceptors will executed before request is sent or before response is received
axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
  return config;
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  const { response } = error
  if (response.status === 401) {
    localStorage.removeItem("ACCESS_TOKEN")
  }
  throw error;
})

export default axiosClient
