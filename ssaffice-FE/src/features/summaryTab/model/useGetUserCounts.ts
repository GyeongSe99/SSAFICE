import { instance } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

type UserCounts = {
  noticeCounts: {
    total: number
    essential: number
    enrolled: number
  }

  scheduleCounts: {
    todoCount: number
    inProgressCount: number
    doneCount: number
  }
}
export const useGetUserCounts = (reloadTrigger: boolean) => {
  const { data } = useQuery({
    queryKey: ['summary', reloadTrigger],
    queryFn: async () => {
      const { data } = await instance.get('/api/users/counts')
      return data
    },
  })

  const [userCounts, setUserCounts] = useState<UserCounts | null>(data)

  useEffect(() => {
    setUserCounts(data)
  }, [data])

  return {
    noticeCounts: userCounts?.noticeCounts,
    scheduleCounts: userCounts?.scheduleCounts,
  }
}
