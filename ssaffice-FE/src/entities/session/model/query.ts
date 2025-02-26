import { useQuery } from '@tanstack/react-query'
import { getUserSsoInfo } from '@/shared/api/User'

export const useUserSsoInfo = (userId: number | null) => {
  return useQuery({
    queryKey: ['userSsoInfo', userId],
    queryFn: () => getUserSsoInfo(userId),
  })
}
