import { useQuery } from '@tanstack/react-query'
import { getSearchUserName } from '@/shared/api/Search'

export const useSearchUserName = (keyword: string) => {
  return useQuery({
    queryKey: ['searchUserName', keyword],
    queryFn: () => getSearchUserName(keyword),
  })
}
