import { AddIcon } from '@/assets/svg'
import { useClickedToggle, useDateFormatter } from '@/shared/model'
// import { useCalculateStatusCounts, type ScheduleItemDisplay } from '@/features/todoTab'
import { useCalculateStatusCounts } from '@/features/todoTab'
import { TodoItem } from './TodoItem'
import { ScheduleSummaries } from '@/features/manageEachTodoTab/model/types'

type TodoDateGroupProps = {
  date: string
  // dailySchedules: ScheduleItemDisplay[]
  dailySchedules: ScheduleSummaries[]
  todoListReload: () => void
  isLast?: boolean
  selectedState: string
  selectedSort: 'endDateTime' | 'createdAt'
}

export const TodoDateGroup = ({
  date,
  dailySchedules,
  todoListReload,
  isLast,
  selectedState,
  selectedSort,
}: TodoDateGroupProps) => {
  const { isClicked, handleIsClicked } = useClickedToggle()
  const statusCounts: number[] = useCalculateStatusCounts({
    param: { todos: dailySchedules, type: 'user' },
  })

  const hideTitle: boolean =
    (selectedState === 'TODO' && statusCounts[0] === 0) ||
    (selectedState === 'IN_PROGRESS' && statusCounts[1] === 0) ||
    (selectedState === 'DONE' && statusCounts[2] === 0)
  // selectedState 값을 변경했을 때, 일자 내에 선택한 state의 일정이 없을 경우
  // YYYY년 MM월 DD일 ~ 형식의 날짜 헤더와 '할일 등록하기' 버튼만 노출되는 현상 방지를 위해 추가됨
  // 아래 return되는 JSX 내의 hideTitle 조건을 삭제해도 동작은 하지만, 일정 없이 일정 헤더만 남아있는 점이 부자연스러워 추가하였음
  // 자세한 예시와 스크린샷은 212번 MR 참고해 주세요

  const isToday: boolean = date === (useDateFormatter('YYYY-MM-DD(string)', new Date()) as string)
  // '등록 순' 정렬일 때, 오늘 날짜에 한해 hideTitle을 적용하지 않습니다. (오늘 등록된 일정이 없더라도, 날짜와 간편 할일 등록 버튼 노출)
  // selectedSort === 'createdAt' && isToday 형태 등으로 조합하여 사용합니다.

  return (
    <div className='relative flex flex-col'>
      {!isToday && hideTitle ? (
        <></>
      ) : (
        <div className='sticky top-0 z-10 flex gap-spacing-8 pt-spacing-24 pb-spacing-16 bg-color-bg-tertiary'>
          {/* 날짜 영역 */}
          <div className=' text-color-text-primary body-lg-medium'>
            {useDateFormatter('MM월 DD일 ?요일', new Date(date)) as string}
          </div>

          <div className='flex items-center justify-center px-spacing-8 py-spacing-2 text-color-text-interactive-inverse body-sm-medium bg-color-bg-interactive-disabled rounded-radius-circle'>
            {/* count of TODOs */}
            {statusCounts[0]}
          </div>

          <div className='flex items-center justify-center px-spacing-8 py-spacing-2 text-color-text-interactive-inverse body-sm-medium bg-color-bg-info rounded-radius-circle'>
            {/* count of IN_PROGRESS */}
            {statusCounts[1]}
          </div>

          <div className='flex items-center justify-center px-spacing-8 py-spacing-2 text-color-text-interactive-inverse body-sm-medium bg-color-bg-success rounded-radius-circle'>
            {/* count of DONEs */}
            {statusCounts[2]}
          </div>

          {isToday && (
            <div className='flex items-center justify-center px-spacing-8 py-spacing-2 text-color-text-interactive-inverse body-sm-medium bg-color-bg-info rounded-radius-8'>
              오늘
            </div>
          )}
        </div>
      )}
      <div className={`flex flex-col gap-spacing-16 ${isLast ? 'pb-spacing-16' : ''}`}>
        {selectedSort === 'endDateTime' || (selectedSort === 'createdAt' && isToday) ? (
          !isToday && hideTitle ? (
            <></>
          ) : isClicked ? (
            <div
              className='
                flex gap-spacing-8 items-center
                h-[56px]
                '
            >
              <TodoItem
                todoListReload={todoListReload}
                backToAddNewTodoButton={handleIsClicked}
                today={new Date(date)}
                visible
              />
            </div>
          ) : (
            <div
              className='
                flex gap-spacing-8 items-center
                h-[56px] p-spacing-16
                hover:bg-color-bg-interactive-secondary-hover
                '
              onClick={handleIsClicked}
            >
              <div className='w-[24px] h-[24px] p-[5px]'>
                <AddIcon />
              </div>
              <div className='text-color-text-primary body-md-medium'>할일 등록하기</div>
            </div>
          )
        ) : (
          <></>
        )}

        {/* todoItems */}
        {dailySchedules.map((each) => (
          <TodoItem
            key={each.scheduleId}
            todo={each}
            todoListReload={todoListReload}
            visible={
              selectedState === 'ALL' ||
              selectedState === 'default' ||
              each.scheduleStatusTypeCd === selectedState
            }
          />
        ))}
      </div>
    </div>
  )
}
