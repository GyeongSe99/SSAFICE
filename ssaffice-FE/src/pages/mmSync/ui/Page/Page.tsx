import { Link, useNavigate } from 'react-router-dom'
import { SyncForm } from '@/features/session/mmSync'
import { useMattermostSyncStore, useLoginStateStore } from '@/entities/session'
import { useEffect } from 'react'

export const MatterMostSyncPage = () => {
  const navigate = useNavigate()
  const isAuthenticated = useLoginStateStore()
  const mattermostSync = useMattermostSyncStore()

  useEffect(() => {
    if (isAuthenticated) return

    navigate('/login')
  }, [isAuthenticated])

  return (
    <>
      {mattermostSync ? (
        <div className='flex flex-col w-full h-[calc(100vh-108px)] justify-center items-center'>
          <div className='flex flex-col items-center w-[475px] gap-y-spacing-64'>
            <div className='flex flex-col w-full gap-y-spacing-48'>
              <h1 className='self-center text-color-text-primary heading-desktop-3xl w-fit min-w-max px-spacing-64'>
                이미 인증된 계정입니다.
              </h1>
              <p className='w-full text-center body-lg-medium text-color-text-tertiary'>
                Mattermost 연동을 통해
                <br />
                SSAFICE에서 Mattermost 공지사항도 함께 확인해보세요 !
              </p>
            </div>
            <Link
              to='/main'
              className='w-full text-center h-fit py-spacing-16 body-lg-medium text-color-icon-interactive-inverse bg-color-bg-interactive-primary rounded-radius-8 disabled:bg-color-bg-disabled'
            >
              SSAFICE 시작하기
            </Link>
          </div>
        </div>
      ) : (
        <div className='flex flex-col w-full h-[calc(100vh-108px)] justify-center items-center'>
          <div className='flex flex-col items-center w-[475px] gap-y-spacing-64'>
            <div className='flex flex-col w-full gap-y-spacing-48'>
              <h1 className='self-center text-color-text-primary heading-desktop-3xl w-fit px-spacing-64'>
                처음 방문이신가요?
              </h1>
              <p className='w-full text-center body-lg-medium text-color-text-tertiary'>
                Mattermost 연동을 통해
                <br />
                SSAFICE에서 Mattermost 공지사항도 함께 확인해보세요 !
              </p>
            </div>
            <SyncForm />
          </div>
        </div>
      )}
    </>
  )
}
