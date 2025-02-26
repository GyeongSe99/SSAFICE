import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './appRouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useLoginStateStore, useProtectRoleStore } from '@/entities/session'
import './index.css'

const queryClient = new QueryClient()

const App = () => {
  const isAuthenticated = useLoginStateStore()
  const role = useProtectRoleStore()

  const router = appRouter({ isAuthenticated, role })

  return <RouterProvider router={router} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
