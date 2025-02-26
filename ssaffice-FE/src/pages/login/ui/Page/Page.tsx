import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '@/features/session/login'
import { useLoginStateStore } from '@/entities/session'

export const LoginPage = () => {
  const isAuthenticated = useLoginStateStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) return
    navigate('/main')
  }, [isAuthenticated])

  return (
    <div className='flex flex-col items-center justify-center w-full h-[calc(100vh-108px)]'>
      <div className='flex flex-col items-center w-[28.375rem]'>
        <div className='flex flex-col w-full'>
          <h1 className='self-center text-color-text-primary heading-desktop-3xl w-fit px-spacing-64 mb-spacing-64'>
            SSAFICE 시작하기
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
