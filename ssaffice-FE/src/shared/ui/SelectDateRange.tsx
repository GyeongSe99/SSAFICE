import { useRef, useState } from 'react'
import { useClickOutsideToggle, useClickedToggle, useDateFormatter } from '../model'
import { DownArrowIcon } from '@/assets/svg'
import { DropDown } from './DropDown/DropDown'
import { DateRange, DayPicker } from 'react-day-picker'

type SelectDateRangeProps = {
  selectedDate: DateRange
  handleSelectedDate: (dateRange: DateRange) => void
  handleFixedDate: () => void
}

export const SelectDateRange = ({
  selectedDate,
  handleSelectedDate,
  handleFixedDate,
}: SelectDateRangeProps) => {
  // dropdown date select
  const { isClicked, setIsClicked, handleIsClicked } = useClickedToggle()
  const dropDownRef = useRef<HTMLDivElement | null>(null)
  useClickOutsideToggle(dropDownRef, setIsClicked)
  const [isChanged, setIsChanged] = useState<boolean>(false)
  const handleIsChanged = () => {
    setIsChanged(true)
  }

  return (
    <>
      {/* dropdown date select area */}
      <div ref={dropDownRef} className='relative'>
        <button
          className={`w-fit px-spacing-8 py-spacing-4 rounded-radius-8 ${isClicked ? 'bg-color-bg-interactive-secondary-press' : 'bg-color-bg-interactive-secondary hover:bg-color-bg-interactive-secondary-hover'} body-sm-medium text-color-text-primary min-w-fit 
            flex gap-spacing-10
          `}
          onClick={handleIsClicked}
        >
          <p>
            {isChanged
              ? `${useDateFormatter('YYYY-MM-DD(string)', selectedDate.from)} ~ ${useDateFormatter('YYYY-MM-DD(string)', selectedDate.to)}`
              : '날짜 선택'}
          </p>
          <DownArrowIcon className={`w-4`} />
        </button>

        <DropDown isOpen={isClicked} isShadow position='top-8' width='w-[25rem]'>
          <DropDown.Content isPaddingY>
            <div className='flex flex-col gap-spacing-8 items-center pb-spacing-4'>
              <DayPicker
                mode='range'
                selected={selectedDate}
                onSelect={handleSelectedDate}
                required
                classNames={{
                  months: 'flex flex-col',
                  month_caption: 'text-color-text-primary',
                  month_grid: 'w-full',
                  day: 'text-center text-color-text-primary',
                  today: ``, // 오늘 날짜 스타일(필요한 경우 추가)
                  range_start: `rounded-tl-radius-circle rounded-bl-radius-circle`,
                  range_end: `rounded-tr-radius-circle rounded-br-radius-circle`,
                  selected: `bg-color-icon-info text-white`,
                  root: `rounded-radius-8 w-[23vw] p-5 `,
                  chevron: `fill-color-icon-info`,
                }}
              />
              <button
                className='
                  bg-color-bg-info w-[80px] h-[35px]
                  hover:bg-color-bg-primary-hover
                  active:bg-color-bg-interactive-primary-press
                  text-color-text-interactive-inverse
                  rounded-radius-8
              '
                onClick={() => {
                  handleFixedDate()
                  handleIsClicked()
                  handleIsChanged()
                }}
              >
                적용
              </button>
            </div>
          </DropDown.Content>
        </DropDown>
      </div>
    </>
  )
}
