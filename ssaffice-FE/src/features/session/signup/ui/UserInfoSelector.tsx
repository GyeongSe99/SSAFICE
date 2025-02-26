import { Fragment, useEffect, useMemo, useRef, useState } from 'react'

import { DropDown } from '@/shared/ui'
import { useClickOutsideToggle, useHover } from '@/shared/model'

import { DownArrowIcon } from '@/assets/svg'

type SelectorProps = {
  value: string | number
  setValue: React.Dispatch<React.SetStateAction<any>>
}

// 기수
export const CohortSelector = ({ value, setValue }: SelectorProps) => {
  const dropDownRef = useRef<HTMLDivElement | null>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [isDefaultHover, setIsDefaultHover] = useState(true)

  // hook
  useClickOutsideToggle(dropDownRef, setIsOpen)
  const [hoverRef, isHover] = useHover<HTMLDivElement>()

  // effect
  // hover 이벤트 발생 시, 기본 hover 상태를 해제
  useEffect(() => {
    if (!isDefaultHover) return

    if (isHover) {
      setIsDefaultHover(false)
    }
  }, [isHover])

  // dropDown이 닫힐 때, 기본 hover 상태로 변경
  useEffect(() => {
    if (!isOpen) {
      setIsDefaultHover(true)
    }
  }, [isOpen])

  const handleOnClickOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleOnClickContent = (cohort: number) => {
    setValue(cohort)
    setIsOpen(!isOpen)
  }

  return (
    <div ref={dropDownRef} className='relative'>
      <button onClick={handleOnClickOpen} className='flex items-center '>
        <p className='body-sm-medium min-w-max text-color-text-primary'>
          {value === 0 ? '기수 선택' : `${value}`}
        </p>
        <DownArrowIcon className='w-5' />
      </button>

      <div ref={hoverRef}>
        <DropDown isOpen={isOpen} position='top-7 right-0' width='w-[200px]' isPaddingY={true}>
          <DropDown.Content
            onClickEvent={() => handleOnClickContent(13)}
            isHover={true}
            isHoverHighLight={true}
            isDefaultHover={isDefaultHover}
          >
            <p className='body-xs-medium text-color-text-primary'>13</p>
          </DropDown.Content>
          {Array.from({ length: 12 }, (_, i) => 12 - i).map((number) => (
            <Fragment key={number}>
              <DropDown.Content
                onClickEvent={() => handleOnClickContent(number)}
                isHover={true}
                isHoverHighLight={true}
              >
                <p className='body-xs-medium text-color-text-primary'>{number}</p>
              </DropDown.Content>
            </Fragment>
          ))}
        </DropDown>
      </div>
    </div>
  )
}

// 지역
export const RegionSelector = ({ value, setValue }: SelectorProps) => {
  const dropDownRef = useRef<HTMLDivElement | null>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [isDefaultHover, setIsDefaultHover] = useState(true)

  const formattedRegion = useMemo(() => {
    switch (value) {
      case 'SEOUL/서울':
        return '서울'
      case 'DAEGU/대구':
        return '대구'
      case 'BU_UL_GYEONG/부울경':
        return '부울경'
      case 'GWANGJU/광주':
        return '광주'
      case 'DAEJEON/대전':
        return '대전'
      default:
        return '지역 선택'
    }
  }, [value])

  // hook
  useClickOutsideToggle(dropDownRef, setIsOpen)
  const [hoverRef, isHover] = useHover<HTMLDivElement>()

  // effect
  // hover 이벤트 발생 시, 기본 hover 상태를 해제
  useEffect(() => {
    if (!isDefaultHover) return

    if (isHover) {
      setIsDefaultHover(false)
    }
  }, [isHover])

  // dropDown이 닫힐 때, 기본 hover 상태로 변경
  useEffect(() => {
    if (!isOpen) {
      setIsDefaultHover(true)
    }
  }, [isOpen])

  const handleOnClickOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleOnClickContent = (region: string) => {
    setValue(region)
    setIsOpen(!isOpen)
  }

  return (
    <div ref={dropDownRef} className='relative'>
      <button onClick={handleOnClickOpen} className='flex items-center '>
        <p className='body-sm-medium min-w-max text-color-text-primary'>{formattedRegion}</p>
        <DownArrowIcon className='w-5' />
      </button>

      <div ref={hoverRef}>
        <DropDown isOpen={isOpen} position='top-7 right-0' width='w-[200px]' isPaddingY={true}>
          <DropDown.Content
            onClickEvent={() => handleOnClickContent('SEOUL/서울')}
            isHover={true}
            isHoverHighLight={true}
            isDefaultHover={isDefaultHover}
          >
            <p className='body-xs-medium text-color-text-primary'>서울</p>
          </DropDown.Content>
          <DropDown.Content
            onClickEvent={() => handleOnClickContent('DAEGU/대구')}
            isHover={true}
            isHoverHighLight={true}
          >
            <p className='body-xs-medium text-color-text-primary'>대구</p>
          </DropDown.Content>
          <DropDown.Content
            onClickEvent={() => handleOnClickContent('BU_UL_GYEONG/부울경')}
            isHover={true}
            isHoverHighLight={true}
          >
            <p className='body-xs-medium text-color-text-primary'>부울경</p>
          </DropDown.Content>
          <DropDown.Content
            onClickEvent={() => handleOnClickContent('GWANGJU/광주')}
            isHover={true}
            isHoverHighLight={true}
          >
            <p className='body-xs-medium text-color-text-primary'>광주</p>
          </DropDown.Content>
          <DropDown.Content
            onClickEvent={() => handleOnClickContent('DAEJEON/대전')}
            isHover={true}
            isHoverHighLight={true}
          >
            <p className='body-xs-medium text-color-text-primary'>대전</p>
          </DropDown.Content>
        </DropDown>
      </div>
    </div>
  )
}

