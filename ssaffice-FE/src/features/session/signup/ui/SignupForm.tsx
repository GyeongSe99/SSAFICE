import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CohortSelector, RegionSelector, TrackSelector } from './UserInfoSelector'
import { useUserIdStore, useUserSsoInfo } from '@/entities/session'
import { postUserSignup } from '@/shared/api/User'
import { EyeOpenIcon, EyeCloseIcon } from '@/assets/svg'

export const SignupForm = () => {
  const navigate = useNavigate()

  const userId = useUserIdStore()

  const [isDisabled, setIsDisabled] = useState(true)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const { data: userSsoInfo } = useUserSsoInfo(userId)

  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [cohort, setCohort] = useState(0)
  const [region, setRegion] = useState('')
  const [track, setTrack] = useState('')
  const [class_, setClass] = useState(0)

  useEffect(() => {
    if (cohort && region && class_) {
      setNickname(`${userSsoInfo?.name}[${cohort}기_${region.split('/')[1]} ${class_}반]`)
    } else if (cohort && region && !class_) {
      setNickname(`${userSsoInfo?.name}`)
    }

    if (!password || !cohort || !region || !track || !class_) {
      setIsDisabled(true)
      return
    }

    setIsDisabled(false)
  }, [password, cohort, region, track, class_])

  const handleOnClickPasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleOnChangeClass = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    if (value.length > 2) {
      value = value.slice(0, 2)
    }
    setClass(parseInt(value))
  }

  const handleOnClickSignup = () => {
    postUserSignup(userId, {
      email: userSsoInfo?.email,
      password: password,
      name: nickname,
      roleIds: ['ROLE_USER'],
      cohortNum: cohort,
      regionCd: region,
      trackCd: track,
      classNum: class_,
    })
    navigate('/login')
  }

  return (
    <div className='flex flex-col w-full h-full gap-y-spacing-64'>
      <div className='flex flex-col w-full h-full gap-y-spacing-24'>
        <div className='flex items-center justify-between'>
          <p className='body-md-semibold text-color-text-tertiary min-w-max'>이메일</p>
          <p className='body-sm-medium text-color-text-disabled'>{userSsoInfo?.email}</p>
        </div>
        <div className='flex items-center justify-between'>
          <p className='body-md-semibold text-color-text-tertiary min-w-max'>비밀번호</p>
          <div className='relative flex items-center'>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder='PASSWORD'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-[348px] border border-color-border-secondary rounded-radius-8 body-sm-medium text-color-text-disabled pl-spacing-16 pr-spacing-48 py-spacing-8 focus:outline-none placeholder:text-color-text-disabled'
            />
            <button onClick={handleOnClickPasswordVisible} className='absolute right-spacing-16'>
              {isPasswordVisible ? (
                <EyeOpenIcon className='w-6' />
              ) : (
                <EyeCloseIcon className='w-6' />
              )}
            </button>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <p className='body-md-semibold text-color-text-tertiary min-w-max'>닉네임</p>
          <p className='body-sm-medium text-color-text-disabled'>
            {nickname ? `${nickname}` : `${userSsoInfo?.name}`}
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <p className='body-md-semibold text-color-text-tertiary min-w-max'>기수</p>
          <CohortSelector value={cohort} setValue={setCohort} />
        </div>
        <div className='flex items-center justify-between'>
          <p className='body-md-semibold text-color-text-tertiary min-w-max'>지역</p>
          <RegionSelector value={region} setValue={setRegion} />
        </div>
        <div className='flex items-center justify-between'>
          <p className='body-md-semibold text-color-text-tertiary min-w-max'>트랙</p>
          <TrackSelector value={track} setValue={setTrack} />
        </div>
        <div className='flex items-center justify-between'>
          <p className='body-md-semibold text-color-text-tertiary min-w-max'>반</p>
          <input
            type='number'
            placeholder='0'
            onChange={handleOnChangeClass}
            value={class_ ? class_ : ''}
            className='w-[49px] border text-center border-color-border-secondary rounded-radius-8 body-sm-medium text-color-text-disabled py-spacing-8 focus:outline-none placeholder:text-color-text-disabled focus:placeholder:text-color-bg-primary'
          />
        </div>
      </div>
      <button
        onClick={handleOnClickSignup}
        disabled={isDisabled}
        className='w-full h-fit py-spacing-16 body-lg-medium text-color-icon-interactive-inverse bg-color-bg-interactive-primary rounded-radius-8 disabled:bg-color-bg-disabled'
      >
        회원가입
      </button>
    </div>
  )
}
