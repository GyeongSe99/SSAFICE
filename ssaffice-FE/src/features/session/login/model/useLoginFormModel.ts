import { useState } from 'react'

export const useLoginFormModel = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailValue = (email: string) => {
    setEmail(email)
  }

  const handlePasswordValue = (pwd: string) => {
    setPassword(pwd)
  }

  return { email, password, handleEmailValue, handlePasswordValue }
}
