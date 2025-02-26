import { useRef, useState } from 'react'
import { DropDown } from '@/shared/ui'
import { instance } from '@/shared/api'
import { putUserNickname, postUserProfileImg } from '@/shared/api/User'
import { useClickOutsideToggle } from '@/shared/model'
import { LogoutIcon, MattermostIcon, EditProfileIcon, CameraIcon } from '@/assets/svg'
import { useNavigate } from 'react-router-dom'
import {
  useLoginStateStore,
  useSetLoginStateStore,
  useSetProtectRoleStore,
  useMattermostSyncStore,
  useSetMattermostSyncStore,
} from '@/entities/session'
import { useQuery } from '@tanstack/react-query'

export const ClickProfileButton = () => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024

  const [isOpen, setIsOpen] = useState(false)
  const [isEditProfile, setIsEditProfile] = useState(false)
  const [isEditTitle, setIsEditTitle] = useState(false)
  const [myName, setMyName] = useState('')
  const [title, setTitle] = useState('')
  const [imgUrl, setImgUrl] = useState<null | string>(null)
  const dropDownRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  // store
  const isAuthenticated = useLoginStateStore()
  const setIsAuthenticated = useSetLoginStateStore()
  const setProtectRole = useSetProtectRoleStore()
  const mattermostSync = useMattermostSyncStore()
  const setMattermostSync = useSetMattermostSyncStore()

  // qurey
  const { data } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const response = await instance.get('/api/users/me')
      if (response) {
        const role = response.data.roles[0].roleId
        const mmSync = response.data.recentMmChannelSyncTime

        if (role) {
          setProtectRole(role)
        }

        if (mmSync) {
          setMattermostSync(mmSync.toString())
        }

        setMyName(response.data.name)
        setTitle(response.data.name)
        setImgUrl(response.data.profileImgUrl)
      }
      return response.data
    },
    enabled: isAuthenticated,
  })

  useClickOutsideToggle(dropDownRef, setIsOpen)

  // 유저 아이콘 누를 시
  const handleOnClickUserIcon = () => {
    setIsOpen(!isOpen)

    if (!isOpen) {
      setIsEditProfile(false)
      setIsEditTitle(false)
      setTitle(myName)
    }
  }

  // 프로필 변경 버튼 누를 시
  const handleOnClickEditProfile = () => {
    setIsEditProfile(!isEditProfile)

    if (isEditProfile) {
      setTitle(myName)
      setIsEditTitle(false)
    }
  }

  // 닉네임 변경 버튼 누를 시
  const handleOnClickEditTitle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsEditTitle(!isEditTitle)
  }

  // 닉네임 변경 저장 버튼 누를 시
  const handleOnClickSaveTitle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (title === myName) {
      event.stopPropagation()
      setIsEditTitle(false)
      return
    }

    putUserNickname(title).then(() => {
      setMyName(title)
      setIsEditTitle(false)
    })
  }

  // 프로필 이미지 업로드(변경)
  const handlePostProfileImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    const file = event.target.files[0]

    if (file.size > MAX_FILE_SIZE) {
      alert('파일 크기가 너무 큽니다. 5MB 이하의 파일을 업로드해주세요.')
      return
    }

    const formData = new FormData()
    formData.append('profileImg', file)

    postUserProfileImg(formData)
      .then(() => {
        setImgUrl(URL.createObjectURL(file))
      })
      .catch((error) => {
        console.error(error.message)
      })
  }

  // 로그아웃 버튼 누를 시
  const handleOnClickLogout = () => {
    localStorage.removeItem('access_token')
    setIsAuthenticated(false)
    setMattermostSync(null)
    setProtectRole(null)
    navigate('/login')
  }

  return (
    <div ref={dropDownRef} className='relative'>
      <button
        onClick={handleOnClickUserIcon}
        className={`p-1 rounded-full ${isOpen ? 'bg-color-bg-interactive-secondary-press' : 'hover:bg-color-bg-interactive-secondary-hover'}`}
      >
        {imgUrl ? (
          <img
            src={imgUrl}
            alt='내 프로필 사진'
            className='object-cover object-center rounded-full w-7 aspect-square'
          />
        ) : (
          <div className='flex items-center justify-center size-7 rounded-radius-circle bg-color-bg-interactive-selected-press'>
            <p className='body-sm-medium text-color-text-interactive-inverse'>{myName[0]}</p>
          </div>
        )}
      </button>

      {/* DropDown 컴포넌트 */}
      <DropDown
        isOpen={isOpen}
        isShadow={true}
        isDivide={true}
        width='w-[372px]'
        position='right-0 mt-spacing-8'
      >
        <DropDown.Content isPaddingY={true}>
          <DropDown.Image>
            {imgUrl ? (
              <div className='relative'>
                <label
                  htmlFor='profileImg'
                  className={`relative ${isEditProfile ? 'cursor-pointer' : ''}`}
                >
                  <img
                    src={imgUrl}
                    alt='내 프로필 사진'
                    className='object-cover object-center w-10 rounded-full aspect-square'
                  />
                  {isEditProfile && (
                    <>
                      <CameraIcon className='absolute bottom-0 right-0 w-3.5' />
                      <input
                        type='file'
                        accept='image/*'
                        id='profileImg'
                        onChange={handlePostProfileImg}
                        className='hidden'
                      />
                    </>
                  )}
                </label>
              </div>
            ) : (
              <>
                <label
                  htmlFor='profileImg'
                  className={`relative ${isEditProfile ? 'cursor-pointer' : ''}`}
                >
                  <div className='flex items-center justify-center w-10 aspect-square bg-color-bg-interactive-selected-press rounded-radius-circle'>
                    <p className='body-lg-medium text-color-text-interactive-inverse'>
                      {myName[0]}
                    </p>
                  </div>
                  {isEditProfile && (
                    <>
                      <CameraIcon className='absolute bottom-0 right-0 w-3.5' />
                      <input
                        type='file'
                        accept='image/*'
                        id='profileImg'
                        onChange={handlePostProfileImg}
                        className='hidden'
                      />
                    </>
                  )}
                </label>
              </>
            )}
          </DropDown.Image>

          <div className='flex flex-col gap-y-spacing-2'>
            <div className='flex items-center justify-between w-full'>
              <DropDown.Title
                titleType={isEditTitle ? 'EDIT' : 'VIEW'}
                title={title}
                setTitle={setTitle}
                onClickEvent={handleOnClickSaveTitle}
              >
                {myName}
              </DropDown.Title>
              {isEditProfile && !isEditTitle && (
                <button onClick={handleOnClickEditTitle}>
                  <EditProfileIcon className='w-4 fill-color-icon-tertiary' />
                </button>
              )}
            </div>
            <div className='flex items-center gap-x-spacing-8'>
              <DropDown.SubTitle>{data?.email}</DropDown.SubTitle>
              {mattermostSync && (
                <div className='flex items-center w-fit gap-x-spacing-2 h-fit bg-color-bg-info pl-spacing-4 pr-spacing-6 py-spacing-2 rounded-radius-circle'>
                  <MattermostIcon className='size-3' />
                  <p className='body-xs-medium text-color-text-interactive-inverse'>인증됨</p>
                </div>
              )}
            </div>
          </div>
        </DropDown.Content>

        <DropDown.Content
          onClickEvent={handleOnClickEditProfile}
          isHover={!isEditProfile}
          isFocus={isEditProfile}
          isPaddingY={true}
        >
          <DropDown.Image>
            <EditProfileIcon className='w-4' />
          </DropDown.Image>
          <DropDown.SubTitle color='text-color-text-primary'>
            {isEditProfile ? '프로필 변경 완료' : '프로필 변경'}
          </DropDown.SubTitle>
        </DropDown.Content>

        <DropDown.Content onClickEvent={handleOnClickLogout} isHover={true} isPaddingY={true}>
          <DropDown.Image>
            <LogoutIcon className='w-4' />
          </DropDown.Image>
          <DropDown.SubTitle color='text-color-text-danger'>로그아웃</DropDown.SubTitle>
        </DropDown.Content>
      </DropDown>
    </div>
  )
}
