import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { postMmSync } from '@/shared/api/MM'

export const SyncForm = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    if (!email || !password) {
      setIsDisabled(true)
      return
    }

    setIsDisabled(false)
  }, [email, password])

  const handleSync = () => {
    postMmSync({ loginId: email, password }, navigate)
  }

  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-col gap-spacing-64'>
        <div className='flex flex-col gap-spacing-24'>
          <div className='flex flex-col gap-spacing-12'>
            <div className='flex justify-start text-color-text-tertiary body-md-semibold'>
              MM 이메일
            </div>
            <input
              type='email'
              className='flex w-full border focus:outline-none px-spacing-16 py-spacing-12 border-color-border-secondary rounded-radius-8 placeholder:color-text-disabled placeholder:body-md-medium'
              placeholder='EMAIL'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-spacing-12'>
            <div className='flex justify-start text-color-text-tertiary body-md-semibold'>
              MM 비밀번호
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
        <button
          onClick={handleSync}
          disabled={isDisabled}
          className='w-full h-fit py-spacing-16 body-lg-medium text-color-icon-interactive-inverse bg-color-bg-interactive-primary rounded-radius-8 disabled:bg-color-bg-disabled'
        >
          MM 연동하기
        </button>
      </div>
    </div>
  )
}
