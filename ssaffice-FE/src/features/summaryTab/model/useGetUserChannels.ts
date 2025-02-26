import { MattermostTeam } from '@/features/ManageMemberTab'
import { useSortingMattermostChannel } from '@/features/ManageMemberTab/model/useSortingMattermostChannel'
import { instance } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export const useGetUserChannels = (): MattermostTeam[] => {
  // 이름은 채널인데 .. mm 팀 리스트를 리턴함
  const [userChannels, setUserChannels] = useState<MattermostTeam[]>([])

  const { data } = useQuery({
    queryKey: ['mattermostInfo'],
    queryFn: async () => {
      const response = await instance.get('/api/channels/my')
      return response.data
    },
  })

  useEffect(() => {
    if (data) setUserChannels(useSortingMattermostChannel(data))
  }, [data])

  return userChannels
}
