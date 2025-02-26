import { TeamTodoItemDisplay } from '@/features/manageTeamTodoTab'
// import { ScheduleItemDisplay } from './types'
// import { EachTodoItemDisplay } from '@/features/manageEachTodoTab'
import { ScheduleSummaries } from '@/features/manageEachTodoTab/model/types'

export type UseCalculateStatusCountsProps = {
  param:
    | {
        todos: ScheduleSummaries[]
        type: 'user'
      }
    | {
        todos: TeamTodoItemDisplay[]
        type: 'managerTeamTodo'
      }
    | {
        todos: ScheduleSummaries[]
        type: 'managerEachTodo'
      }
}
export const useCalculateStatusCounts = ({ param }: UseCalculateStatusCountsProps): number[] => {
  const result: number[] = []

  switch (param.type) {
    case 'user': {
      // count of todos
      const scheduleTodo: ScheduleSummaries[] = param.todos.filter((each) => {
        return each.scheduleStatusTypeCd === 'TODO'
      })
      result[0] = scheduleTodo.length

      // count of in_progress
      const scheduleProgress: ScheduleSummaries[] = param.todos.filter((each) => {
        return each.scheduleStatusTypeCd === 'IN_PROGRESS'
      })
      result[1] = scheduleProgress.length

      // count of done
      const scheduleDone: ScheduleSummaries[] = param.todos.filter((each) => {
        return each.scheduleStatusTypeCd === 'DONE'
      })
      result[2] = scheduleDone.length
      break
    }
    case 'managerTeamTodo': {
      const enrolledTodo: TeamTodoItemDisplay[] = param.todos.filter((each) => {
        return (
          each.scheduleEnrolledCount.enrolledCount === 0 ||
          each.scheduleEnrolledCount.enrolledCount !== each.scheduleEnrolledCount.completedCount
        )
      })
      result[0] = enrolledTodo.length

      const completedTodo: TeamTodoItemDisplay[] = param.todos.filter((each) => {
        return (
          each.scheduleEnrolledCount.enrolledCount !== 0 &&
          each.scheduleEnrolledCount.enrolledCount === each.scheduleEnrolledCount.completedCount
        )
      })
      result[1] = completedTodo.length
      break
    }
    case 'managerEachTodo': {
      const enrolledTodo: ScheduleSummaries[] = param.todos.filter((each) => {
        return each.isEnrollYn === 'Y' && each.scheduleStatusTypeCd !== 'DONE'
      }) // 등록만 하고 완료하지는 못한 상태 (진행중)
      result[0] = enrolledTodo.length

      const completedTodo: ScheduleSummaries[] = param.todos.filter((each) => {
        return each.isEnrollYn === 'Y' && each.scheduleStatusTypeCd === 'DONE'
      })
      result[1] = completedTodo.length
      break
    }
  }

  return result
}
