import { useDateFormatter } from '@/shared/model'
import type { UnscheduledListDisplay } from './types'
import { UnScheduledDisplay } from '@/features/todoTab/index.ts'

export const useSortingUnscheduled = (
  datas: UnScheduledDisplay[],
  type: 'by deadline' | 'by registration', //
): UnscheduledListDisplay => {
  const result: any = {}

  datas.forEach((each) => {
    let keyDate: string = '1970-01-01' // 임의 기본값

    switch (type) {
      case 'by deadline':
        if (each?.endDateTime) {
          keyDate = useDateFormatter('YYYY-MM-DD(string)', new Date(each?.endDateTime)) as string
        }
        break

      case 'by registration':
        keyDate = useDateFormatter('YYYY-MM-DD(string)', new Date(each?.createdAt)) as string
        break
    }

    if (!result[keyDate]) {
      result[keyDate] = []
    }

    result[keyDate].push(each)
  })

  const sortedResult: UnscheduledListDisplay = {}

  Object.keys(result)
    .sort((a, b) => {
      return new Date(b).getTime() - new Date(a).getTime()
    })
    .forEach((key) => {
      switch (type) {
        case 'by deadline': {
          sortedResult[key] = result[key].sort((a: any, b: any) => {
            if (a?.endDateTime && b?.endDateTime)
              return new Date(b?.endDateTime).getTime() - new Date(a?.endDateTime).getTime()
            else return 0
          })
          break
        }

        case 'by registration': {
          sortedResult[key] = result[key].sort(
            (a: any, b: any) =>
              new Date(b?.createdAt)?.getTime() - new Date(a?.createdAt)?.getTime(),
          )
          break
        }
      }
    })

  return sortedResult
}
