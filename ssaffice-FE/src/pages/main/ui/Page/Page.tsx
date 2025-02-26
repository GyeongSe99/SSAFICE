import { useNavigate } from 'react-router-dom'
import { SummaryTab } from '@/widgets/summaryTab'
import { AnnouncementTab } from '@/widgets/announcementTab'
import { TodoTab } from '@/widgets/todoTab'
import { useIsTabOpenStore, useIsAnimationStore } from '@/shared/model'
import { useMattermostSyncStore } from '@/entities/session'
import { useEffect } from 'react'
import { SummaryProvider } from '@/shared/model'

export const MainPage = () => {
  const navigate = useNavigate()

  //store
  const isTabOpen = useIsTabOpenStore()
  const isAnimation = useIsAnimationStore()
  const mattermostSync = useMattermostSyncStore()

  useEffect(() => {
    if (mattermostSync) return

    navigate('/mattermost/sync')
  }, [mattermostSync])

  return (
    <main className='flex flex-col w-full min-h-[calc(100vh+190px)] gap-y-spacing-32 pt-spacing-40'>
      <SummaryProvider>
        <SummaryTab />

        <div
          className={`flex gap-x-spacing-40 px-spacing-32 ${isAnimation ? ' animate-gapShrink' : ''}`}
        >
          {isTabOpen && <AnnouncementTab />}
          <TodoTab />
        </div>
      </SummaryProvider>
    </main>
  )
}
