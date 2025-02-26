import { useDateFormatter } from '@/shared/model'
import { useCalculateStatusCounts } from '@/features/todoTab'
import { ManageTeamTodoItem } from './ManageTeamTodoItem'
import { TeamTodoItemDisplay } from '@/features/manageTeamTodoTab'

type TodoDateGroupProps = {
  date: string
  dailySchedules: TeamTodoItemDisplay[]
  isLast?: boolean
  selectedState: string
}

export const ManageTeamTodoDateGroup = ({
  date,
  dailySchedules,
  isLast,
  selectedState,
}: TodoDateGroupProps) => {
  const statusCounts: number[] = useCalculateStatusCounts({
    param: { todos: dailySchedules, type: 'managerTeamTodo' },
  })
  return (
    <div className='flex flex-col relative'>
      <div
        className='
          flex gap-spacing-8
          pt-spacing-24 pb-spacing-16
          bg-color-bg-tertiary 
          sticky top-0 z-10
        '
      >
        {/* 날짜 영역 */}
        <div
          className='
            text-color-text-primary body-lg-medium
            
            '
        >
          {useDateFormatter('MM월 DD일 ?요일', new Date(date)) as string}
        </div>
        <div
          className='
            flex justify-center items-center
            px-spacing-8 py-spacing-2
            text-color-text-interactive-inverse body-sm-medium
            bg-color-bg-info
            rounded-radius-circle
        '
        >
          {statusCounts[0]}
        </div>

        <div
          className='
            flex justify-center items-center
            px-spacing-8 py-spacing-2
            text-color-text-interactive-inverse body-sm-medium
            bg-color-bg-success
            rounded-radius-circle
            '
        >
          {statusCounts[1]}
        </div>
      </div>

      <div className={`flex flex-col gap-spacing-16 ${isLast ? 'pb-spacing-16' : ''}`}>
        {/* todoItems */}
        {dailySchedules.map((each) => (
          <ManageTeamTodoItem
            key={each.noticeSummary.noticeId}
            todo={each}
            selectedState={selectedState}
          />
        ))}
      </div>
    </div>
  )
}
