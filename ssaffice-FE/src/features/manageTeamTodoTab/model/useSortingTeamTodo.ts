import { useDateFormatter } from '@/shared/model'
import { TeamTodoItemDisplay, TeamTodoListDisplay } from './types'

export const useSortingTeamTodo = (datas: TeamTodoItemDisplay[]): TeamTodoListDisplay => {
  const result: TeamTodoListDisplay = {}

  datas.forEach((each) => {
    const keyDate: string = useDateFormatter(
      'YYYY-MM-DD(string)',
      each.noticeSummary.createdAt,
    ) as string

    if (!result[keyDate]) {
      result[keyDate] = []
    }

    result[keyDate].push(each)
  })

  const sortedResult: TeamTodoListDisplay = {}

  Object.keys(result)
    .sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime()
    })
    .forEach((key) => {
      sortedResult[key] = result[key].sort(
        (a, b) =>
          new Date(a.noticeSummary.createdAt).getTime() -
          new Date(b.noticeSummary.createdAt).getTime(),
      )
    })

  return sortedResult
}
