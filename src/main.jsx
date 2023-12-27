import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import { QueryClient, QueryClientProvider } from 'react-query'
import { CatgoriesContextProvider } from './Component/Context/CatgoriesContext.jsx'

    const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <CatgoriesContextProvider>
            <App />
        </CatgoriesContextProvider>
    </QueryClientProvider>

)
