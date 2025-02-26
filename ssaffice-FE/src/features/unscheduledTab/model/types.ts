import type { ScheduleItemDisplay, UnScheduledDisplay } from '@/features/todoTab'

export type UnscheduledListDisplay = Record<string, UnScheduledDisplay[]>
// 날짜로 묶은 미등록 공지 items. 직관적으로 알아볼 수 있도록 이름만 바꾸었습니다

// 더미 데이터 배열입니다.
// MARK: datas
export const dummyUnschedules: ScheduleItemDisplay[] = [
  {
    todo: {
      scheduleId: 1,
      title: '프로젝트 미팅',
      startDateTime: new Date('2024-11-15T10:00:00'),
      endDateTime: new Date('2024-11-15T11:00:00'),
      scheduleSourceTypeCd: 'TEAM',
      scheduleStatusTypeCd: 'IN_PROGRESS',
      createUser: {
        userId: 101,
        email: 'alice@example.com',
        name: '안인석(교육프로)',
      },
    },
    announcement: {
      user: {
        userId: 101,
        email: 'alice@example.com',
        name: '안인석(교육프로)',
        profileImgUrl: 'https://picsum.photos/id/38/400/400',
      },
      createdAt: new Date('2024-11-10T09:00:00'),
      title: '자율PJT 영상 포트폴리오 담당자 설문제출 안내',
      content: `[자율PJT 영상 포트폴리오 담당자 설문제출 안내]
자율PJT 영상 포트폴리오 경진대회가 진행됩니다.
이에 따라 팀별 영상 포트폴리오 담당자를 선정해 주시기 바랍니다!

영상 포트폴리오는 각 팀별로 개발한 프로젝트를 영상화함으로써, 
개발물에 대한 정리와 더불어 여러분의 소중한 포트폴리오가 될 수 있습니다. :breeze_flower: 

흥미 있는 영상 포트폴리오는 최종평가 발표 때  :tv:
청중이 우리 프로젝트에 대해 집중할 수 있도록 도움을 주죠! 
때문에 개발물만큼이나 중요하다는 사실!!

우리팀의 영상 포트폴리오를 작업해줄 영상 포트폴리오 담당자 1명을 선정하여
  :low_brightness: 각 팀 팀장님이!!!  :low_brightness: 기한 내 설문을 제출해주시기 바랍니다.
(UCC제작을 위한 영상편집 프로그램은 담당자 취합 후 배포 예정)

  :small_orange_diamond: 제출대상: 각 팀 팀장
  :small_orange_diamond: 제출방법: 에듀싸피-설문조사-11기 자율PJT 영상 포트폴리오 담당자 설문
  :small_orange_diamond: 제출기한: 11/8(금) 12시까지
  `,
      noticeId: 1,
    },
  },
  {
    todo: {
      scheduleId: 2,
      title: '밥과 점심',
      startDateTime: new Date('2024-11-16T12:00:00'),
      endDateTime: new Date('2024-11-16T13:00:00'),
      scheduleSourceTypeCd: 'PERSONAL',
      scheduleStatusTypeCd: 'TODO',
      createUser: {
        userId: 102,
        email: 'bob@example.com',
        name: 'Bob Lee',
      },
    },
    announcement: {
      user: {
        userId: 102,
        email: 'bob@example.com',
        name: '김싸피(교육프로)',
        profileImgUrl: 'https://picsum.photos/id/39/400/400',
      },
      createdAt: new Date('2024-11-10T12:00:00'),
      title: 'SSAFY 청년멘토링 시청',
      content: `[SSAFY 청년멘토링 시청의 건]
내일 SSAFY 교육생 대상으로 청년멘토링이 서울캠퍼스 18층에서 15시부터 진행됩니다.
18층 현장참여 교육생 외 교육생과 지역캠퍼스 교육생은 라이브방송을 통해 시청 및 참여가 가능합니다. :slightly_smiling_face:

11기 교육생은 자율프로젝트 마지막 주차를 앞두고 바쁠 듯 하여, 학사커리큘럼에 반영하지는 않았습니다만
선택 시청을 할 수 있도록 강의장 내 라이브 방송을 오픈할 예정입니다. :breeze_flower: 
해당 시간대 시청을 원하는 교육생을 위해, 강의장 내 정숙을 당부드립니다.

아울러, 원활한 행사진행을 위해 서울캠퍼스는 아래 시간동안 층간이동이 금지(1층 포함)되오니 유의부탁드립니다. :pray: 
  :pushpin: 12일 화요일 14시 20분 - 16시 30분 (약 2시간)
  `,
      noticeId: 2,
    },
  },
  {
    todo: {
      scheduleId: 3,
      title: '최종 팀미팅을 신청해 주세요!',
      startDateTime: new Date('2024-11-18T14:00:00'),
      endDateTime: new Date('2024-11-18T16:00:00'),
      scheduleSourceTypeCd: 'TEAM', // 팀 일정
      scheduleStatusTypeCd: 'TODO', // 해야 할 일
      createUser: {
        userId: 103,
        email: 'carol@example.com',
        name: 'Carol Smith',
      },
    },
    announcement: {
      user: {
        userId: 103,
        email: 'carol@example.com',
        name: '정싸피(컨설턴트)',
        profileImgUrl: 'https://picsum.photos/id/40/400/400',
      },
      createdAt: new Date('2024-11-12T10:00:00'),
      title: '최종 팀미팅을 신청해 주세요!',
      content: '브레인스토밍 세션은 11월 18일 오후 2시에 진행됩니다.',
      noticeId: 3,
    },
  },
  {
    todo: {
      scheduleId: 4,
      title: '병원 예약',
      startDateTime: new Date('2024-11-19T09:30:00'),
      endDateTime: new Date('2024-11-19T10:00:00'),
      scheduleSourceTypeCd: 'PERSONAL', // 개인 일정
      scheduleStatusTypeCd: 'TODO', // 해야 할 일
      createUser: {
        userId: 104,
        email: 'david@example.com',
        name: 'David Wang',
      },
    },
    announcement: {
      user: {
        userId: 104,
        email: 'david@example.com',
        name: 'David Wang',
      },
      createdAt: new Date('2024-11-14T15:00:00'),
      title: '병원 예약 알림',
      content: '11월 19일 오전 9시 30분에 병원 예약이 있습니다.',
      noticeId: 4,
    },
  },
  {
    todo: {
      scheduleId: 5,
      title: '이브와 코드 리뷰',
      startDateTime: new Date('2024-11-20T13:00:00'),
      endDateTime: new Date('2024-11-20T14:00:00'),
      scheduleSourceTypeCd: 'TEAM', // 팀 일정
      scheduleStatusTypeCd: 'TODO', // 해야 할 일
      createUser: {
        userId: 105,
        email: 'eve@example.com',
        name: 'Eve Adams',
      },
    },
    announcement: {
      user: {
        userId: 105,
        email: 'eve@example.com',
        name: 'Eve Adams',
      },
      createdAt: new Date('2024-11-13T11:30:00'),
      title: '코드 리뷰 회의 안내',
      content: '이브와의 코드 리뷰 회의가 11월 20일 오후 1시에 예정되어 있습니다.',
      noticeId: 5,
    },
  },
  {
    todo: {
      scheduleId: 6,
      title: '월간 보고서 제출',
      startDateTime: new Date('2024-11-21T09:00:00'),
      endDateTime: new Date('2024-11-21T10:00:00'),
      scheduleSourceTypeCd: 'GLOBAL', // 전사 일정
      scheduleStatusTypeCd: 'TODO', // 해야 할 일
      createUser: {
        userId: 106,
        email: 'frank@example.com',
        name: 'Frank Miller',
      },
    },
    announcement: {
      user: {
        userId: 106,
        email: 'frank@example.com',
        name: 'Frank Miller',
      },
      createdAt: new Date('2024-11-15T08:00:00'),
      title: '월간 보고서 제출 안내',
      content: '11월 21일까지 월간 보고서를 제출해 주시기 바랍니다.',
      noticeId: 6,
    },
  },
  {
    todo: {
      scheduleId: 7,
      title: '팀 회식',
      startDateTime: new Date('2024-11-22T18:30:00'),
      endDateTime: new Date('2024-11-22T21:00:00'),
      scheduleSourceTypeCd: 'TEAM', // 팀 일정
      scheduleStatusTypeCd: 'TODO', // 해야 할 일
      createUser: {
        userId: 107,
        email: 'grace@example.com',
        name: 'Grace Lee',
      },
    },
    announcement: {
      user: {
        userId: 107,
        email: 'grace@example.com',
        name: 'Grace Lee',
      },
      createdAt: new Date('2024-11-16T14:30:00'),
      title: '팀 회식 안내',
      content: '11월 22일 오후 6시 30분에 팀 회식이 있습니다. 참석 부탁드립니다.',
      noticeId: 7,
    },
  },
  {
    todo: {
      scheduleId: 8,
      title: '정기 점검',
      startDateTime: new Date('2024-11-23T08:00:00'),
      endDateTime: new Date('2024-11-23T12:00:00'),
      scheduleSourceTypeCd: 'GLOBAL', // 전사 일정
      scheduleStatusTypeCd: 'TODO', // 해야 할 일
      createUser: {
        userId: 108,
        email: 'hannah@example.com',
        name: 'Hannah Scott',
      },
    },
    announcement: {
      user: {
        userId: 108,
        email: 'hannah@example.com',
        name: 'Hannah Scott',
      },
      createdAt: new Date('2024-11-17T10:00:00'),
      title: '정기 점검 공지',
      content: '11월 23일 오전 8시부터 정기 점검이 진행됩니다. 불편을 드려 죄송합니다.',
      noticeId: 8,
    },
  },
  {
    todo: {
      scheduleId: 9,
      title: '오픈 소스 기여 회의',
      startDateTime: new Date('2024-11-24T15:00:00'),
      endDateTime: new Date('2024-11-24T16:00:00'),
      scheduleSourceTypeCd: 'TEAM', // 팀 일정
      scheduleStatusTypeCd: 'TODO', // 해야 할 일
      createUser: {
        userId: 109,
        email: 'ian@example.com',
        name: 'Ian Thomas',
      },
    },
    announcement: {
      user: {
        userId: 109,
        email: 'ian@example.com',
        name: 'Ian Thomas',
      },
      createdAt: new Date('2024-11-18T11:30:00'),
      title: '오픈 소스 기여 회의 안내',
      content: '11월 24일 오후 3시 오픈 소스 기여 회의가 있습니다. 많은 참여 부탁드립니다.',
      noticeId: 9,
    },
  },
  {
    todo: {
      scheduleId: 10,
      title: '헬스장 트레이닝',
      startDateTime: new Date('2024-11-25T07:00:00'),
      endDateTime: new Date('2024-11-25T08:00:00'),
      scheduleSourceTypeCd: 'PERSONAL', // 개인 일정
      scheduleStatusTypeCd: 'TODO', // 해야 할 일
      createUser: {
        userId: 110,
        email: 'jackson@example.com',
        name: 'Jackson Brooks',
      },
    },
    announcement: {
      user: {
        userId: 110,
        email: 'jackson@example.com',
        name: 'Jackson Brooks',
      },
      createdAt: new Date('2024-11-19T13:00:00'),
      title: '헬스장 트레이닝 알림',
      content: '11월 25일 오전 7시에 트레이닝 세션이 예정되어 있습니다. 준비해 주세요.',
      noticeId: 10,
    },
  },
  {
    todo: {
      scheduleId: 11,
      title: '웹사이트 업데이트 예정',
      startDateTime: new Date('2024-11-26T10:00:00'),
      endDateTime: new Date('2024-11-26T11:00:00'),
      scheduleSourceTypeCd: 'GLOBAL', // 전사 일정
      scheduleStatusTypeCd: 'TODO', // 해야 할 일
      createUser: {
        userId: 111,
        email: 'karen@example.com',
        name: 'Karen Wilson',
      },
    },
    announcement: {
      user: {
        userId: 111,
        email: 'karen@example.com',
        name: 'Karen Wilson',
      },
      createdAt: new Date('2024-11-20T08:00:00'),
      title: '웹사이트 업데이트 공지',
      content:
        '11월 26일 오전 10시부터 웹사이트 업데이트가 진행됩니다. 서비스 이용에 차질이 있을 수 있습니다.',
      noticeId: 11,
    },
  },
  {
    todo: {
      scheduleId: 12,
      title: '영어 회화 클래스',
      startDateTime: new Date('2024-11-27T17:00:00'),
      endDateTime: new Date('2024-11-27T18:00:00'),
      scheduleSourceTypeCd: 'PERSONAL', // 개인 일정
      scheduleStatusTypeCd: 'TODO', // 해야 할 일
      createUser: {
        userId: 112,
        email: 'lily@example.com',
        name: 'Lily Green',
      },
    },
    announcement: {
      user: {
        userId: 112,
        email: 'lily@example.com',
        name: 'Lily Green',
      },
      createdAt: new Date('2024-11-21T14:00:00'),
      title: '영어 회화 클래스 안내',
      content: '11월 27일 오후 5시부터 영어 회화 클래스가 시작됩니다.',
      noticeId: 12,
    },
  },
  {
    todo: {
      scheduleId: 13,
      title: '회의 준비',
      startDateTime: new Date('2024-11-28T08:30:00'),
      endDateTime: new Date('2024-11-28T09:00:00'),
      scheduleSourceTypeCd: 'GLOBAL', // 전사 일정
      scheduleStatusTypeCd: 'TODO', // 해야 할 일
      createUser: {
        userId: 113,
        email: 'michael@example.com',
        name: 'Michael Scott',
      },
    },
    announcement: {
      user: {
        userId: 113,
        email: 'michael@example.com',
        name: 'Michael Scott',
      },
      createdAt: new Date('2024-11-22T09:00:00'),
      title: '회의 준비 안내',
      content: '11월 28일 오전 8시 30분 회의 준비가 필요합니다.',
      noticeId: 13,
    },
  },
  {
    todo: {
      scheduleId: 14,
      title: '소셜 미디어 홍보',
      startDateTime: new Date('2024-11-29T10:00:00'),
      endDateTime: new Date('2024-11-29T11:00:00'),
      scheduleSourceTypeCd: 'TEAM', // 팀 일정
      scheduleStatusTypeCd: 'TODO', // 해야 할 일
      createUser: {
        userId: 114,
        email: 'nancy@example.com',
        name: 'Nancy Davis',
      },
    },
    announcement: {
      user: {
        userId: 114,
        email: 'nancy@example.com',
        name: 'Nancy Davis',
      },
      createdAt: new Date('2024-11-23T10:30:00'),
      title: '소셜 미디어 홍보 일정 안내',
      content: '11월 29일 오전 10시에 소셜 미디어 홍보 활동이 예정되어 있습니다.',
      noticeId: 14,
    },
  },
  {
    todo: {
      scheduleId: 15,
      title: '기술 워크숍',
      startDateTime: new Date('2024-11-30T13:00:00'),
      endDateTime: new Date('2024-11-30T16:00:00'),
      scheduleSourceTypeCd: 'PERSONAL', // 개인 일정
      scheduleStatusTypeCd: 'TODO', // 해야 할 일
      createUser: {
        userId: 115,
        email: 'olivia@example.com',
        name: 'Olivia Turner',
      },
    },
    announcement: {
      user: {
        userId: 115,
        email: 'olivia@example.com',
        name: 'Olivia Turner',
      },
      createdAt: new Date('2024-11-24T13:00:00'),
      title: '기술 워크숍 안내',
      content:
        '11월 30일 오후 1시에 기술 워크숍이 시작됩니다. 참여를 원하시는 분들은 사전 등록 바랍니다.',
      noticeId: 15,
    },
  },
]
