import { useState } from 'react'
import { XIcon } from '@/assets/svg'

type AddTeamModalProps = {
  setIsOpen: (isOpen: boolean) => void
  userIds: number[]
  setUserIds: (userIds: number[]) => void
  userNameList: string[]
  setUserNameList: (userNameList: string[]) => void
}

export const AddTeamModal = ({
  setIsOpen,
  userIds,
  setUserIds,
  userNameList,
  setUserNameList,
}: AddTeamModalProps) => {
  const [idList, setIdList] = useState<number[]>(userIds)
  const [nameList, setNameList] = useState<string[]>(userNameList)

  // const handleOnclickUser = (userId: string, userName: string) => {
  //   setIdList((prev) => Array.from(new Set([userId, ...prev])))
  //   setNameList((prev) => Array.from(new Set([userName, ...prev])))
  // }

  const handleOnclickX = (idx: number) => {
    const newNameList = nameList.filter((_, index) => index !== idx)
    setNameList(newNameList)

    const newIdsList = idList.filter((_, index) => index !== idx)
    setIdList(newIdsList)
  }

  const handleOnClickSubmit = () => {
    setUserIds(idList)
    setUserNameList(nameList)
    setIsOpen(false)
  }

  return (
    <div className='z-50 absolute right-2.5 top-12 flex flex-col gap-y-spacing-24 border w-[480px] h-fit bg-color-bg-primary rounded-radius-8 px-spacing-32 py-spacing-16 border-color-border-tertiary'>
      <h1 className='w-full text-center heading-desktop-sm text-color-text-primary'>팀 검색</h1>

      <div className='flex flex-col gap-y-spacing-8'>
        {nameList.map((userName, index) => (
          <div key={index} className='flex items-center gap-x-spacing-4'>
            <button onClick={() => handleOnclickX(index)}>
              <XIcon className='w-4' />
            </button>
            <p className='body-md-medium text-color-text-primary'>{userName}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleOnClickSubmit}
        className='w-full h-fit bg-color-bg-interactive-primary py-spacing-12 rounded-radius-8 body-lg-medium text-color-text-interactive-inverse'
      >
        추가하기
      </button>
    </div>
  )
}
