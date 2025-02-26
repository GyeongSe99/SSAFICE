import type { UnScheduledDisplay } from '@/features/todoTab'
import { UnscheduledItem } from './UnscheduledItem'
import { useDateFormatter } from '@/shared/model'

type UnscheduledDateGroupProps = {
  date: string
  dailyUnschedules: UnScheduledDisplay[]
  isLast?: boolean
}
export const UnscheduledDateGroup = ({
  date,
  dailyUnschedules,
  isLast,
}: UnscheduledDateGroupProps) => {
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
        {dailyUnschedules?.map((each) => (
          <UnscheduledItem key={each?.scheduleId} unscheduledItem={each} />
        ))}
      </div>
    </div>
  )
}
