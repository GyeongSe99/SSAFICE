import { instance } from '@/shared/api'
import type { postMmSyncBody } from './types'

export const postMmSync = async (data: postMmSyncBody, navigate: any) => {
  const response = await instance
    .post('/api/mm/login', data)
    .then(() => navigate('/main'))
    .catch((error) => {
      return { error: error.message }
    })

  return response
}
