import { useLoginStateStore } from '@/entities/session'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { instance } from '@/shared/api'

export default function ProtectedRoute({
  children,
  role,
}: {
  children: React.ReactNode
  role: string
}) {
  const isAuthenticated = useLoginStateStore()
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: ['roleId'],
    queryFn: async () => {
      const { data } = await instance.get('/api/users/me')
      return data.roles[0].roleId
    },
    enabled: isAuthenticated,
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (data && data !== role && data !== 'ROLE_SYSADMIN') {
      navigate('/login')
    }
  }, [data, role, navigate])

  if (!isAuthenticated) {
    return null
  }

  if (data === role || data === 'ROLE_SYSADMIN') return <>{children}</>
  return null
}
