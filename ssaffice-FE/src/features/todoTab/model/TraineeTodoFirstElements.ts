import { useLoginStateStore } from '@/entities/session'
import { useTraineeScheduleDetail } from '@/entities/todoTab'
import { instance } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'

type TraineeTodoFirstElementsProps = {
  modaltype: 'CREATE' | 'VIEW' | 'EDIT'
  scheduleId: number
}

export const TraineeTodoFirstElements = ({
  modaltype,
  scheduleId,
}: TraineeTodoFirstElementsProps) => {
  const isAuthenticated = useLoginStateStore()

  const { data: user } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const { data } = await instance.get('/api/users/me')
      return data
    },
    enabled: isAuthenticated,
  })

  switch (modaltype) {
    case 'CREATE':
      return {
        title: '',
        description: '',
        selectedState: 'TODO',
        user: {
          name: user?.name,
          profileImgUrl: user?.profileImgUrl,
        },
        createUser: {
          name: user?.name,
          profileImgUrl: user?.profileImgUrl,
        },
        endDate: '',
        remindRequests: [],
      }
    case 'VIEW':
      const { data: detail } = useTraineeScheduleDetail(scheduleId)

      const remindList = Array.isArray(detail?.remindSummarys)
        ? detail.remindSummarys.map((remind: any) => {
            return {
              remindTypeCd: remind.remindTypeCd,
              remindDateTime: remind.remindDateTime,
            }
          })
        : []

      return {
        title: detail?.title,
        description: detail?.memo,
        selectedState: detail?.scheduleStatusTypeCd,
        user: {
          name: detail?.chargeUser?.name,
          profileImgUrl: detail?.chargeUser?.profileImgUrl,
        },
        createUser: {
          name: detail?.createUser?.name,
          profileImgUrl: detail?.createUser?.profileImgUrl,
        },
        endDate: detail?.endDateTime ? detail?.endDateTime.split('T')[0] : '-',
        remindRequests: [...remindList],
      }
    case 'EDIT':
      return {
        title: '수정하거라',
        description: '수정하거라',
        selectedState: 'progress',
        user: {
          name: '곽성재(교육생)',
          profileImgUrl: 'https://i.pinimg.com/564x/4d/b2/42/4db2422c74f12f70391ec386bf95e4db.jpg',
        },
        createUser: {
          name: '용상윤[서울_5, 6반]실습코치',
          profileImgUrl: 'https://i.pinimg.com/236x/a5/73/59/a5735920142505068fd1e5ebd0ce86f1.jpg',
        },
        endDate: '2024-11-19',
        remindRequests: [{ remindtype: 'DAILY', remindDateTime: '1999-09-22T11:00:00' }],
      }
  }
}
