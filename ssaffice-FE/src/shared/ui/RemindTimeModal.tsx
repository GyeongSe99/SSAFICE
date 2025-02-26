import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { RadioGroup, Radio } from '@/shared/ui'
import { InfoIcon } from '@/assets/svg'

type RemindProps = {
  remindTypeCd: string
  remindDateTime: string
}

type RemindTimeModalProps = {
  setIsOpen: (isOpen: boolean) => void
  reminder: RemindProps[]
  setReminder: (reminder: RemindProps[]) => void
}

export const RemindTimeModal = ({ setIsOpen, reminder, setReminder }: RemindTimeModalProps) => {
  const [isDisabled, setIsDisabled] = useState(true)
  const [remindtype, setRemindtype] = useState('')
  const [date, setDate] = useState('')
  const [daypart, setDaypart] = useState('')
  const [hour, setHour] = useState('')

  const today = new Date()
  const formattedDate = today.toISOString().split('T')[0]

  useEffect(() => {
    if (remindtype === 'DAILY' && daypart && hour) {
      setIsDisabled(false)
    } else if (remindtype === 'ONCE' && date && daypart && hour) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [remindtype, daypart, date, hour])

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let dateFormatted = date

    if (!date) {
      dateFormatted = '1999-09-22'
    }

    const remindElements: RemindProps = {
      remindTypeCd: remindtype,
      remindDateTime: `${dateFormatted}T${hour}`,
    }

    // 중복된 시간 제거
    const setReminderData = [remindElements, ...reminder].filter((item, index) => {
      return (
        [remindElements, ...reminder].findIndex(
          (item2) => item.remindDateTime === item2.remindDateTime,
        ) === index
      )
    })

    setReminder(setReminderData)
    setIsOpen(false)
  }

  const handleOnChangeRemindtype = (event: ChangeEvent<HTMLInputElement>) => {
    setRemindtype(event.target.value)
    setDate('')
  }

  const handleOnChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value)
  }

  const handleOnChangeDaypart = (event: ChangeEvent<HTMLInputElement>) => {
    setDaypart(event.target.value)
    setHour('')
  }

  const handleOnChangeHour = (event: ChangeEvent<HTMLInputElement>) => {
    setHour(event.target.value)
  }

  return (
    <div className='z-50 absolute right-2.5 top-12 flex flex-col gap-y-spacing-24 border w-[529px] h-fit bg-color-bg-primary rounded-radius-8 px-spacing-32 py-spacing-16 border-color-border-tertiary'>
      <div className='flex flex-col items-center gap-y-spacing-12'>
        <h1 className='heading-desktop-sm text-color-text-primary'>시간 설정</h1>
        <div className='flex items-start gap-x-spacing-10'>
          <InfoIcon className='w-4' />
          <p className='text-left body-xs-regular text-color-text-disabled'>
            리마인드 가능 시간대는 오전 8시 ~ 오후 8시입니다. <br />
            일정 리마인드는 개인 mm을 통해 전달되며, 시간 설정 횟수 제한은 없습니다.
          </p>
        </div>
      </div>

      <form onSubmit={handleOnSubmit} className='flex flex-col gap-y-spacing-16'>
        <RadioGroup
          label='매일/한번만'
          onChange={handleOnChangeRemindtype}
          className='flex items-center w-full body-xs-medium text-color-text-primary gap-x-spacing-20'
        >
          <Radio
            name='Remindtype'
            value='DAILY'
            className={`w-full text-center mr-spacing-8 h-fit body-xs-medium py-spacing-10 rounded-radius-8 ${remindtype === 'DAILY' ? 'bg-color-bg-interactive-disabled-press text-color-text-interactive-inverse' : 'bg-color-bg-interactive-secondary text-color-text-primary'}`}
          >
            매일
          </Radio>
          <Radio
            name='Remindtype'
            value='ONCE'
            className={`w-full text-center mr-spacing-8 h-fit body-xs-medium py-spacing-10 rounded-radius-8 ${remindtype === 'ONCE' ? 'bg-color-bg-interactive-disabled-press text-color-text-interactive-inverse' : 'bg-color-bg-interactive-secondary text-color-text-primary'}`}
          >
            한번만
          </Radio>
        </RadioGroup>

        {remindtype === 'ONCE' ? (
          <div className='flex items-center gap-x-spacing-20'>
            <p className='body-xs-medium text-color-text-primary min-w-[57px]'>날짜</p>
            <input
              type='date'
              value={date}
              onChange={handleOnChangeDate}
              min={formattedDate}
              className='border outline-none appearance-none body-sm-semibold text-color-text-disabled p-spacing-4 rounded-radius-4 border-color-border-primary'
            />
          </div>
        ) : null}

        <RadioGroup
          label='오전/오후'
          onChange={handleOnChangeDaypart}
          className='flex items-center w-full body-xs-medium text-color-text-primary gap-x-spacing-20'
        >
          <Radio
            name='DayPart'
            value='AM'
            className={`w-full text-center mr-spacing-8 h-fit body-xs-medium py-spacing-10 rounded-radius-8 ${daypart === 'AM' ? 'bg-color-bg-interactive-disabled-press text-color-text-interactive-inverse' : 'bg-color-bg-interactive-secondary text-color-text-primary'}`}
          >
            오전
          </Radio>
          <Radio
            name='DayPart'
            value='PM'
            className={`w-full text-center mr-spacing-8 h-fit body-xs-medium py-spacing-10 rounded-radius-8 ${daypart === 'PM' ? 'bg-color-bg-interactive-disabled-press text-color-text-interactive-inverse' : 'bg-color-bg-interactive-secondary text-color-text-primary'}`}
          >
            오후
          </Radio>
        </RadioGroup>

        {daypart ? (
          daypart === 'AM' ? (
            <RadioGroup
              label='시'
              onChange={handleOnChangeHour}
              className='flex items-center w-full body-xs-medium text-color-text-primary gap-x-spacing-20'
            >
              <div className='grid grid-cols-4 gap-spacing-20'>
                <Radio
                  name='Hour'
                  value='08:00:00'
                  className={`w-12 text-center h-fit body-xs-medium py-spacing-10 rounded-radius-8 ${hour === '08:00:00' ? 'bg-color-bg-interactive-disabled-press text-color-text-interactive-inverse' : 'bg-color-bg-interactive-secondary text-color-text-primary'}`}
                >
                  8
                </Radio>
                <Radio
                  name='Hour'
                  value='09:00:00'
                  className={`w-12 text-center h-fit body-xs-medium py-spacing-10 rounded-radius-8 ${hour === '09:00:00' ? 'bg-color-bg-interactive-disabled-press text-color-text-interactive-inverse' : 'bg-color-bg-interactive-secondary text-color-text-primary'}`}
                >
                  9
                </Radio>
                <Radio
                  name='Hour'
                  value='10:00:00'
                  className={`w-12 text-center h-fit body-xs-medium py-spacing-10 rounded-radius-8 ${hour === '10:00:00' ? 'bg-color-bg-interactive-disabled-press text-color-text-interactive-inverse' : 'bg-color-bg-interactive-secondary text-color-text-primary'}`}
                >
                  10
                </Radio>
                <Radio
                  name='Hour'
                  value='11:00:00'
                  className={`w-12 text-center h-fit body-xs-medium py-spacing-10 rounded-radius-8 ${hour === '11:00:00' ? 'bg-color-bg-interactive-disabled-press text-color-text-interactive-inverse' : 'bg-color-bg-interactive-secondary text-color-text-primary'}`}
                >
                  11
                </Radio>
              </div>
            </RadioGroup>
          ) : (
            <RadioGroup
              label='시'
              onChange={handleOnChangeHour}
              className='flex items-baseline w-full body-xs-medium text-color-text-primary gap-x-spacing-20'
            >
              <div className='grid w-full grid-cols-6 gap-spacing-20'>
                <Radio
                  name='Hour'
                  value='12:00:00'
                  className={`w-full text-center mr-spacing-20 h-fit body-xs-medium py-spacing-10 rounded-radius-8 ${hour === '12:00:00' ? 'bg-color-bg-interactive-disabled-press text-color-text-interactive-inverse' : 'bg-color-bg-interactive-secondary text-color-text-primary'}`}
                >
                  12
                </Radio>
                <Radio
                  name='Hour'
                  value='13:00:00'
                  className={`w-full text-center mr-spacing-20 h-fit body-xs-medium py-spacing-10 rounded-radius-8 ${hour === '13:00:00' ? 'bg-color-bg-interactive-disabled-press text-color-text-interactive-inverse' : 'bg-color-bg-interactive-secondary text-color-text-primary'}`}
                >
                  1
                </Radio>
                <Radio
                  name='Hour'
                  value='14:00:00'
                  className={`w-full text-center mr-spacing-20 h-fit body-xs-medium py-spacing-10 rounded-radius-8 ${hour === '14:00:00' ? 'bg-color-bg-interactive-disabled-press text-color-text-interactive-inverse' : 'bg-color-bg-interactive-secondary text-color-text-primary'}`}
                >
                  2
                </Radio>
                <Radio
                  name='Hour'
                  value='15:00:00'
                  className={`w-full text-center mr-spacing-20 h-fit body-xs-medium py-spacing-10 rounded-radius-8 ${hour === '15:00:00' ? 'bg-color-bg-interactive-disabled-press text-color-text-interactive-inverse' : 'bg-color-bg-interactive-secondary text-color-text-primary'}`}
                >
                  3
                </Radio>
                <Radio
                  name='Hour'
                  value='16:00:00'
                  className={`w-full text-center mr-spacing-20 h-fit body-xs-medium py-spacing-10 rounded-radius-8 ${hour === '16:00:00' ? 'bg-color-bg-interactive-disabled-press text-color-text-interactive-inverse' : 'bg-color-bg-interactive-secondary text-color-text-primary'}`}
                >
                  4
                </Radio>
                <Radio
                  name='Hour'
                  value='17:00:00'
                  className={`w-full text-center mr-spacing-20 h-fit body-xs-medium py-spacing-10 rounded-radius-8 ${hour === '17:00:00' ? 'bg-color-bg-interactive-disabled-press text-color-text-interactive-inverse' : 'bg-color-bg-interactive-secondary text-color-text-primary'}`}
                >
                  5
                </Radio>
                <Radio
                  name='Hour'
                  value='18:00:00'
                  className={`w-full text-center mr-spacing-20 h-fit body-xs-medium py-spacing-10 rounded-radius-8 ${hour === '18:00:00' ? 'bg-color-bg-interactive-disabled-press text-color-text-interactive-inverse' : 'bg-color-bg-interactive-secondary text-color-text-primary'}`}
                >
                  6
                </Radio>
                <Radio
                  name='Hour'
                  value='19:00:00'
                  className={`w-full text-center mr-spacing-20 h-fit body-xs-medium py-spacing-10 rounded-radius-8 ${hour === '19:00:00' ? 'bg-color-bg-interactive-disabled-press text-color-text-interactive-inverse' : 'bg-color-bg-interactive-secondary text-color-text-primary'}`}
                >
                  7
                </Radio>
                <Radio
                  name='Hour'
                  value='20:00:00'
                  className={`w-full text-center mr-spacing-20 h-fit body-xs-medium py-spacing-10 rounded-radius-8 ${hour === '20:00:00' ? 'bg-color-bg-interactive-disabled-press text-color-text-interactive-inverse' : 'bg-color-bg-interactive-secondary text-color-text-primary'}`}
                >
                  8
                </Radio>
              </div>
            </RadioGroup>
          )
        ) : null}

        <button
          type='submit'
          disabled={isDisabled}
          className='w-full body-lg-medium text-color-text-interactive-inverse h-fit bg-color-bg-interactive-primary py-spacing-12 rounded-radius-8 disabled:bg-color-bg-disabled'
        >
          완료
        </button>
      </form>
    </div>
  )
}
