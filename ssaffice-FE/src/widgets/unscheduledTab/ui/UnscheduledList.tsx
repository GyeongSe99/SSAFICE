import { useSortingUnscheduled } from '@/features/unscheduledTab'
import { UnscheduledDateGroup } from './UnscheduledDateGroup'
import type { UnscheduledListDisplay } from '@/features/unscheduledTab'
import { instance } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export const UnscheduledList = ({
  page,
  overflowHandler,
}: {
  page: number
  overflowHandler: () => void
}) => {
  const [resultList, setResultList] = useState<UnscheduledListDisplay | null>(null)
  const {} = useQuery({
    queryKey: ['unscheduled', page],
    queryFn: async () => {
      const response = await instance.get(`/api/schedules/unregistered?page=${page}&size=20`)
      if (page) {
        setResultList((prevList) => ({
          ...prevList,
          content: [...(prevList?.content || []), ...response.data.content],
        }))
      } else {
        setResultList(response.data)
      }

      return response.data
    },
  })

  // calculate overflow
  useEffect(() => {
    overflowHandler()
  }, [resultList])

  const datas: UnscheduledListDisplay = useSortingUnscheduled(
    resultList?.content || [],
    'by registration',
  )
  return (
    <div className='w-full h-full '>
      <div className='relative flex flex-col w-full h-full '>
        {Object.entries(datas).map(([date, dailyUnschedules], index) => (
          <UnscheduledDateGroup
            key={date}
            date={date}
            dailyUnschedules={dailyUnschedules}
            isLast={index === Object.entries(datas).length - 1}
          />
        ))}
        {Object.entries(datas).length === 0 && (
          <div
            className='
              flex justify-center items-center
              text-color-text-primary heading-desktop-md whitespace-pre-line
            '
          >
            등록되지 않은 공지가 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}
