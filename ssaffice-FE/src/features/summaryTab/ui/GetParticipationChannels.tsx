import { DropDown } from '@/shared/ui'
import { useClickOutsideToggle } from '@/shared/model'
import { useRef, useState } from 'react'
import { useGetUserChannels } from '../model/useGetUserChannels'

export const GetParticipationChannels = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropDownRef = useRef<HTMLDivElement | null>(null)

  useClickOutsideToggle(dropDownRef, setIsOpen)

  const handleOnClickButton = () => {
    setIsOpen(!isOpen)
  }

  const channels = useGetUserChannels()

  return (
    <div ref={dropDownRef} className='relative flex flex-col'>
      <div className='flex gap-spacing-16 mb-spacing-4'>
        <h2 className='heading-desktop-lg text-color-text-primary min-w-max'>참여 채널 리스트</h2>
        <button
          onClick={handleOnClickButton}
          className='body-xs-semibold text-color-text-info min-w-max'
        >
          전체 보기
        </button>
      </div>

      <DropDown isOpen={isOpen} isDivide={true} width='w-60' position='top-spacing-32 right-0'>
        {channels.map((each) => (
          <DropDown.Content isPaddingY={true} key={each.teamId}>
            <DropDown.SubTitle color='text-color-text-primary'>{each.name}</DropDown.SubTitle>
          </DropDown.Content>
        ))}
      </DropDown>

      <ul className='flex flex-col border-t body-md-medium px-spacing-4 py-spacing-10 border-color-border-info gap-y-spacing-10 text-color-text-primary min-w-max'>
        {channels.slice(0, 3).map((each, index) => (
          <li key={index}>{each.name}</li>
        ))}
      </ul>
    </div>
  )
}
