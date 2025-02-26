import { useState } from 'react'
import { DateRange } from 'react-day-picker'

export const useSelectDateRange = () => {
  const [selectedDate, setSelectedDate] = useState<DateRange>({
    from: new Date(),
    to: (() => {
      const toDate = new Date()
      toDate.setDate(toDate.getDate() + 14) // 기본 선택값은 2주입니다.
      return toDate
    })(),
  }) // 사용자가 일정을 선택했을 때 저장하는 값

  const [fixedDate, setFixedDate] = useState<DateRange>({
    from: new Date(),
    to: (() => {
      const toDate = new Date()
      toDate.setDate(toDate.getDate() + 14) // 기본 선택값은 2주입니다.
      return toDate
    })(),
  }) // 사용자가 일정을 선택하고 '적용'을 눌렀을 때 저장되는 값(이 값으로 API 보냄)

  const handleSelectedDate = (dateRange: DateRange) => {
    setSelectedDate(dateRange)
  }

  const handleFixedDate = () => {
    setFixedDate(selectedDate)
  }

  return { selectedDate, handleSelectedDate, fixedDate, handleFixedDate }
}
