type useDateFormatterProps =
  | 'YYYY-MM-DD(string)'
  | 'YYYY-MM-DD(date)'
  | 'PM/AM HH:MM'
  | 'MM월 DD일 ?요일'
  | 'MM월 DD일 HH:MM'
  | 'YYYY-MM-DD(?)'
  | 'D-?'
  | 'API REQUEST: start' // BE LocalDateTime type에 맞추어 yyyy-mm-ddThh:mm:ss로 변환됩니다.
  | 'API REQUEST: end' // start의 경우 시작일이므로 0시 0분 0초부터, end의 경우 종료일이므로 24시 0분 0초로 세팅됩니다.

export const useDateFormatter = (
  type: useDateFormatterProps,
  date?: Date | string,
): string | Date => {
  if (!date) {
    date = new Date() // date 파라메터가 전달되지 않은 경우 현재 시각 기준으로 리턴합니다.
  } else if (typeof date === 'string') {
    date = new Date(date) // date가 문자열인 경우 Date 객체로 변환합니다.
  }

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date')
  }
  const yyyy: string = String(date.getFullYear())
  const mm: string = String(date.getMonth() + 1).padStart(2, '0')
  const dd: string = String(date.getDate()).padStart(2, '0')
  const weekdays = ['일', '월', '화', '수', '목', '금', '토']
  const dayOfWeek: string = weekdays[date.getDay()]
  const hours24: number = date.getHours()
  const hours12: number = hours24 % 12 === 0 ? 12 : hours24 % 12
  const ampm: string = hours24 >= 12 ? 'PM' : 'AM'
  const minutes: string = String(date?.getMinutes()).padStart(2, '0')
  // const seconds: string = String(date.getSeconds()).padStart(2, '0')

  const getDateDifference = (targetDate: Date): string => {
    const currentDate = new Date()

    // D-Day에 시간 계산을 위해 오늘 날짜 백업
    const backupCurrentDate = new Date()

    // 시간 무시하고 날짜 단위로 계산
    currentDate.setHours(0, 0, 0, 0)
    targetDate.setHours(0, 0, 0, 0)

    const timeDifference = targetDate.getTime() - currentDate.getTime()
    const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24))

    if (dayDifference === 0) {
      const hoursDifference = hours24 - backupCurrentDate.getHours()

      if (hoursDifference > 0) {
        return `${hoursDifference}시간 전`
      } else {
        return 'D-Day'
      }
    }

    if (dayDifference > 0) {
      return `D-${dayDifference}`
    }

    return `D+${Math.abs(dayDifference)}`
  }

  switch (type) {
    case 'YYYY-MM-DD(string)':
      return `${yyyy}-${mm}-${dd}`
    case 'YYYY-MM-DD(date)':
      return new Date(`${yyyy}-${mm}-${dd}`)
    case 'PM/AM HH:MM':
      return `${ampm} ${String(hours12).padStart(2, '0')}:${minutes}`
    case 'MM월 DD일 ?요일':
      return `${mm}월 ${dd}일 ${dayOfWeek}요일`
    case 'MM월 DD일 HH:MM':
      return `${mm}월 ${dd}일 ${hours24}:${minutes}`
    case 'YYYY-MM-DD(?)':
      return `${yyyy}-${mm}-${dd}(${dayOfWeek})`
    case 'D-?':
      return getDateDifference(date)
    case 'API REQUEST: start':
      return `${yyyy}-${mm}-${dd}T00:00:00`

    case 'API REQUEST: end':
      return `${yyyy}-${mm}-${dd}T23:59:59`

    default:
      // console.log(
      //   'DateFormatter가 정상 작동되지 않습니다. useDateFormatter에 전달된 파라메터 값(type)을 확인해 주세요.',
      // )
      return ''
  }
}
