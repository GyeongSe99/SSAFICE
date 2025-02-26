import type { AnnouncementItemDisplay } from '@/features/announcementTab'
import { AnnouncementItem } from './AnnouncementItem'
import { useDateFormatter } from '@/shared/model'

type AnnouncementDateGroupProps = {
  date: string
  dailyAnnouncements: AnnouncementItemDisplay[]
  isLast?: boolean
}
export const AnnouncementDateGroup = ({
  date,
  dailyAnnouncements,
  isLast,
}: AnnouncementDateGroupProps) => {
  return (
    <div
      className={`
          flex flex-col relative 
          ${isLast ? 'pb-spacing-16' : ''}
        `}
    >
      <div className='sticky top-0 z-10 pt-spacing-24 pb-spacing-16 text-color-text-primary body-lg-medium bg-color-bg-tertiary'>
        {`${useDateFormatter('MM월 DD일 ?요일', new Date(date))}`}
      </div>
      <div className='flex flex-col gap-spacing-16'>
        {dailyAnnouncements.map((each) => (
          <AnnouncementItem key={each.noticeId} announcementItem={each} />
        ))}
      </div>
    </div>
  )
}
