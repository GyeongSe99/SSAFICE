import { AnnouncementDateGroup } from './AnnouncementDateGroup'
import { useSortingAnnouncement } from '@/features/announcementTab'
import type { AnnouncementListDisplay } from '@/features/announcementTab'
import { instance } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export const AnnouncementList = ({
  page,
  searchValue,
  overflowHandler,
}: {
  page: number
  searchValue: string
  overflowHandler?: () => void
}) => {
  const [resultList, setResultList] = useState<AnnouncementListDisplay | null>(null)
  const [searchResultList, setSearchResultList] = useState<AnnouncementListDisplay | null>(null)
  const {} = useQuery({
    queryKey: ['noticeSearch', searchValue],
    queryFn: async () => {
      const response = await instance.post(`/api/es/notice/search`, { keyword: searchValue })

      setSearchResultList((prevList) => ({
        ...prevList,
        content: [...(prevList?.content || []), ...response.data.content],
      }))
      return response.data
    },
    enabled: searchValue !== '',
  })

  const {} = useQuery({
    queryKey: ['announcements', page],
    queryFn: async () => {
      const response = await instance.get(`/api/notice?page=${page}&size=20`)
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
    if (overflowHandler) overflowHandler()
  }, [resultList, searchResultList])

  const datas: AnnouncementListDisplay = useSortingAnnouncement(
    (searchResultList?.content?.length ? searchResultList.content : resultList?.content) || [],
  )
  return (
    <div className='w-full h-full'>
      <div className='relative flex flex-col w-full h-full '>
        {Object.entries(datas).map(([date, dailyAnnouncements], index) => (
          <AnnouncementDateGroup
            key={date}
            date={date}
            dailyAnnouncements={dailyAnnouncements}
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
            표시할 공지가 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}
