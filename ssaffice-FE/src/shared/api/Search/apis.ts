import { instance } from '@/shared/api'

export const getSearchUserName = async (keyword: string) => {
  const response = await instance
    .post(`/api/es/users/search`, { keyword: keyword })
    .then((res) => res.data)
  return response
}
