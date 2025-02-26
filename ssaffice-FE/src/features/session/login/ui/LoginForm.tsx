import { useState } from 'react'
import { LoginButton } from './LoginButton'
import ssafyIcon from '/img/ssafy-icon.png'
import { instance } from '@/shared/api'
import { useNavigate } from 'react-router-dom'
import { useLoginStateStore, useSetLoginStateStore } from '@/entities/session/index.ts'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
// import { useLoginFormModel } from '../model/useLoginFormModel'
import { CommonModal } from '@/shared/ui/CommonModal/CommonModal'
import { ModalName } from '@/shared/model'
import { LoginFormEmailValidation } from '../model/LoginFormEmailValidation'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const setIsAuthenticated = useSetLoginStateStore()
  const isAuthenticated = useLoginStateStore()
  const navigate = useNavigate()

  // LOGIN ERROR MODAL SETTING
  const [modalName, setModalName] = useState<ModalName>('LoginFail')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const modalCloser = () => {
    setIsOpen(false)
  }

  useQuery({
    queryKey: ['user', isAuthenticated],
    queryFn: async () => {
      const { data } = await instance.get('/api/users/me')
      if (data) {
        data?.roles[0].roleId === 'ROLE_ADMIN' ? navigate('/pro') : navigate('/main')
      }

      return data
    },
    enabled: isAuthenticated,
  })

  async function handleLogin() {
    try {
      if (LoginFormEmailValidation(email) === false) {
        // 이메일 형식 유효성 검사 / ERROR MODAL APPEARS
        setModalName('EmailValidFalse')
        setIsOpen(true)
        return
      }

      const loginResponse = await instance.post('/api/auth/login', {
        username: email,
        password: password,
      })

      const response = loginResponse.data
      if (response) {
        setIsAuthenticated(true)
        navigate('/main')
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        // ERROR MODAL APPEARS
        if (err.response?.status === 404 || 403) {
          setModalName('LoginFail')
          setIsOpen(true)
        }
      }
      console.error(err)
    }
  }

  async function handleSSOLogin() {
    try {
      const response = await instance.get('/api/sso/providers/SSAFY/authorization-uri')

      const url = response.data
      if (url) {
        window.location.href = url
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='flex flex-col w-full'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin()
        }}
      >
        <div className='flex flex-col gap-spacing-64'>
          <div className='flex flex-col gap-spacing-24'>
            <div className='flex flex-col gap-spacing-12'>
              <div className='flex justify-start text-color-text-tertiary body-md-semibold'>
                이메일
              </div>
              <input
                type='text'
                className='flex w-full border focus:outline-none px-spacing-16 py-spacing-12 border-color-border-secondary rounded-radius-8 placeholder:color-text-disabled placeholder:body-md-medium'
                placeholder='EMAIL'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-spacing-12'>
              <div className='flex justify-start text-color-text-tertiary body-md-semibold'>
                비밀번호
              </div>
              <input
                type='password'
                className='flex w-full border focus:outline-none px-spacing-16 py-spacing-12 border-color-border-secondary rounded-radius-8 placeholder:color-text-disabled placeholder:body-md-medium'
                placeholder='PASSWORD'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <LoginButton label='로그인' onClick={handleLogin} />

          <CommonModal name={modalName} opened={isOpen} closeRequest={modalCloser} />
        </div>

        <div className='relative flex flex-col items-center justify-center w-full h-spacing-32'>
          <div className='absolute inset-0 flex items-center px-spacing-4'>
            <div className='w-full border-t border-color-border-primary' />
          </div>
          <span className='relative z-10 px-2 bg-white text-color-text-disabled body-sm-medium'>
            또는
          </span>
        </div>
      </form>
      <LoginButton
        label='SSAFY로 시작하기'
        icon={ssafyIcon}
        onClick={handleSSOLogin}
        className='border text-color-text-info-bold bg-color-bg-info-subtle border-color-border-info-subtle'
      />
    </div>
  )
}
