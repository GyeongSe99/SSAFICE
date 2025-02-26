import { Pageable } from '@/shared/model'

export type MattermostChannel = {
  channelId: string
  name: string
}

export type MattermostTeam = {
  teamId: string
  name: string
  channels: MattermostChannel[]
}

export type SsafyUser = {
  // 유저 정보 조회 API 응답 그대로 작성
  userId: number
  email: string
  name: string
  cohortNum?: number // 프로의 경우에는 없음
  regionCd: 'SEOUL' | 'BU_UL_GYEONG' | 'DAEJEON' | 'GUMI' | 'GWANGJU'
  classNum?: number // 반
  trackCd?: 'NON_MAJOR_PYTHON' | 'NON_MAJOR_JAVA' | 'MAJOR_JAVA' | 'EMBEDDED' | 'MOBILE' | 'DATA'
  curriculumCd?: string // 공통/특화/자율
  disabledYn?: boolean // 비활성화 유저인가
  roles: {
    roleId?: 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_SYSADMIN'
    description: string
  }
  profileImage?: string
}

export type SsafyUserApiResponse = {
  content: SsafyUser[]
  pageable?: Pageable
  totalPages?: number
  totalElements?: number
}

export type CodeToWordTrackCdProps = {
  fieldName: 'trackCd'
  fieldValue: 'NON_MAJOR_PYTHON' | 'NON_MAJOR_JAVA' | 'MAJOR_JAVA' | 'EMBEDDED' | 'MOBILE' | 'DATA'
}

export type CodeToWordRegionCdProps = {
  fieldName: 'regionCd'
  fieldValue: 'SEOUL' | 'BU_UL_GYEONG' | 'DAEJEON' | 'GUMI' | 'GWANGJU'
}

export type CodeToWordProps = {
  field: CodeToWordTrackCdProps | CodeToWordRegionCdProps
}

export const codeToWord = (param: CodeToWordProps): string => {
  switch (param.field.fieldName) {
    case 'regionCd': {
      switch (param.field.fieldValue) {
        case 'BU_UL_GYEONG':
          return '부울경'
        case 'GUMI':
          return '구미'
        case 'DAEJEON':
          return '대전'
        case 'GWANGJU':
          return '광주'
        case 'SEOUL':
          return '서울'
      }
    }
    case 'trackCd': {
      switch (param.field.fieldValue) {
        case 'DATA':
          return '데이터'
        case 'EMBEDDED':
          return '임베디드'
        case 'MAJOR_JAVA':
          return '전공 자바'
        case 'MOBILE':
          return '모바일'
        case 'NON_MAJOR_JAVA':
          return '비전공 자바'
        case 'NON_MAJOR_PYTHON':
          return '비전공 파이썬'
      }
    }
  }
}

