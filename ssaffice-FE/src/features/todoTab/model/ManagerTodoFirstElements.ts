import { useLoginStateStore } from '@/entities/session'
import { instance } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'

// 관리자 개별 할일 등록
export const ManagerTodoFirstElements = (modaltype: 'CREATE' | 'VIEW' | 'EDIT') => {
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
        user: { name: '', profileImgUrl: '' },

        createUser: {
          name: user?.name,
          profileImgUrl: user?.profileImgUrl,
        },
        endDate: '',
        remindRequests: [],
        isEssentialYn: 'Y',
      }
    case 'VIEW':
      return {
        title: '조회하거라',
        description: '조회하거라',
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
        isEssentialYn: 'N',
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
        isEssentialYn: 'N',
      }
  }
}
