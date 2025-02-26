// import { AnnouncementItemDisplay } from '@/features/announcementTab'

export type TeamTodoItemDisplay = {
  // noticeSummary: AnnouncementItemDisplay
  noticeSummary: {
    channelSummary: {
      channelId: string
      channelName: string
      mmTeamId: string
      mmTeamName: string
    }
    content: string
    createdAt: string
    endDateTime: string
    isEssentialYn: string
    noticeId: number
    noticeTypeCd: string
    startDateTime: string
    title: string
  }

  scheduleEnrolledCount: {
    completedCount: number
    enrolledCount: number
  }
}

export type TeamTodoListDisplay = Record<string, TeamTodoItemDisplay[]>
// 날짜로 묶은 팀 할일 items

// // MARK: DATAS
// export const dummyTeamTodos: TeamTodoItemDisplay[] = [
//   {
//     noticeSummary: {
//       noticeId: 1,
//       title: '새로운 기능 발표',
//       content: '우리 플랫폼에 새로운 기능이 추가되었습니다.',
//       createdAt: new Date('2024-11-17T10:00:00'),
//       startDateTime: new Date('2024-11-20T09:00:00'),
//       endDateTime: new Date('2024-11-25T18:00:00'),
//       noticeTypeCd: 'GENERAL',
//       user: {
//         userId: 101,
//         email: 'admin@example.com',
//         name: '관리자',
//         profileImgUrl: 'https://example.com/images/admin-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12345',
//         channelName: '개발팀',
//         mmTeamId: 'T98765',
//         mmTeamName: '메인팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 50,
//       enrolledCount: 50,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 2,
//       title: '버그 수정 및 성능 개선',
//       content: '여러 버그가 수정되었으며 성능이 향상되었습니다.',
//       createdAt: new Date('2024-11-18T11:00:00'),
//       startDateTime: new Date('2024-11-21T10:00:00'),
//       endDateTime: new Date('2024-11-26T17:00:00'),
//       noticeTypeCd: 'UPDATE',
//       user: {
//         userId: 102,
//         email: 'developer@example.com',
//         name: '제인 도',
//         profileImgUrl: 'https://example.com/images/jane-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12346',
//         channelName: 'QA팀',
//         mmTeamId: 'T98766',
//         mmTeamName: '테스트팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 10,
//       enrolledCount: 20,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 3,
//       title: '새로운 UI 디자인 업데이트',
//       content: '플랫폼에 새로운 UI 디자인이 적용되었습니다.',
//       createdAt: new Date('2024-11-19T12:30:00'),
//       startDateTime: new Date('2024-11-22T11:00:00'),
//       endDateTime: new Date('2024-11-27T16:00:00'),
//       noticeTypeCd: 'DESIGN',
//       user: {
//         userId: 103,
//         email: 'designer@example.com',
//         name: '존 스미스',
//         profileImgUrl: 'https://example.com/images/john-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12347',
//         channelName: '디자인팀',
//         mmTeamId: 'T98767',
//         mmTeamName: '디자인팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 15,
//       enrolledCount: 40,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 4,
//       title: '프로젝트 리뷰 일정 공지',
//       content: '2024년 11월 22일 오전 9시에 프로젝트 리뷰가 진행됩니다.',
//       createdAt: new Date('2024-11-20T09:00:00'),
//       startDateTime: new Date('2024-11-22T09:00:00'),
//       endDateTime: new Date('2024-11-22T10:30:00'),
//       noticeTypeCd: 'MEETING',
//       user: {
//         userId: 104,
//         email: 'manager@example.com',
//         name: '박정훈',
//         profileImgUrl: 'https://example.com/images/park-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12348',
//         channelName: 'PM팀',
//         mmTeamId: 'T98768',
//         mmTeamName: '프로젝트팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 5,
//       enrolledCount: 10,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 5,
//       title: '주간 업무 회의 일정 공지',
//       content: '2024년 11월 24일 오전 9시에 주간 업무 회의가 진행됩니다.',
//       createdAt: new Date('2024-11-21T14:00:00'),
//       startDateTime: new Date('2024-11-24T09:00:00'),
//       endDateTime: new Date('2024-11-24T10:00:00'),
//       noticeTypeCd: 'MEETING',
//       user: {
//         userId: 105,
//         email: 'assistant@example.com',
//         name: '김미영',
//         profileImgUrl: 'https://example.com/images/kim-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12349',
//         channelName: '관리팀',
//         mmTeamId: 'T98769',
//         mmTeamName: '운영팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 30,
//       enrolledCount: 50,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 6,
//       title: '보안 패치 공지',
//       content: '2024년 11월 22일 오후 2시부터 보안 패치가 적용됩니다.',
//       createdAt: new Date('2024-11-22T16:00:00'),
//       startDateTime: new Date('2024-11-23T09:00:00'),
//       endDateTime: new Date('2024-11-23T17:00:00'),
//       noticeTypeCd: 'SECURITY',
//       user: {
//         userId: 106,
//         email: 'security@example.com',
//         name: '이정호',
//         profileImgUrl: 'https://example.com/images/lee-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12350',
//         channelName: '보안팀',
//         mmTeamId: 'T98770',
//         mmTeamName: '보안팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 10,
//       enrolledCount: 25,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 7,
//       title: '시스템 유지보수 예정',
//       content: '2024년 11월 27일 오후 2시부터 4시까지 시스템 유지보수가 있습니다.',
//       createdAt: new Date('2024-11-23T15:00:00'),
//       startDateTime: new Date('2024-11-27T14:00:00'),
//       endDateTime: new Date('2024-11-27T16:00:00'),
//       noticeTypeCd: 'MAINTENANCE',
//       user: {
//         userId: 107,
//         email: 'admin@example.com',
//         name: '관리자',
//         profileImgUrl: 'https://example.com/images/admin-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12351',
//         channelName: '운영팀',
//         mmTeamId: 'T98771',
//         mmTeamName: '시스템팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 20,
//       enrolledCount: 40,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 8,
//       title: '고객 피드백 반영 예정',
//       content: '고객 피드백을 반영하여 기능 업데이트를 진행할 예정입니다.',
//       createdAt: new Date('2024-11-24T13:00:00'),
//       startDateTime: new Date('2024-11-28T10:00:00'),
//       endDateTime: new Date('2024-12-02T18:00:00'),
//       noticeTypeCd: 'FEEDBACK',
//       user: {
//         userId: 108,
//         email: 'support@example.com',
//         name: '최은정',
//         profileImgUrl: 'https://example.com/images/choi-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12352',
//         channelName: '고객지원팀',
//         mmTeamId: 'T98772',
//         mmTeamName: '지원팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 30,
//       enrolledCount: 60,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 9,
//       title: '인프라 성능 개선',
//       content: '인프라 성능을 개선하는 작업이 진행될 예정입니다.',
//       createdAt: new Date('2024-11-25T10:00:00'),
//       startDateTime: new Date('2024-11-29T08:00:00'),
//       endDateTime: new Date('2024-11-29T16:00:00'),
//       noticeTypeCd: 'INFRASTRUCTURE',
//       user: {
//         userId: 109,
//         email: 'infra@example.com',
//         name: '박진수',
//         profileImgUrl: 'https://example.com/images/parkjin-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12353',
//         channelName: '인프라팀',
//         mmTeamId: 'T98773',
//         mmTeamName: '시스템팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 15,
//       enrolledCount: 35,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 10,
//       title: '팀 빌딩 행사 공지',
//       content: '2024년 12월 1일 오후 1시에 팀 빌딩 행사가 있습니다.',
//       createdAt: new Date('2024-11-26T08:00:00'),
//       startDateTime: new Date('2024-12-01T13:00:00'),
//       endDateTime: new Date('2024-12-01T18:00:00'),
//       noticeTypeCd: 'EVENT',
//       user: {
//         userId: 110,
//         email: 'event@example.com',
//         name: '홍성민',
//         profileImgUrl: 'https://example.com/images/hong-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12354',
//         channelName: 'HR팀',
//         mmTeamId: 'T98774',
//         mmTeamName: '인사팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 10,
//       enrolledCount: 50,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 11,
//       title: '기술 워크샵 안내',
//       content: '2024년 12월 5일 오전 9시에 기술 워크샵이 열립니다.',
//       createdAt: new Date('2024-11-27T11:00:00'),
//       startDateTime: new Date('2024-12-05T09:00:00'),
//       endDateTime: new Date('2024-12-05T12:00:00'),
//       noticeTypeCd: 'WORKSHOP',
//       user: {
//         userId: 111,
//         email: 'techworkshop@example.com',
//         name: '이진수',
//         profileImgUrl: 'https://example.com/images/leejin-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12355',
//         channelName: '기술팀',
//         mmTeamId: 'T98775',
//         mmTeamName: '기술팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 25,
//       enrolledCount: 50,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 12,
//       title: '디자인 컨셉 발표',
//       content: '2024년 12월 7일 오전 10시에 디자인 컨셉 발표가 진행됩니다.',
//       createdAt: new Date('2024-11-28T14:00:00'),
//       startDateTime: new Date('2024-12-07T10:00:00'),
//       endDateTime: new Date('2024-12-07T12:00:00'),
//       noticeTypeCd: 'DESIGN',
//       user: {
//         userId: 112,
//         email: 'designer@example.com',
//         name: '한지영',
//         profileImgUrl: 'https://example.com/images/han-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12356',
//         channelName: '디자인팀',
//         mmTeamId: 'T98776',
//         mmTeamName: '디자인팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 20,
//       enrolledCount: 40,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 13,
//       title: '고객 서비스 점검 공지',
//       content: '2024년 12월 10일 오후 3시부터 고객 서비스 점검이 예정되어 있습니다.',
//       createdAt: new Date('2024-11-29T10:00:00'),
//       startDateTime: new Date('2024-12-10T15:00:00'),
//       endDateTime: new Date('2024-12-10T17:00:00'),
//       noticeTypeCd: 'SERVICE',
//       user: {
//         userId: 113,
//         email: 'customerservice@example.com',
//         name: '조민정',
//         profileImgUrl: 'https://example.com/images/jo-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12357',
//         channelName: '고객지원팀',
//         mmTeamId: 'T98777',
//         mmTeamName: '서비스팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 40,
//       enrolledCount: 70,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 14,
//       title: '플랫폼 업데이트 일정',
//       content: '2024년 12월 15일 오후 2시에 플랫폼 업데이트가 진행됩니다.',
//       createdAt: new Date('2024-12-01T09:00:00'),
//       startDateTime: new Date('2024-12-15T14:00:00'),
//       endDateTime: new Date('2024-12-15T18:00:00'),
//       noticeTypeCd: 'UPDATE',
//       user: {
//         userId: 114,
//         email: 'platform@example.com',
//         name: '이수진',
//         profileImgUrl: 'https://example.com/images/leesujin-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12358',
//         channelName: '플랫폼팀',
//         mmTeamId: 'T98778',
//         mmTeamName: '개발팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 10,
//       enrolledCount: 30,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 15,
//       title: '버그 수정 업데이트 안내',
//       content: '2024년 12월 18일 오후 3시에 긴급 버그 수정 업데이트가 진행됩니다.',
//       createdAt: new Date('2024-12-03T14:00:00'),
//       startDateTime: new Date('2024-12-18T15:00:00'),
//       endDateTime: new Date('2024-12-18T16:00:00'),
//       noticeTypeCd: 'UPDATE',
//       user: {
//         userId: 115,
//         email: 'devteam@example.com',
//         name: '김태훈',
//         profileImgUrl: 'https://example.com/images/kimtae-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12359',
//         channelName: '개발팀',
//         mmTeamId: 'T98779',
//         mmTeamName: '백엔드팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 35,
//       enrolledCount: 50,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 16,
//       title: '신규 기능 추가 일정 안내',
//       content: '2024년 12월 20일 오전 10시에 신규 기능이 추가됩니다.',
//       createdAt: new Date('2024-12-04T11:00:00'),
//       startDateTime: new Date('2024-12-20T10:00:00'),
//       endDateTime: new Date('2024-12-20T12:00:00'),
//       noticeTypeCd: 'FEATURE',
//       user: {
//         userId: 116,
//         email: 'product@example.com',
//         name: '장지민',
//         profileImgUrl: 'https://example.com/images/jang-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12360',
//         channelName: '프로덕트팀',
//         mmTeamId: 'T98780',
//         mmTeamName: '기획팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 40,
//       enrolledCount: 60,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 17,
//       title: 'API 문서 업데이트 공지',
//       content: '2024년 12월 22일 오후 2시에 API 문서가 업데이트됩니다.',
//       createdAt: new Date('2024-12-05T12:00:00'),
//       startDateTime: new Date('2024-12-22T14:00:00'),
//       endDateTime: new Date('2024-12-22T16:00:00'),
//       noticeTypeCd: 'DOCUMENT',
//       user: {
//         userId: 117,
//         email: 'api@example.com',
//         name: '오세영',
//         profileImgUrl: 'https://example.com/images/oh-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12361',
//         channelName: 'API팀',
//         mmTeamId: 'T98781',
//         mmTeamName: '기술팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 15,
//       enrolledCount: 25,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 18,
//       title: '디자인 리뷰 일정 안내',
//       content: '2024년 12월 25일 오전 11시에 디자인 리뷰가 진행됩니다.',
//       createdAt: new Date('2024-12-06T13:00:00'),
//       startDateTime: new Date('2024-12-25T11:00:00'),
//       endDateTime: new Date('2024-12-25T12:30:00'),
//       noticeTypeCd: 'REVIEW',
//       user: {
//         userId: 118,
//         email: 'designer@example.com',
//         name: '윤혜진',
//         profileImgUrl: 'https://example.com/images/yun-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12362',
//         channelName: '디자인팀',
//         mmTeamId: 'T98782',
//         mmTeamName: '디자인팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 20,
//       enrolledCount: 40,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 19,
//       title: '데이터베이스 백업 일정 안내',
//       content: '2024년 12월 27일 오후 4시에 데이터베이스 백업 작업이 진행됩니다.',
//       createdAt: new Date('2024-12-07T15:00:00'),
//       startDateTime: new Date('2024-12-27T16:00:00'),
//       endDateTime: new Date('2024-12-27T18:00:00'),
//       noticeTypeCd: 'MAINTENANCE',
//       user: {
//         userId: 119,
//         email: 'dbteam@example.com',
//         name: '정상혁',
//         profileImgUrl: 'https://example.com/images/jung-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12363',
//         channelName: 'DB팀',
//         mmTeamId: 'T98783',
//         mmTeamName: '운영팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 50,
//       enrolledCount: 70,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 20,
//       title: '협력사 미팅 안내',
//       content: '2024년 12월 30일 오전 10시에 협력사와의 미팅이 진행됩니다.',
//       createdAt: new Date('2024-12-10T16:00:00'),
//       startDateTime: new Date('2024-12-30T10:00:00'),
//       endDateTime: new Date('2024-12-30T12:00:00'),
//       noticeTypeCd: 'MEETING',
//       user: {
//         userId: 120,
//         email: 'pm@example.com',
//         name: '이영진',
//         profileImgUrl: 'https://example.com/images/lee_profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12364',
//         channelName: 'PM팀',
//         mmTeamId: 'T98784',
//         mmTeamName: '프로젝트팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 12,
//       enrolledCount: 25,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 21,
//       title: '사용자 인터페이스 개선 사항',
//       content: '2025년 1월 2일 오후 1시에 사용자 인터페이스 개선 사항을 발표합니다.',
//       createdAt: new Date('2024-12-12T14:00:00'),
//       startDateTime: new Date('2025-01-02T13:00:00'),
//       endDateTime: new Date('2025-01-02T15:00:00'),
//       noticeTypeCd: 'UI/UX',
//       user: {
//         userId: 121,
//         email: 'uxteam@example.com',
//         name: '박세진',
//         profileImgUrl: 'https://example.com/images/parksejin-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12365',
//         channelName: 'UX팀',
//         mmTeamId: 'T98785',
//         mmTeamName: '디자인팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 20,
//       enrolledCount: 35,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 22,
//       title: '회계 보고서 제출 마감일 안내',
//       content: '2025년 1월 5일까지 회계 보고서 제출을 완료해 주시기 바랍니다.',
//       createdAt: new Date('2024-12-13T09:00:00'),
//       startDateTime: new Date('2025-01-05T09:00:00'),
//       endDateTime: new Date('2025-01-05T18:00:00'),
//       noticeTypeCd: 'REPORT',
//       user: {
//         userId: 122,
//         email: 'accounting@example.com',
//         name: '조은영',
//         profileImgUrl: 'https://example.com/images/cho_profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12366',
//         channelName: '회계팀',
//         mmTeamId: 'T98786',
//         mmTeamName: '재무팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 30,
//       enrolledCount: 40,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 23,
//       title: '서버 성능 테스트 예정',
//       content: '2025년 1월 10일 오후 3시부터 서버 성능 테스트가 진행됩니다.',
//       createdAt: new Date('2024-12-15T11:00:00'),
//       startDateTime: new Date('2025-01-10T15:00:00'),
//       endDateTime: new Date('2025-01-10T18:00:00'),
//       noticeTypeCd: 'MAINTENANCE',
//       user: {
//         userId: 123,
//         email: 'system@example.com',
//         name: '김하늘',
//         profileImgUrl: 'https://example.com/images/kimhaneul-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12367',
//         channelName: '시스템팀',
//         mmTeamId: 'T98787',
//         mmTeamName: '인프라팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 25,
//       enrolledCount: 50,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 24,
//       title: '기술 세미나 안내',
//       content: '2025년 1월 15일 오후 2시에 기술 세미나가 개최됩니다.',
//       createdAt: new Date('2024-12-17T15:00:00'),
//       startDateTime: new Date('2025-01-15T14:00:00'),
//       endDateTime: new Date('2025-01-15T16:00:00'),
//       noticeTypeCd: 'SEMINAR',
//       user: {
//         userId: 124,
//         email: 'dev@example.com',
//         name: '황민영',
//         profileImgUrl: 'https://example.com/images/huangminyoung-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12368',
//         channelName: '개발팀',
//         mmTeamId: 'T98788',
//         mmTeamName: '기술팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 18,
//       enrolledCount: 40,
//     },
//   },
//   {
//     noticeSummary: {
//       noticeId: 25,
//       title: '고객 피드백 세션 안내',
//       content: '2025년 1월 20일 오전 10시부터 고객 피드백 세션이 시작됩니다.',
//       createdAt: new Date('2024-12-20T09:00:00'),
//       startDateTime: new Date('2025-01-20T10:00:00'),
//       endDateTime: new Date('2025-01-20T12:00:00'),
//       noticeTypeCd: 'FEEDBACK',
//       user: {
//         userId: 125,
//         email: 'support@example.com',
//         name: '최수지',
//         profileImgUrl: 'https://example.com/images/choisooji-profile.jpg',
//       },
//       channelSummary: {
//         channelId: 'C12369',
//         channelName: '고객지원팀',
//         mmTeamId: 'T98789',
//         mmTeamName: '서비스팀',
//       },
//     },
//     scheduleEnrolledCount: {
//       completedCount: 10,
//       enrolledCount: 20,
//     },
//   },
// ]
