import { useDateFormatter } from '@/shared/model'
import { EachTodoListDisplay, ScheduleSummaries } from './types'

export const useSortingEachTodo = (datas: ScheduleSummaries[]): EachTodoListDisplay => {
  const result: EachTodoListDisplay = {}

  datas.forEach((each) => {
    const keyDate: string = useDateFormatter('YYYY-MM-DD(string)', each.createdAt) as string

    if (!result[keyDate]) {
      result[keyDate] = []
    }

    result[keyDate].push(each)
  })

  const sortedResult: EachTodoListDisplay = {}

  Object.keys(result)
    .sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime()
    })
    .forEach((key) => {
      sortedResult[key] = result[key].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
    })

  return sortedResult
}
