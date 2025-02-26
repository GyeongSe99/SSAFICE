import { loginFormEmailValidCheckExpression } from '@/entities/session'

export const LoginFormEmailValidation = (email: string): boolean => {
  return loginFormEmailValidCheckExpression.test(email)
}