// 트랙
export const TrackSelector = ({ value, setValue }: SelectorProps) => {
  const dropDownRef = useRef<HTMLDivElement | null>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [isDefaultHover, setIsDefaultHover] = useState(true)

  const formattedRegion = useMemo(() => {
    switch (value) {
      case 'NON_MAJOR_PYTHON':
        return '비전공 파이썬'
      case 'NON_MAJOR_JAVA':
        return '비전공 자바'
      case 'MAJOR_JAVA':
        return '전공 자바'
      case 'EMBEDDED':
        return '임베디드'
      case 'MOBILE':
        return '모바일'
      case 'DATA':
        return '데이터'
      default:
        return '트랙 선택'
    }
  }, [value])

  // hook
  useClickOutsideToggle(dropDownRef, setIsOpen)
  const [hoverRef, isHover] = useHover<HTMLDivElement>()

  // effect
  // hover 이벤트 발생 시, 기본 hover 상태를 해제
  useEffect(() => {
    if (!isDefaultHover) return

    if (isHover) {
      setIsDefaultHover(false)
    }
  }, [isHover])

  // dropDown이 닫힐 때, 기본 hover 상태로 변경
  useEffect(() => {
    if (!isOpen) {
      setIsDefaultHover(true)
    }
  }, [isOpen])

  const handleOnClickOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleOnClickContent = (region: string) => {
    setValue(region)
    setIsOpen(!isOpen)
  }

  return (
    <div ref={dropDownRef} className='relative'>
      <button onClick={handleOnClickOpen} className='flex items-center '>
        <p className='body-sm-medium min-w-max text-color-text-primary'>{formattedRegion}</p>
        <DownArrowIcon className='w-5' />
      </button>

      <div ref={hoverRef}>
        <DropDown isOpen={isOpen} position='top-7 right-0' width='w-[200px]' isPaddingY={true}>
          <DropDown.Content
            onClickEvent={() => handleOnClickContent('NON_MAJOR_PYTHON')}
            isHover={true}
            isHoverHighLight={true}
            isDefaultHover={isDefaultHover}
          >
            <p className='body-xs-medium text-color-text-primary'>비전공 파이썬</p>
          </DropDown.Content>
          <DropDown.Content
            onClickEvent={() => handleOnClickContent('NON_MAJOR_JAVA')}
            isHover={true}
            isHoverHighLight={true}
          >
            <p className='body-xs-medium text-color-text-primary'>비전공 자바</p>
          </DropDown.Content>
          <DropDown.Content
            onClickEvent={() => handleOnClickContent('MAJOR_JAVA')}
            isHover={true}
            isHoverHighLight={true}
          >
            <p className='body-xs-medium text-color-text-primary'>전공 자바</p>
          </DropDown.Content>
          <DropDown.Content
            onClickEvent={() => handleOnClickContent('EMBEDDED')}
            isHover={true}
            isHoverHighLight={true}
          >
            <p className='body-xs-medium text-color-text-primary'>임베디드</p>
          </DropDown.Content>
          <DropDown.Content
            onClickEvent={() => handleOnClickContent('MOBILE')}
            isHover={true}
            isHoverHighLight={true}
          >
            <p className='body-xs-medium text-color-text-primary'>모바일</p>
          </DropDown.Content>
          <DropDown.Content
            onClickEvent={() => handleOnClickContent('DATA')}
            isHover={true}
            isHoverHighLight={true}
          >
            <p className='body-xs-medium text-color-text-primary'>데이터</p>
          </DropDown.Content>
        </DropDown>
      </div>
    </div>
  )
}
