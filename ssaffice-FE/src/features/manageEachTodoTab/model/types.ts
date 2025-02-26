import { AnnouncementItemDisplay, createUser } from '@/features/announcementTab'

export type ScheduleSummaries = {
  scheduleId: number
  title: string
  createdAt: string
  startDateTime?: string
  endDateTime?: string
  scheduleSourceTypeCd?: 'GLOBAL' | 'TEAM' | 'PERSONAL' | 'ASSIGNED'
  scheduleStatusTypeCd: 'TODO' | 'IN_PROGRESS' | 'DONE'
  isEssentialYn: 'Y' | 'N'
  isEnrollYn: 'Y' | 'N'
  chargeUser: createUser
  createUser: createUser
  noticeSummary: AnnouncementItemDisplay
}
export type EachTodoItemDisplay = {
  scheduleSummaries: ScheduleSummaries[]
  scheduleEnrolledCount: {
    completedCount: number
    enrolledCount: number
  }
  scheduleStatusCount?: number
}

export type EachTodoListDisplay = Record<string, ScheduleSummaries[]>

// MARK: DATAS
// export const dummyEachTodos: EachTodoItemDisplay[] = [
//   {
//     scheduleSummaries: {
//       scheduleId: 1,
//       title: '개발팀 주간 회의',
//       createdAt: new Date('2024-11-20T09:00:00'),
//       startDateTime: new Date('2024-11-20T10:00:00'),
//       endDateTime: new Date('2024-11-20T11:00:00'),
//       scheduleSourceTypeCd: 'TEAM',
//       scheduleStatusTypeCd: 'TODO',
//       isEssentialYn: 'Y',
//       isEnrollYn: 'Y',
//       chargeUser: {
//         userId: 1,
//         name: '김철수',
//         email: 'kim@example.com',
//         profileImgUrl: 'https://example.com/images/kim-profile.jpg',
//       },
//       createUser: {
//         userId: 2,
//         name: '박영희',
//         email: 'park@example.com',
//       },
//       noticeSummary: {
//         user: {
//           userId: 3,
//           name: '이민호',
//           email: 'lee@example.com',
//         },
//         createdAt: new Date('2024-11-19T16:00:00'),
//         title: '개발팀 주간 회의 일정 안내',
//         content: '개발팀의 주간 회의가 2024년 11월 20일 오전 10시에 진행됩니다.',
//         noticeId: 1,
//         isEssential: true,
//         noticeTypeCd: 'MEETING',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 8,
//       enrolledCount: 10,
//     },
//   },
//   {
//     scheduleSummaries: {
//       scheduleId: 2,
//       title: '프로젝트 검토 회의',
//       createdAt: new Date('2024-11-21T10:00:00'),
//       startDateTime: new Date('2024-11-21T14:00:00'),
//       endDateTime: new Date('2024-11-21T15:00:00'),
//       scheduleSourceTypeCd: 'PERSONAL',
//       scheduleStatusTypeCd: 'DONE',
//       isEssentialYn: 'Y',
//       isEnrollYn: 'Y',
//       chargeUser: {
//         userId: 4,
//         name: '정하늘',
//         email: 'jung@example.com',
//         profileImgUrl: 'https://example.com/images/jung-profile.jpg',
//       },
//       createUser: {
//         userId: 5,
//         name: '최영수',
//         email: 'choi@example.com',
//       },
//       noticeSummary: {
//         user: {
//           userId: 6,
//           name: '김소정',
//           email: 'kimsojeong@example.com',
//         },
//         createdAt: new Date('2024-11-20T17:00:00'),
//         title: '프로젝트 검토 회의 일정',
//         content: '프로젝트 검토 회의가 2024년 11월 21일 오후 2시에 진행됩니다.',
//         noticeId: 2,
//         isEssential: false,
//         noticeTypeCd: 'MEETING',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 5,
//       enrolledCount: 8,
//     },
//   },
//   {
//     scheduleSummaries: {
//       scheduleId: 3,
//       title: '팀 빌딩 워크숍',
//       createdAt: new Date('2024-11-22T12:00:00'),
//       startDateTime: new Date('2024-11-22T13:00:00'),
//       endDateTime: new Date('2024-11-22T14:30:00'),
//       scheduleSourceTypeCd: 'TEAM',
//       scheduleStatusTypeCd: 'TODO',
//       isEssentialYn: 'N',
//       isEnrollYn: 'Y',
//       chargeUser: {
//         userId: 7,
//         name: '홍길동',
//         email: 'hong@example.com',
//         profileImgUrl: 'https://example.com/images/hong-profile.jpg',
//       },
//       createUser: {
//         userId: 8,
//         name: '이서진',
//         email: 'lee@example.com',
//       },
//       noticeSummary: {
//         user: {
//           userId: 9,
//           name: '박준형',
//           email: 'parkjun@example.com',
//         },
//         createdAt: new Date('2024-11-21T18:00:00'),
//         title: '팀 빌딩 워크숍 공지',
//         content: '2024년 11월 22일 오후 1시에 팀 빌딩 워크숍이 진행됩니다.',
//         noticeId: 3,
//         isEssential: true,
//         noticeTypeCd: 'WORKSHOP',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 12,
//       enrolledCount: 15,
//     },
//   },
//   {
//     scheduleSummaries: {
//       scheduleId: 4,
//       title: '스프린트 회의',
//       createdAt: new Date('2024-11-23T08:30:00'),
//       startDateTime: new Date('2024-11-23T09:00:00'),
//       endDateTime: new Date('2024-11-23T10:00:00'),
//       scheduleSourceTypeCd: 'TEAM',
//       scheduleStatusTypeCd: 'DONE',
//       isEssentialYn: 'Y',
//       isEnrollYn: 'Y',
//       chargeUser: {
//         userId: 10,
//         name: '김유리',
//         email: 'kimyuri@example.com',
//         profileImgUrl: 'https://example.com/images/kimyuri-profile.jpg',
//       },
//       createUser: {
//         userId: 11,
//         name: '정윤희',
//         email: 'jeong@example.com',
//       },
//       noticeSummary: {
//         user: {
//           userId: 12,
//           name: '한지민',
//           email: 'han@example.com',
//         },
//         createdAt: new Date('2024-11-22T19:00:00'),
//         title: '스프린트 회의 완료',
//         content: '스프린트 회의가 2024년 11월 23일 오전 9시에 종료되었습니다.',
//         noticeId: 4,
//         isEssential: false,
//         noticeTypeCd: 'MEETING',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 10,
//       enrolledCount: 10,
//     },
//   },
//   {
//     scheduleSummaries: {
//       scheduleId: 5,
//       title: '기술 발표회',
//       createdAt: new Date('2024-11-24T11:00:00'),
//       startDateTime: new Date('2024-11-24T14:00:00'),
//       endDateTime: new Date('2024-11-24T16:00:00'),
//       scheduleSourceTypeCd: 'PERSONAL',
//       scheduleStatusTypeCd: 'TODO',
//       isEssentialYn: 'N',
//       isEnrollYn: 'Y',
//       chargeUser: {
//         userId: 13,
//         name: '윤상호',
//         email: 'yoon@example.com',
//         profileImgUrl: 'https://example.com/images/yoon-profile.jpg',
//       },
//       createUser: {
//         userId: 14,
//         name: '강태형',
//         email: 'kang@example.com',
//       },
//       noticeSummary: {
//         user: {
//           userId: 15,
//           name: '정하은',
//           email: 'jang@example.com',
//         },
//         createdAt: new Date('2024-11-23T20:00:00'),
//         title: '기술 발표회 공지',
//         content: '기술 발표회가 2024년 11월 24일 오후 2시에 시작됩니다.',
//         noticeId: 5,
//         isEssential: true,
//         noticeTypeCd: 'PRESENTATION',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 7,
//       enrolledCount: 12,
//     },
//   },
//   {
//     scheduleSummaries: {
//       scheduleId: 6,
//       title: '회의록 작성',
//       createdAt: new Date('2024-11-25T09:00:00'),
//       startDateTime: new Date('2024-11-25T10:00:00'),
//       endDateTime: new Date('2024-11-25T11:00:00'),
//       scheduleSourceTypeCd: 'TEAM',
//       scheduleStatusTypeCd: 'IN_PROGRESS',
//       isEssentialYn: 'Y',
//       isEnrollYn: 'Y',
//       chargeUser: {
//         userId: 16,
//         name: '이수민',
//         email: 'lee@example.com',
//         profileImgUrl: 'https://example.com/images/lee-profile.jpg',
//       },
//       createUser: {
//         userId: 17,
//         name: '김소정',
//         email: 'sojeong@example.com',
//       },
//       noticeSummary: {
//         user: {
//           userId: 18,
//           name: '정하은',
//           email: 'jang@example.com',
//         },
//         createdAt: new Date('2024-11-24T22:00:00'),
//         title: '회의록 작성 안내',
//         content: '2024년 11월 25일 오전 10시에 회의록 작성을 시작합니다.',
//         noticeId: 6,
//         isEssential: false,
//         noticeTypeCd: 'TASK',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 4,
//       enrolledCount: 6,
//     },
//   },
//   {
//     scheduleSummaries: {
//       scheduleId: 7,
//       title: '제품 디자인 회의',
//       createdAt: new Date('2024-11-25T11:00:00'),
//       startDateTime: new Date('2024-11-25T13:00:00'),
//       endDateTime: new Date('2024-11-25T15:00:00'),
//       scheduleSourceTypeCd: 'PERSONAL',
//       scheduleStatusTypeCd: 'DONE',
//       isEssentialYn: 'Y',
//       isEnrollYn: 'Y',
//       chargeUser: {
//         userId: 19,
//         name: '오정훈',
//         email: 'oh@example.com',
//         profileImgUrl: 'https://example.com/images/oh-profile.jpg',
//       },
//       createUser: {
//         userId: 20,
//         name: '박예진',
//         email: 'park@example.com',
//       },
//       noticeSummary: {
//         user: {
//           userId: 21,
//           name: '강준호',
//           email: 'kang@example.com',
//         },
//         createdAt: new Date('2024-11-24T23:00:00'),
//         title: '디자인 회의 완료',
//         content: '제품 디자인 회의가 2024년 11월 25일 오후 1시에 종료되었습니다.',
//         noticeId: 7,
//         isEssential: false,
//         noticeTypeCd: 'MEETING',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 8,
//       enrolledCount: 8,
//     },
//   },
//   {
//     scheduleSummaries: {
//       scheduleId: 8,
//       title: '신제품 출시 회의',
//       createdAt: new Date('2024-11-26T09:00:00'),
//       startDateTime: new Date('2024-11-26T11:00:00'),
//       endDateTime: new Date('2024-11-26T12:30:00'),
//       scheduleSourceTypeCd: 'TEAM',
//       scheduleStatusTypeCd: 'IN_PROGRESS',
//       isEssentialYn: 'N',
//       isEnrollYn: 'Y',
//       chargeUser: {
//         userId: 22,
//         name: '서지훈',
//         email: 'seo@example.com',
//         profileImgUrl: 'https://example.com/images/seo-profile.jpg',
//       },
//       createUser: {
//         userId: 23,
//         name: '최수영',
//         email: 'choi@example.com',
//       },
//       noticeSummary: {
//         user: {
//           userId: 24,
//           name: '이채윤',
//           email: 'lee@example.com',
//         },
//         createdAt: new Date('2024-11-25T10:00:00'),
//         title: '신제품 출시 회의 일정',
//         content: '신제품 출시 회의가 2024년 11월 26일 오전 11시에 진행됩니다.',
//         noticeId: 8,
//         isEssential: true,
//         noticeTypeCd: 'MEETING',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 3,
//       enrolledCount: 5,
//     },
//   },
//   {
//     scheduleSummaries: {
//       scheduleId: 9,
//       title: '마케팅 캠페인 전략 회의',
//       createdAt: new Date('2024-11-27T10:00:00'),
//       startDateTime: new Date('2024-11-27T14:00:00'),
//       endDateTime: new Date('2024-11-27T15:30:00'),
//       scheduleSourceTypeCd: 'PERSONAL',
//       scheduleStatusTypeCd: 'TODO',
//       isEssentialYn: 'N',
//       isEnrollYn: 'Y',
//       chargeUser: {
//         userId: 25,
//         name: '윤서현',
//         email: 'yoonseo@example.com',
//         profileImgUrl: 'https://example.com/images/yoonseo-profile.jpg',
//       },
//       createUser: {
//         userId: 26,
//         name: '고예지',
//         email: 'go@example.com',
//       },
//       noticeSummary: {
//         user: {
//           userId: 27,
//           name: '김준희',
//           email: 'kim@example.com',
//         },
//         createdAt: new Date('2024-11-26T18:00:00'),
//         title: '마케팅 캠페인 전략 회의',
//         content: '2024년 11월 27일 오후 2시에 마케팅 캠페인 전략 회의가 진행됩니다.',
//         noticeId: 9,
//         isEssential: false,
//         noticeTypeCd: 'MEETING',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 2,
//       enrolledCount: 4,
//     },
//   },
// ]
