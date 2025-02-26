import { instance } from '@/shared/api'

import type { postUserSignupDataResponse } from './types'

export const postUserSignup = async (userId: number | null, data: postUserSignupDataResponse) => {
  const response = await instance.post(`/api/users/${userId}`, data).then((res) => res.data)
  return response
}

export const putUserNickname = async (name: string) => {
  const response = await instance.put(`/api/users/me`, { name })
  return response
}

export const postUserProfileImg = async (formData: FormData) => {
  const response = await instance.post(`/api/users/me/profileImg`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response
}

export const getUserSsoInfo = async (userId: number | null) => {
  const response = await instance.get(`/api/users/${userId}`).then((res) => res.data)
  return response
}
