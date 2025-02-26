import {
  ClickRouteToLoginButton,
  // ClickNotificationButton,
  ClickProfileButton,
} from '@/features/navbar'
import { Logo } from '@/assets/svg'
import { useLoginStateStore } from '@/entities/session/index.ts'

export const Navbar = () => {
  const isAuthenticated = useLoginStateStore()

  return (
    <header className='sticky top-0 z-30 flex items-center justify-between w-full border-b px-spacing-80 bg-color-bg-primary h-[76px] py-spacing-16 border-color-border-tertiary'>
      <Logo className='h-9' />
      {isAuthenticated ? (
        <div className='flex items-center gap-x-spacing-40'>
          {/* <ClickNotificationButton /> */}
          <ClickProfileButton />
        </div>
      ) : (
        <ClickRouteToLoginButton />
      )}
    </header>
  )
}
