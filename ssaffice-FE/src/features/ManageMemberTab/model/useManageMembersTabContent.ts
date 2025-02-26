import { useEffect, useState } from 'react'
import { MattermostChannel, SsafyUser, SsafyUserApiResponse } from './types'
import { Pagenation } from '@/shared/model'
import { instance } from '@/shared/api'

export const useManageMembersTabContent = (channel: MattermostChannel) => {
  const [userInChannelList, setUserInChannelList] = useState<SsafyUser[]>([])
  const [selectedUserInChannelList, setSelectedUserInChannelList] = useState<SsafyUser[]>([])
  const [selectedAll, setSelectedAll] = useState(false)
  const [pageInfo, setPageInfo] = useState<Pagenation | null>(null)

  const fetchAPI = async (
    channelId: string,
    pageNumber?: number,
  ): Promise<SsafyUserApiResponse> => {
    const response = await instance.get(
      `api/users/admin?channelId=${channelId}&page=${pageNumber === undefined ? 0 : pageNumber}&size=10&sort=name,asc`,
    )
    return response.data
  }

  const fetchUserInChannelList = async (pageNumber?: number) => {
    await fetchAPI(channel.channelId, pageNumber).then((res) => {
      setUserInChannelList(res.content)
      if (res.pageable && res.totalPages !== undefined && res.totalElements !== undefined)
        setPageInfo({
          pageNumber: res?.pageable?.pageNumber,
          pageSize: res?.pageable?.pageSize,
          totalPages: res?.totalPages,
          totalElements: res?.totalElements,
        })
    })
  }

  useEffect(() => {
    fetchUserInChannelList()
  }, [channel.channelId])

  const handleSelectedUserInChannelList = (user: SsafyUser, checked: boolean) => {
    checked
      ? setSelectedUserInChannelList((prev) => [...prev, user])
      : setSelectedUserInChannelList(
          selectedUserInChannelList.filter((each) => each.userId !== user.userId),
        )
  }

  const handleSelectedAllUserInChannelList = (checked: boolean) => {
    if (checked) {
      setSelectedAll(true)
      setSelectedUserInChannelList(userInChannelList)
    } else {
      setSelectedAll(false)
      setSelectedUserInChannelList([])
    }
  }

  return {
    userInChannelList,
    selectedUserInChannelList,
    handleSelectedUserInChannelList,
    handleSelectedAllUserInChannelList,
    selectedAll,
    pageInfo,
    fetchUserInChannelList,
  }
}
