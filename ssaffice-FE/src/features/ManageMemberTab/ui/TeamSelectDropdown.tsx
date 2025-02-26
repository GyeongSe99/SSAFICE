import { CheckedCircle, DownArrowIcon, ExitButton, SpreadRight } from '@/assets/svg'
import { useClickedToggle, useClickOutsideToggle } from '@/shared/model'
import { DropDown } from '@/shared/ui'
import { useRef } from 'react'
import { MattermostChannel, MattermostTeam } from '../model/types'

type TeamSelectDropdownProps = {
  handleSelectedIndex: (index: number) => void
  selectedIndex: number | undefined
  channelList: MattermostChannel[] | undefined
  saveSelectedChannels: (closeRequest: () => void) => void
  handleSelectChannel: (channel: MattermostChannel, checked: boolean) => void
  selectedChannel: MattermostChannel | null
  tabName: string | null
  mattermostTeams: MattermostTeam[] | null
}
export const TeamSelectDropdown = ({
  handleSelectedIndex,
  selectedIndex,
  channelList,
  saveSelectedChannels,
  handleSelectChannel,
  selectedChannel,
  tabName,
  mattermostTeams,
}: TeamSelectDropdownProps) => {
  const { isClicked, setIsClicked, handleIsClicked } = useClickedToggle()
  const dropDownRef = useRef<HTMLDivElement | null>(null)

  useClickOutsideToggle(dropDownRef, setIsClicked)

  return (
    <div ref={dropDownRef} className='relative'>
      <button
        className='flex items-center justify-center gap-spacing-8 w-fit p-spacing-20'
        onClick={handleIsClicked}
      >
        <div className=' text-color-text-primary heading-desktop-lg'>
          {tabName ? tabName : '팀 선택'}
        </div>
        <div className='flex items-center justify-center border w-spacing-24 h-spacing-24 border-color-border-primary rounded-radius-4'>
          <DownArrowIcon className='w-13' />
        </div>
      </button>

      {/* Dropdown 컴포넌트 */}
      <DropDown isOpen={isClicked} width='w-[640px]' position='top-10 left-5'>
        <div
          className='
          flex flex-col gap-spacing-12
          h-[505px] px-[39px] py-spacing-32
        '
        >
          <div className='flex justify-between h-[29px]'>
            <div className='text-color-text-primary heading-desktop-lg'>팀 선택</div>
            <button className='h-[14px] w-[14px]' onClick={handleIsClicked}>
              <ExitButton />
            </button>
          </div>

          <div className='flex w-full h-full'>
            <div
              className={`
                flex flex-col gap-spacing-4 ${mattermostTeams && mattermostTeams.length == 0 && 'justify-center'}
                w-1/2 h-full
                border-r border-spacing-1 border-color-border-secondary 
                overflow-y-scroll 
              `}
            >
              {mattermostTeams && mattermostTeams.length > 0 ? (
                mattermostTeams.map((each, index) => (
                  <button
                    className={`
                    flex justify-between gap-spacing-10 
                    h-[51px] p-spacing-16
                    ${index === selectedIndex && 'bg-color-bg-interactive-secondary-press'}
                    hover:bg-color-bg-interactive-secondary-hover
                    active:bg-color-bg-interactive-secondary-press
                    
                    `}
                    onClick={() => handleSelectedIndex(index)}
                    key={each.teamId}
                  >
                    <div className='text-color-text-primary body-md-medium'>{each.name}</div>
                    <div className='flex items-center justify-end h-full'>
                      <div className='flex items-center justify-center w-spacing-12 h-spacing-12'>
                        <div className='w-spacing-6 h-spacing-10'>
                          <SpreadRight />
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className='text-center whitespace-pre-line'>
                  {`MM 팀 정보를 가져올 수 없습니다.\n관리자에게 문의해 주세요.`}
                </div>
              )}
            </div>
            <div className='flex flex-col w-1/2 h-full'>
              {/* hover하는 팀명에 따라 렌더링되는 채널 리스트 달라야 합니다 */}
              {channelList === undefined && (
                <div className='flex items-center justify-center w-full h-full text-center whitespace-pre-line text-color-text-disabled body-md-medium'>
                  {`팀을 선택하면
                  채널을 확인할 수 있습니다.`}
                </div>
              )}
              {channelList?.map((each) => (
                <div key={each.channelId} className='hover:bg-color-bg-interactive-secondary-hover'>
                  <label
                    htmlFor={`radioChannel-${each.channelId}`}
                    className='flex justify-between gap-spacing-10 h-[51px] p-spacing-16'
                  >
                    <div className='text-color-text-primary body-md-medium'>{each.name}</div>
                    <input
                      className='w-0 h-0 opacity-0'
                      id={`radioChannel-${each.channelId}`}
                      type='radio'
                      value={each.channelId}
                      checked={selectedChannel?.channelId === each.channelId}
                      onChange={(e) => handleSelectChannel(each, e.target.checked)}
                    />
                    {selectedChannel?.channelId === each.channelId ? (
                      <CheckedCircle />
                    ) : (
                      <div className='flex border rounded-full w-spacing-20 h-spacing-20 border-spacing-1 border-color-border-secondary aspect-square'></div>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {selectedChannel && (
            <button
              className='
                flex self-end justify-center items-center
                w-[60px] h-[35px] py-spacing-8 px-spacing-16
                text-color-text-interactive-inverse body-md-medium
                bg-color-bg-interactive-primary
                rounded-radius-4
                hover:bg-color-bg-interactive-primary-hover
                active:bg-color-bg-interactive-primary-press
                '
              onClick={() => saveSelectedChannels(handleIsClicked)}
            >
              적용
            </button>
          )}
        </div>
      </DropDown>
    </div>
  )
}
