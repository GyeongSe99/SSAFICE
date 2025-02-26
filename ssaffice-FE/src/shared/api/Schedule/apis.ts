import { instance } from '@/shared/api'
import { postScheduleResponse, putTraineeScheduleResponse } from './types'

export const getTraineeScheduleList = async (filterType: string, start: string, end: string) => {
  return await instance
    .get(`/api/schedules/my?sort=${filterType},desc`, {
      params: { filterType, start, end },
    })
    .then((res) => res.data)
}

export const getTraineeScheduleDetail = async (scheduleId: number) => {
  return await instance.get(`/api/schedules/${scheduleId}`).then((res) => res.data)
}

export const postEasyTraineeSchedule = async (
  title: string,
  startDateTime: string,
  endDateTime: string,
  status: string,
) => {
  await instance.post('/api/schedules', {
    title,
    memo: '',
    startDateTime,
    endDateTime,
    scheduleStatusTypeCd: status === 'default' ? 'TODO' : status,
    scheduleSourceTypeCd: 'PERSONAL',
  })
}

export const postTraineeSchedule = async (data: postScheduleResponse) => {
  const response = await instance.post(`/api/schedules`, data).then((res) => res.data)
  return response
}

export const postManagerSchedule = async ({ createData, userIds }: any) => {
  const response = await instance
    .post(`/api/schedules/admin`, { scheduleRequest: createData, userIds })
    .then((res) => res.data)
  return response
}

export const postManagerTeamSchedule = async (createData: any) => {
  const formData = new FormData()
  formData.append('noticeRequest', JSON.stringify(createData))

  const response = await instance.post('/api/notice/admin', formData).then((res) => res.data)

  return response
}

export const putTraineeSchedule = async (scheduleId: number, data: putTraineeScheduleResponse) => {
  return await instance.put(`/api/schedules/${scheduleId}`, data).then((res) => res.data)
}
