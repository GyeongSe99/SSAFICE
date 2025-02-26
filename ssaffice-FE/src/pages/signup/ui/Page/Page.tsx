import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignupForm } from '@/features/session/signup'
import { useLoginStateStore, useUserIdStore } from '@/entities/session'

export const SignupPage = () => {
  const isAuthenticated = useLoginStateStore()
  const isUserId = useUserIdStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isUserId) {
      navigate('/login')
    }

    if (!isAuthenticated) return
    navigate('/main')
  }, [isAuthenticated, isUserId])

  return (
    <div className='flex flex-col w-full h-[calc(100vh-108px)] justify-center items-center'>
      <div className='flex flex-col items-center w-[28.375rem]'>
        <div className='flex flex-col w-full'>
          <h1 className='self-center text-color-text-primary heading-desktop-3xl w-fit px-spacing-64 mb-spacing-64'>
            SSAFICE 회원가입
          </h1>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}
