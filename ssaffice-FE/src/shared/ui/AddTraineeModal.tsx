import { useMemo, useState } from 'react'
import { SearchBar } from './SearchBar'
import { useSearchUserName } from '@/shared/api/Search'
import { XIcon } from '@/assets/svg'

type userListProps = {
  userId: number
  email: string
  name: string
  profileUrl: string
}

type AddTraineeModalProps = {
  setIsOpen: (isOpen: boolean) => void
  userIds: number[]
  setUserIds: (userIds: number[]) => void
  userNameList: string[]
  setUserNameList: (userNameList: string[]) => void
}

export const AddTraineeModal = ({
  setIsOpen,
  userIds,
  setUserIds,
  userNameList,
  setUserNameList,
}: AddTraineeModalProps) => {
  const [searchValue, setSearchValue] = useState('')
  const [idList, setIdList] = useState<number[]>(userIds)
  const [nameList, setNameList] = useState<string[]>(userNameList)

  const { data: user } = useSearchUserName(searchValue)

  const handleOnclickUser = (userId: number, userName: string) => {
    if (!idList.includes(userId)) {
      setIdList((prev) => [userId, ...prev])
      setNameList((prev) => [userName, ...prev])
      return
    }
  }

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

  const searchResult = useMemo(() => {
    switch (searchValue) {
      case '':
        return (
          <div className='w-full h-[416px] border flex items-center justify-center border-color-border-primary rounded-radius-4'>
            <p className='body-lg-medium text-color-text-disabled'>검색어를 입력해주세요.</p>
          </div>
        )
      default:
        if (!user)
          return (
            <div className='w-full h-[416px] border flex items-center justify-center border-color-border-primary rounded-radius-4' />
          )

        return (
          <div className='w-full h-[416px] border flex divide-y divide-color-border-secondary flex-col border-color-border-primary rounded-radius-4'>
            {user.length === 0 ? (
              <div className='flex items-center justify-center w-full h-full'>
                <p className='body-lg-medium text-color-text-disabled'>검색 결과가 없습니다.</p>
              </div>
            ) : (
              user.map((user: userListProps) => (
                <button
                  key={user.userId}
                  disabled={idList.includes(user.userId)}
                  onClick={() => handleOnclickUser(user.userId, user.name)}
                  className={`flex items-center overflow-y-auto gap-x-spacing-12 px-spacing-16 py-spacing-10 scrollbar-hide hover:bg-color-bg-interactive-secondary-hover disabled:cursor-pointer`}
                >
                  <img
                    src={user.profileUrl}
                    alt='프로필 이미지'
                    className='w-8 h-8 rounded-radius-circle'
                  />
                  <p className='max-w-[320px] truncate body-md-medium text-color-text-primary'>
                    {user.name}
                  </p>
                </button>
              ))
            )}
          </div>
        )
    }
  }, [user, idList])

  return (
    <div className='z-50 absolute right-2.5 top-12 flex flex-col gap-y-spacing-24 border w-[480px] h-fit bg-color-bg-primary rounded-radius-8 px-spacing-32 py-spacing-16 border-color-border-tertiary'>
      <h1 className='w-full text-center heading-desktop-sm text-color-text-primary'>교육생 검색</h1>
      <SearchBar setSearchValue={setSearchValue} />
      {searchResult}
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
