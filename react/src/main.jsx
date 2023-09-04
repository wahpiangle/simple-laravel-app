import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ContextProvider } from './context/ContextProvider'
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ContextProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <Toaster />
            </QueryClientProvider>
        </ContextProvider>
    </React.StrictMode>,
)