// MARK: DATAS
export const dummySsafyUsers: SsafyUserApiResponse[] = [
  {
    content: [
      {
        userId: 1,
        email: 'user1@ssafy.com',
        name: 'John Doe',
        regionCd: 'SEOUL', // 수정
        cohortNum: 11,
        classNum: 3,
        trackCd: 'MOBILE', // 대체
        roles: {
          roleId: 'ROLE_USER',
          description: '학생',
        },
      },
      {
        userId: 2,
        email: 'user2@ssafy.com',
        name: 'Jane Smith',
        regionCd: 'BU_UL_GYEONG', // 수정
        cohortNum: 12,
        classNum: 1,
        trackCd: 'DATA', // 대체
        roles: {
          roleId: 'ROLE_USER',
          description: '학생',
        },
      },
      {
        userId: 3,
        email: 'user3@ssafy.com',
        name: 'Michael Johnson',
        regionCd: 'GWANGJU', // 수정
        cohortNum: 11,
        classNum: 2,
        trackCd: 'NON_MAJOR_PYTHON', // 대체
        roles: {
          description: '프로',
        },
      },
      {
        userId: 4,
        email: 'user4@ssafy.com',
        name: 'Emily Davis',
        regionCd: 'SEOUL', // 수정
        cohortNum: 12,
        classNum: 5,
        trackCd: 'MAJOR_JAVA', // 대체
        roles: {
          description: '학생',
        },
      },
      {
        userId: 5,
        email: 'user5@ssafy.com',
        name: 'David Lee',
        regionCd: 'DAEJEON', // 수정
        cohortNum: 11,
        classNum: 6,
        trackCd: 'EMBEDDED', // 대체
        roles: {
          description: '프로',
        },
      },
      {
        userId: 6,
        email: 'user6@ssafy.com',
        name: 'Sophia Kim',
        regionCd: 'SEOUL', // 수정
        cohortNum: 12,
        classNum: 4,
        trackCd: 'DATA', // 대체
        roles: {
          description: '학생',
        },
      },
      {
        userId: 7,
        email: 'user7@ssafy.com',
        name: 'James Brown',
        regionCd: 'GUMI', // 수정
        cohortNum: 11,
        classNum: 7,
        trackCd: 'MOBILE', // 대체
        roles: {
          description: '학생',
        },
      },
      {
        userId: 8,
        email: 'user8@ssafy.com',
        name: 'Olivia Wilson',
        regionCd: 'BU_UL_GYEONG', // 수정
        cohortNum: 12,
        classNum: 8,
        trackCd: 'NON_MAJOR_JAVA', // 대체
        roles: {
          description: '프로',
        },
      },
      {
        userId: 9,
        email: 'user9@ssafy.com',
        name: 'Liam Taylor',
        regionCd: 'GWANGJU', // 수정
        cohortNum: 11,
        classNum: 9,
        trackCd: 'MAJOR_JAVA', // 대체
        roles: {
          description: '프로',
        },
      },
      {
        userId: 10,
        email: 'user10@ssafy.com',
        name: 'Isabella Moore',
        regionCd: 'SEOUL', // 수정
        cohortNum: 12,
        classNum: 5,
        trackCd: 'DATA', // 대체
        roles: {
          description: '학생',
        },
      },
    ],
    pageable: {
      sort: {
        sorted: true,
        unsorted: false,
        empty: false,
      },
      pageNumber: 0,
      pageSize: 10,
      offset: 0,
      paged: true,
      unpaged: false,
    },
    totalPages: 4,
    totalElements: 35,
  },
  {
    content: [
      {
        userId: 11,
        email: 'user11@ssafy.com',
        name: 'Ethan Anderson',
        regionCd: 'DAEJEON', // 수정
        cohortNum: 11,
        classNum: 2,
        trackCd: 'NON_MAJOR_PYTHON', // 대체
        roles: {
          description: '학생',
        },
      },
      {
        userId: 12,
        email: 'user12@ssafy.com',
        name: 'Ava Thomas',
        regionCd: 'GUMI', // 수정
        cohortNum: 12,
        classNum: 1,
        trackCd: 'EMBEDDED', // 대체
        roles: {
          description: '프로',
        },
      },
      {
        userId: 13,
        email: 'user13@ssafy.com',
        name: 'Mason Jackson',
        regionCd: 'SEOUL', // 수정
        cohortNum: 11,
        classNum: 6,
        trackCd: 'MOBILE', // 대체
        roles: {
          description: '학생',
        },
      },
      {
        userId: 14,
        email: 'user14@ssafy.com',
        name: 'Charlotte Harris',
        regionCd: 'BU_UL_GYEONG', // 수정
        cohortNum: 12,
        classNum: 7,
        trackCd: 'MAJOR_JAVA', // 대체
        roles: {
          description: '프로',
        },
      },
      {
        userId: 15,
        email: 'user15@ssafy.com',
        name: 'Amelia Clark',
        regionCd: 'GWANGJU', // 수정
        cohortNum: 11,
        classNum: 8,
        trackCd: 'DATA', // 대체
        roles: {
          description: '학생',
        },
      },
      {
        userId: 16,
        email: 'user16@ssafy.com',
        name: 'Benjamin Lewis',
        regionCd: 'SEOUL', // 수정
        cohortNum: 12,
        classNum: 4,
        trackCd: 'NON_MAJOR_JAVA', // 대체
        roles: {
          description: '프로',
        },
      },
      {
        userId: 17,
        email: 'user17@ssafy.com',
        name: 'Harper Young',
        regionCd: 'DAEJEON', // 수정
        cohortNum: 11,
        classNum: 4,
        trackCd: 'NON_MAJOR_PYTHON', // 대체
        roles: {
          description: '학생',
        },
      },
      {
        userId: 18,
        email: 'user18@ssafy.com',
        name: 'Jack Walker',
        regionCd: 'GUMI', // 수정
        cohortNum: 12,
        classNum: 3,
        trackCd: 'NON_MAJOR_JAVA', // 대체
        roles: {
          description: '프로',
        },
      },
      {
        userId: 19,
        email: 'user19@ssafy.com',
        name: 'Lily Perez',
        regionCd: 'GWANGJU', // 수정
        cohortNum: 11,
        classNum: 5,
        trackCd: 'MAJOR_JAVA', // 대체
        roles: {
          description: '학생',
        },
      },
      {
        userId: 20,
        email: 'user20@ssafy.com',
        name: 'Lucas Hall',
        regionCd: 'BU_UL_GYEONG', // 수정
        cohortNum: 12,
        classNum: 2,
        trackCd: 'MOBILE', // 대체
        roles: {
          description: '학생',
        },
      },
    ],
    pageable: {
      sort: {
        sorted: true,
        unsorted: false,
        empty: false,
      },
      pageNumber: 1,
      pageSize: 10,
      offset: 0,
      paged: true,
      unpaged: false,
    },
    totalPages: 4,
    totalElements: 35,
  },
  {
    content: [
      {
        userId: 21,
        email: 'user21@ssafy.com',
        name: 'Mila Allen',
        regionCd: 'SEOUL', // 수정
        cohortNum: 11,
        classNum: 6,
        trackCd: 'DATA', // 대체
        roles: {
          description: '프로',
        },
      },
      {
        userId: 22,
        email: 'user22@ssafy.com',
        name: 'Oliver Scott',
        regionCd: 'DAEJEON', // 수정
        cohortNum: 12,
        classNum: 8,
        trackCd: 'EMBEDDED', // 대체
        roles: {
          description: '학생',
        },
      },
      {
        userId: 23,
        email: 'user23@ssafy.com',
        name: 'Emma King',
        regionCd: 'GWANGJU', // 수정
        cohortNum: 11,
        classNum: 7,
        trackCd: 'MOBILE', // 대체
        roles: {
          description: '학생',
        },
      },
      {
        userId: 24,
        email: 'user24@ssafy.com',
        name: 'Henry Wright',
        regionCd: 'SEOUL', // 수정
        cohortNum: 12,
        classNum: 9,
        trackCd: 'NON_MAJOR_PYTHON', // 대체
        roles: {
          description: '프로',
        },
      },
      {
        userId: 25,
        email: 'user25@ssafy.com',
        name: 'Evelyn Lee',
        regionCd: 'BU_UL_GYEONG', // 수정
        cohortNum: 11,
        classNum: 2,
        trackCd: 'MAJOR_JAVA', // 대체
        roles: {
          description: '학생',
        },
      },
      {
        userId: 26,
        email: 'user26@ssafy.com',
        name: 'James Harris',
        regionCd: 'DAEJEON', // 수정
        cohortNum: 12,
        classNum: 3,
        trackCd: 'DATA', // 대체
        roles: {
          description: '학생',
        },
      },
      {
        userId: 27,
        email: 'user27@ssafy.com',
        name: 'Maddison Clark',
        regionCd: 'GWANGJU', // 수정
        cohortNum: 11,
        classNum: 6,
        trackCd: 'MAJOR_JAVA', // 대체
        roles: {
          description: '프로',
        },
      },
      {
        userId: 28,
        email: 'user28@ssafy.com',
        name: 'Alexander Turner',
        regionCd: 'SEOUL', // 수정
        cohortNum: 12,
        classNum: 1,
        trackCd: 'MAJOR_JAVA', // 대체
        roles: {
          description: '학생',
        },
      },
      {
        userId: 29,
        email: 'user29@ssafy.com',
        name: 'Zoe Carter',
        regionCd: 'BU_UL_GYEONG', // 수정
        cohortNum: 11,
        classNum: 7,
        trackCd: 'MAJOR_JAVA', // 대체
        roles: {
          description: '프로',
        },
      },
      {
        userId: 30,
        email: 'user30@ssafy.com',
        name: 'Leo Perez',
        regionCd: 'DAEJEON', // 수정
        cohortNum: 12,
        classNum: 4,
        trackCd: 'MAJOR_JAVA', // 대체
        roles: {
          description: '학생',
        },
      },
    ],
    pageable: {
      sort: {
        sorted: true,
        unsorted: false,
        empty: false,
      },
      pageNumber: 2,
      pageSize: 10,
      offset: 0,
      paged: true,
      unpaged: false,
    },
    totalPages: 4,
    totalElements: 35,
  },
  {
    content: [
      {
        userId: 31,
        email: 'user31@ssafy.com',
        name: 'Chloe Evans',
        regionCd: 'SEOUL', // 수정
        cohortNum: 11,
        classNum: 9,
        trackCd: 'MAJOR_JAVA', // 대체
        roles: {
          description: '프로',
        },
      },
      {
        userId: 32,
        email: 'user32@ssafy.com',
        name: 'Sebastian Edwards',
        regionCd: 'GWANGJU', // 수정
        cohortNum: 12,
        classNum: 5,
        trackCd: 'MAJOR_JAVA', // 대체
        roles: {
          description: '학생',
        },
      },
      {
        userId: 33,
        email: 'user33@ssafy.com',
        name: 'Luna Collins',
        regionCd: 'DAEJEON', // 수정
        cohortNum: 11,
        classNum: 2,
        trackCd: 'MAJOR_JAVA', // 대체
        roles: {
          description: '프로',
        },
      },
      {
        userId: 34,
        email: 'user34@ssafy.com',
        name: 'Aiden Morris',
        regionCd: 'BU_UL_GYEONG', // 수정
        cohortNum: 12,
        classNum: 8,
        trackCd: 'MAJOR_JAVA', // 대체
        roles: {
          description: '학생',
        },
      },
      {
        userId: 35,
        email: 'user35@ssafy.com',
        name: 'Madeline Murphy',
        regionCd: 'SEOUL', // 수정
        cohortNum: 11,
        classNum: 4,
        trackCd: 'MAJOR_JAVA', // 대체
        roles: {
          description: '학생',
        },
      },
    ],
    pageable: {
      sort: {
        sorted: true,
        unsorted: false,
        empty: false,
      },
      pageNumber: 3,
      pageSize: 10,
      offset: 0,
      paged: true,
      unpaged: false,
    },
    totalPages: 4,
    totalElements: 35,
  },
]
export const dummyMattermostTeams: MattermostTeam[] = [
  {
    teamId: 123456789 + '',
    name: '11기 서울 8반',
    channels: [
      {
        channelId: 22022021 + '',
        name: '공지사항',
      },
      {
        channelId: 33233212 + '',
        name: '소통',
      },
      {
        channelId: 44545454 + '',
        name: '강의 공유',
      },
    ],
  },
  {
    teamId: 456789456789 + '',
    name: '11기 공통 서울 1반',
    channels: [
      {
        channelId: 456789123456 + '',
        name: '공지사항',
      },
      {
        channelId: 789456123 + '',
        name: '잡담',
      },
      {
        channelId: 784545 + '',
        name: 'A108',
      },
      {
        channelId: 456789456123 + '',
        name: 'A108(비공식)',
      },
    ],
  },
  {
    teamId: 789456789456 + '',
    name: '11기 특화 서울 4반',
    channels: [
      {
        channelId: 78945 + '',
        name: '공지사항',
      },
      {
        channelId: 456789 + '',
        name: '서울 4반 이벤트',
      },
      {
        channelId: 7878 + '',
        name: 'A401',
      },
      {
        channelId: 45645789 + '',
        name: 'A401(비공식)',
      },
    ],
  },
  {
    teamId: 456789456 + '',
    name: '11기 자율 서울 6반',
    channels: [
      {
        channelId: 1 + '',
        name: '공지사항',
      },
      {
        channelId: 2 + '',
        name: '잡담',
      },
      {
        channelId: 3 + '',
        name: 'A605',
      },
      {
        channelId: 4 + '',
        name: 'A605(은밀한 대화)',
      },
      {
        channelId: 5 + '',
        name: 'A605_FE',
      },
      {
        channelId: 6 + '',
        name: '강의 교보재 신청',
      },
    ],
  },
]
