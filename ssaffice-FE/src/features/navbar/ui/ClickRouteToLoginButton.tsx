import { useNavigate } from 'react-router-dom'

export const ClickRouteToLoginButton = () => {
  const navigate = useNavigate()

  const routeToLogin = () => {
    navigate('/login')
  }

  return (
    <button
      onClick={routeToLogin}
      className='w-fit h-fit bg-color-bg-interactive-primary px-spacing-24 py-spacing-8 rounded-radius-32'
    >
      <span className='text-color-text-interactive-inverse body-md-medium'>로그인</span>
    </button>
  )
}
