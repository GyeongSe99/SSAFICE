export type createUser = {
  userId: number
  email?: string // 더미데이터 생성 시 번거로움 때문에 선택적 파라메터 지정
  name: string
  profileImgUrl?: string
} // 임시 타입입니다, user 타입이 따로 생기면 추후 교체해 주세요

export type AnnouncementItemDisplay = {
  // API 응답 그대로 매칭
  user?: createUser // 작성자
  createUser?: createUser // 작성자
  createdAt: Date // display 시 시간 formatting하는 유틸함수 붙여서 쓰는 걸로
  title: string
  content: string
  startDateTime?: Date
  endDateTime?: Date
  noticeId: number
  isEssential?: boolean // 나중에 essential parameter로 바꾸던지 (일단 지금은 선택)
  noticeTypeCd?: string
  channelSummary?: {
    channelId: string
    channelName: string
    mmTeamId: string
    mmTeamName: string
  }
}

export type AnnouncementListDisplay = Record<string, AnnouncementItemDisplay[]>
// 날짜로 묶은 공지 items

// API 연결 후 삭제해 주세요
// MARK: datas
export const dummyAnnouncements: AnnouncementItemDisplay[] = [
  {
    createUser: { userId: 1, name: 'John Doe' },
    createdAt: new Date('2024-09-12T08:45:00'),
    title: '공지 제목 1',
    content: '공지 내용 1번입니다. 이 공지는 주로 시스템 유지보수와 관련된 내용입니다.',
    noticeId: 1,
  },
  {
    createUser: { userId: 2, name: 'Jane Smith' },
    createdAt: new Date('2024-09-12T08:45:00'),
    title: '공지 제목 2',
    content: '공지 내용 2번입니다. 시스템 업데이트와 관련된 공지입니다.',
    noticeId: 2,
  },
  {
    createUser: { userId: 3, name: 'Alice Johnson' },
    createdAt: new Date('2024-09-12T08:45:00'),
    title: '공지 제목 3',
    content: '공지 내용 3번입니다. 중요 공지 사항입니다.',
    noticeId: 3,
  },
  {
    createUser: { userId: 4, name: 'Bob Brown' },
    createdAt: new Date('2024-09-18T11:00:00'),
    title: '공지 제목 4',
    content: '공지 내용 4번입니다. 서비스 점검 일정에 대한 내용입니다.',
    noticeId: 4,
  },
  {
    createUser: { userId: 5, name: 'Charlie Davis' },
    createdAt: new Date('2024-09-29T13:00:00'),
    title: '공지 제목 5',
    content: '공지 내용 5번입니다. 긴급 보안 패치 안내입니다.',
    noticeId: 5,
  },
  {
    createUser: { userId: 1, name: 'John Doe' },
    createdAt: new Date('2024-09-29T13:00:00'),
    title: '공지 제목 6',
    content: '공지 내용 6번입니다. 시스템 점검 및 업그레이드 작업 안내입니다.',
    noticeId: 6,
  },
  {
    createUser: { userId: 2, name: 'Jane Smith' },
    createdAt: new Date('2024-09-29T13:00:00'),
    title: '공지 제목 7',
    content: '공지 내용 7번입니다. 중요 업데이트 공지입니다.',
    noticeId: 7,
  },
  {
    createUser: { userId: 3, name: 'Alice Johnson' },
    createdAt: new Date('2024-10-10T16:15:00'),
    title: '공지 제목 8',
    content: '공지 내용 8번입니다. 사용자 인터페이스 변경사항에 대한 안내입니다.',
    noticeId: 8,
  },
  {
    createUser: { userId: 4, name: 'Bob Brown' },
    createdAt: new Date('2024-08-30T12:45:00'),
    title: '공지 제목 9',
    content: '공지 내용 9번입니다. 새로운 기능에 대한 발표입니다.',
    noticeId: 9,
  },
  {
    createUser: { userId: 5, name: 'Charlie Davis' },
    createdAt: new Date('2024-08-30T12:42:00'),
    title: '공지 제목 10',
    content: '공지 내용 10번입니다. 내부 보안 점검 일정 안내입니다.',
    noticeId: 10,
  },
  {
    createUser: { userId: 1, name: 'John Doe' },
    createdAt: new Date('2024-10-03T17:30:00'),
    title: '공지 제목 11',
    content: '공지 내용 11번입니다. 데이터 백업 작업 공지입니다.',
    noticeId: 11,
  },
  {
    createUser: { userId: 2, name: 'Jane Smith' },
    createdAt: new Date('2024-09-25T19:00:00'),
    title: '공지 제목 12',
    content: '공지 내용 12번입니다. 사용자 계정 관리 관련 공지입니다.',
    noticeId: 12,
  },
  {
    createUser: { userId: 3, name: 'Alice Johnson' },
    createdAt: new Date('2024-10-07T10:00:00'),
    title: '공지 제목 13',
    content: '공지 내용 13번입니다. 시스템 업데이트 내용입니다.',
    noticeId: 13,
  },
  {
    createUser: { userId: 4, name: '안인석(교육프로)' },
    createdAt: new Date('2024-08-15T14:00:00'),
    title: '[자율PJT 자치회 선발 안내]',
    content: `
  \\[자율PJT 자치회 선발 안내\\]\n-------------------\n\n**베스트 일레븐!** 11기 여러분
 안녕하세요!! 이번 **자율PJT 자치회**를 모집합니다! **나와 우리 팀원들을 위해 더 나은 SSAFY 
를 함께 만들어 갈 여러분을 기다립니다. :man-gesturing-ok:** 관심있는 11기 교육생의 많은 지원
 바랍니다 :breeze\\_flower:\n\n#### **:bangbang:\xa0반 별 자치회**\n\n:black\\_small\\_square: **임기**: 선발 후 자율PJT 6주간 활동 :black\\_small\\_square: **주요 업무**: SSAFY DAY 및
 반 별 이벤트, 지역 내 회의 참석, 간식 지급 및 관리, 반 학습 분위기 조성 :black\\_small\\_square: **혜택**: 주차 별 마일리지 지급\n\n**SSAFY에서 우리 캠퍼스, 우리 반을 대표하여 다양한 
역량을 키울 기회를 놓치지 마세요!!** **지원을 희망하는 교육생은 10/17일(목)까지 본인 반담당 
프로님에게 문의해주세요! :heart\\_ogu:**\n\n**자치회 관련 문의사항은 @원강재(교육프로) 에게 
문의해주세요!**
  `,
    noticeId: 14,
  },
  {
    createUser: { userId: 5, name: 'Charlie Davis' },
    createdAt: new Date('2024-09-10T13:30:00'),
    title: '공지 제목 15',
    content: '공지 내용 15번입니다. 서비스 중단 안내입니다.',
    noticeId: 15,
  },
  {
    createUser: { userId: 1, name: 'John Doe' },
    createdAt: new Date('2024-09-20T12:00:00'),
    title: '공지 제목 16',
    content: '공지 내용 16번입니다. 시스템 유지보수 안내입니다.',
    noticeId: 16,
  },
  {
    createUser: { userId: 2, name: 'Jane Smith' },
    createdAt: new Date('2024-10-12T10:00:00'),
    title: '공지 제목 17',
    content: '공지 내용 17번입니다. 신규 기능 런칭 공지입니다.',
    noticeId: 17,
  },
  {
    createUser: { userId: 3, name: '김싸피(교육프로)' },
    createdAt: new Date('2024-08-25T16:30:00'),
    title: '[행운이벤트] 우리 반에 숨겨진 행운을 찾아주세요!',
    content: `@here 

# EVENT 행운을 나눠주세요 :gg-clover: 

서울 6반 모든 교육생들에게 행운이 깃들길!
우리반에 숨겨진 행운을 찾아주세요! :loopy-face2: 
11월 7일 목요일! 서울 6반의 행운이벤트가 진행됩니다! 기대하는 마음으로 목요일에 만나요 :)

### :gg-clover: 진행일자: 11월 7일 목요일 아침
### :gg-clover: 참여방법
 ** :platinum_1: 당일 아침! 강의장 내에 있는 행운의 쪽지를 찾아주세요! **
 ** :platinum_2: 쪽지를 찾았다면! 인증샷을 찍고 함께 행운을 공유하고 싶은 교육생을 생각해주세요! 간단한 응원 메시지를 남겨도 좋겠죠?**
 ** :platinum_3: [SSAFY 소통채널](https://meeting.ssafy.com/s11public/channels/off-topic)에 행운을 공유할 교육생 태그하고 인증샷과 응원 메시지를 올려주세요! ** 

### :gg-clover: 유의사항
** * 당일 찾은 쪽지만 인정해드립니다**
** * 1인 1개 쪽지만 유효합니다**
** * 행운을 나눠주고 싶은 교육생을 꼭! 태그해주셔야 상품이 지급됩니다! 혼자만 행운을 간직하면 상품은 없어요!  :d_bear:  **
** * 행운을 공유하고 싶은 다른 반 교육생을 태그해주셔도 됩니다! **`,
    noticeId: 18,
  },
  {
    createUser: { userId: 4, name: 'Bob Brown' },
    createdAt: new Date('2024-09-17T08:00:00'),
    title: '공지 제목 19',
    content: '공지 내용 19번입니다. 새로운 정책 발표 공지입니다.',
    noticeId: 19,
  },
  {
    createUser: { userId: 5, name: 'Charlie Davis' },
    createdAt: new Date('2024-10-02T11:30:00'),
    title: '공지 제목 20',
    content: '공지 내용 20번입니다. 서버 점검 공지입니다.',
    noticeId: 20,
  },
  {
    createUser: { userId: 1, name: 'John Doe' },
    createdAt: new Date('2024-09-28T09:15:00'),
    title: '공지 제목 21',
    content: '공지 내용 21번입니다. 신규 서비스 출시 공지입니다.',
    noticeId: 21,
  },
  {
    createUser: { userId: 2, name: '정싸피(교육프로)' },
    createdAt: new Date('2024-08-20T08:30:00'),
    title: '자율 프로젝트 계획서 및 2차 교보재 신청서 작성 및 제출안내',
    content: `
  [자율 프로젝트 계획서 
및 2차 교보재 신청서 작성 및 제출안내]\n1차 교보재가 금일부터 순차적으로 지급중에 있습니다.\n2차 교보재는 사전 안내된 바와 같이 자유주제를 선택하신 팀과 1차 교보재를 신청하지 않은 팀에
 한하여 신청하실 수 있습니다.\n\n :round_pushpin: 계획서 및 신청서 두 서류에 모두 사용하실  
교보재 리스트가 기재돼 있어야 합니다. (계획서 and 신청서 :o:  , 계획서 or 신청서 :x: )\n :round_pushpin: 팀별 논의 및 반 담당 컨설턴트님 코칭을 받아서 작성해주시고\n :round_pushpin: 10/28(월) 11시까지 팀장님이 반담당프로님에게 제출해주세요 :slightly_smiling_face: \n :white_small_square: 기업연계팀도 각 반 담당 프로님께 제출해주시면 됩니다.\n :round_pushpin: 프로젝트
 시점을 감안했을 때, 학습보충용 교보재(이러닝 및 도서)는 2차 교보재로 지급되지않습니다. \n :round_pushpin: 프로젝트에 직접 사용되는 장비/라이선스/서버 등은 신청가능합니다.\n :round_pushpin: 모든 교보재는 프로젝트 종료 후, 반납 필수 (파손 시, 본인부담)입니다.\n\n교보재 승인은 
팀별이 아닌, 신청팀 전체 대상이므로 \n한 팀이라도 제출이 지연될 경우, 다른 팀에 본의아니게  
피해를 줄 수 있어요 :smiling_face_with_tear: \n궁금한 점은 반담당 프로님, 컨설턴트님, 코치님
의 도움을 적극적으로 받아주세요 :dance_kkeobi:
  `,
    noticeId: 22,
  },
  {
    createUser: { userId: 3, name: 'Alice Johnson' },
    createdAt: new Date('2024-10-04T07:45:00'),
    title: '공지 제목 23',
    content: '공지 내용 23번입니다. 보안 패치 관련 공지입니다.',
    noticeId: 23,
  },
  {
    createUser: { userId: 4, name: 'Bob Brown' },
    createdAt: new Date('2024-09-16T13:00:00'),
    title: '공지 제목 24',
    content: '공지 내용 24번입니다. 사용자 인터페이스 변경 안내입니다.',
    noticeId: 24,
  },
  {
    createUser: { userId: 5, name: 'Charlie Davis' },
    createdAt: new Date('2024-10-09T12:00:00'),
    title: '공지 제목 25',
    content: '공지 내용 25번입니다. 서버 점검 및 서비스 일시 중단 공지입니다.',
    noticeId: 25,
  },
  {
    createUser: { userId: 5, name: 'Charlie Davis' },
    createdAt: new Date('2024-10-09T12:01:00'),
    title: '공지 제목 26',
    content: '공지 내용 26번입니다. 서버 점검 및 서비스 일시 중단 공지입니다.',
    noticeId: 26,
  },
  {
    createUser: { userId: 5, name: 'Charlie Davis' },
    createdAt: new Date('2024-10-09T11:00:00'),
    title: '공지 제목 27',
    content:
      '공지 내용 27번입니다. 서버 점검 및 서비스 일시 중단 공지입니다.공지 내용 27번입니다. 서버 점검 및 서비스 일시 중단 공지입니다.공지 내용 27번입니다. 서버 점검 및 서비스 일시 중단 공지입니다.공지 내용 27번입니다. 서버 점검 및 서비스 일시 중단 공지입니다.공지 내용 27번입니다. 서버 점검 및 서비스 일시 중단 공지입니다.공지 내용 27번입니다. 서버 점검 및 서비스 일시 중단 공지입니다.공지 내용 27번입니다. 서버 점검 및 서비스 일시 중단 공지입니다.공지 내용 27번입니다. 서버 점검 및 서비스 일시 중단 공지입니다.공지 내용 27번입니다. 서버 점검 및 서비스 일시 중단 공지입니다.공지 내용 27번입니다. 서버 점검 및 서비스 일시 중단 공지입니다.공지 내용 27번입니다. 서버 점검 및 서비스 일시 중단 공지입니다.공지 내용 27번입니다. 서버 점검 및 서비스 일시 중단 공지입니다.공지 내용 27번입니다. 서버 점검 및 서비스 일시 중단 공지입니다.공지 내용 27번입니다. 서버 점검 및 서비스 일시 중단 공지입니다.공지 내용 27번입니다. 서버 점검 및 서비스 일시 중단 공지입니다.공지 내용 27번입니다. 서버 점검 및 서비스 일시 중단 공지입니다.공지 내용 27번입니다. 서버 점검 및 서비스 일시 중단 공지입니다.',
    noticeId: 27,
  },
  {
    createUser: { userId: 5, name: 'Charlie Davis' },
    createdAt: new Date('2024-10-09T14:00:00'),
    title: '공지 제목 28',
    content: '공지 내용 28번입니다. 서버 점검 및 서비스 일시 중단 공지입니다.',
    noticeId: 28,
  },
  {
    createUser: { userId: 5, name: 'Charlie Davis' },
    createdAt: new Date('2024-10-09T13:00:00'),
    title: '공지 제목 29',
    content: '공지 내용 29번입니다. 서버 점검 및 서비스 일시 중단 공지입니다.',
    noticeId: 29,
  },
  {
    createUser: { userId: 4, name: 'Bob Brown' },
    createdAt: new Date('2024-10-09T14:00:00'),
    title: '공지 제목 14',
    content: '공지 내용 14번입니다. 긴급 시스템 점검 안내입니다.',
    noticeId: 30,
  },
  {
    createUser: { userId: 4, name: 'Bob Brown' },
    createdAt: new Date('2024-10-09T14:00:00'),
    title: '공지 제목 14',
    content: '공지 내용 14번입니다. 긴급 시스템 점검 안내입니다.',
    noticeId: 31,
  },
  {
    createUser: { userId: 4, name: 'Bob Brown' },
    createdAt: new Date('2024-10-09T14:00:00'),
    title: '공지 제목 14',
    content: '공지 내용 14번입니다. 긴급 시스템 점검 안내입니다.',
    noticeId: 32,
  },
  {
    createUser: { userId: 4, name: 'Bob Brown' },
    createdAt: new Date('2024-10-09T14:00:00'),
    title: '공지 제목 14',
    content: '공지 내용 14번입니다. 긴급 시스템 점검 안내입니다.',
    noticeId: 33,
  },
]
