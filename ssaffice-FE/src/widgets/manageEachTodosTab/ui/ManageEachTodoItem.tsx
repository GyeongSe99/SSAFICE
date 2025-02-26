import { TodoFlag } from '@/assets/svg'
// import { EachTodoItemDisplay } from '@/features/manageEachTodoTab'
import { ScheduleSummaries } from '@/features/manageEachTodoTab/model/types'

type TodoItemProps = {
  // todo: EachTodoItemDisplay
  todo: ScheduleSummaries
  // todo 객체가 전달되면 -> 할일 리스트의 각 할일 컴포넌트
  // todo 객체가 전달되지 않으면 -> 새로운 할일 등록 컴포넌트
  selectedState: string
}

export const ManageEachTodoItem = ({ todo, selectedState }: TodoItemProps) => {
  const isCompleted: boolean = todo.isEnrollYn === 'Y' && todo.scheduleStatusTypeCd === 'DONE'

  // select 태그가 '처리 중'인데 '처리 완료'인 할 일이 보이면 안 됨
  if (selectedState === 'MANAGER_IN_PROGRESS' && isCompleted) return null
  // select 태그가 '처리 완료' 인데 '처리 중'인 할 일이 보이면 안 됨
  if (selectedState === 'MANAGER_DONE' && !isCompleted) return null

  return (
    <div
      className={`
        flex justify-between
        w-full p-spacing-16 h-[74px]
        bg-color-bg-primary hover:bg-color-bg-interactive-secondary-hover active:bg-color-bg-interactive-secondary-press
        border border-color-border-tertiary border-spacing-1
        rounded-radius-8
        `}
    >
      <div
        className={`
          flex gap-spacing-8 items-center
        `}
      >
        {/* todoItem 왼쪽 파트(상태 라벨, 할 일 이름) */}

        {/* 상태 라벨 */}
        <div className='flex items-center justify-center w-spacing-24 h-spacing-24'>
          <div className='flex w-[14px] h-[18px]'>
            <TodoFlag type={isCompleted ? 'DONE' : 'IN_PROGRESS'} />
          </div>
        </div>

        <div
          className={`
                  flex flex-col gap-spacing-8
                  `}
        >
          <div className='text-color-text-primary body-sm-medium'>{todo.title}</div>
          <div className='text-color-text-tertiary body-sm-medium'>{todo.chargeUser.name}</div>
        </div>
      </div>

      <div className='flex justify-end items-center'>
        <div
          className={`
            flex justify-center items-center
            py-spacing-2 px-spacing-6
            text-color-text-interactive-inverse body-xs-medium
            ${isCompleted ? 'bg-color-bg-success' : 'bg-color-bg-info'}
            rounded-radius-8
            `}
        >
          {isCompleted ? '처리 완료' : '처리 중'}
        </div>
      </div>
    </div>
  )
}
