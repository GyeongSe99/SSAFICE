import { useNavigate } from 'react-router-dom'
import { useLoginStateStore } from '@/entities/session'
import { useLandingImageAnimation, useLandingPageModel } from '@/features/landing/index'

//MARK: 공통 CSS
/*
  className 순서는 이렇게 작성되었습니다. 
  1) flex 관련 속성(flex, flex-col 등의 방향 설정, gap 설정, justify / items / self 등의 정렬 설정 순서로) 
  2) 크기 관련 속성(width, height, margin, padding, z-index 순서로)
  3) 글자 관련 속성(글자 색, heading, 줄바꿈(whiteSpace) 순서로)
  4) 배경 관련 속성(배경 색, border 순서로) 
  5) 기타 속성(radius, 기타 속성 순서로)
*/
const btnClasses: string = ` 
  px-spacing-24 py-spacing-10
  text-color-text-interactive-secondary body-lg-semibold
  bg-color-bg-interactive-selected 
  rounded-radius-32 
` // 화면 하단 버튼 요소에 공통 적용됩니다.

const selectedBtnClasses: string = `
  ${btnClasses}
  text-color-text-interactive-secondary-press
  bg-color-bg-interactive-selected-press
  border border-color-border-focus-ring border-2
` // 선택된 탭 버튼에 적용됩니다.

export const LandingPage = () => {
  const navigate = useNavigate()
  const isAuthenticated = useLoginStateStore()

  const {
    tabLabels,
    selectedIndex,
    selectedTitle,
    selectedContent,
    selectedImage,
    handleSelectedIndex,
  } = useLandingPageModel()
  const animationClass = useLandingImageAnimation(selectedImage)

  const handleOnClickShortcut = () => {
    isAuthenticated ? navigate('/main') : navigate('/login')
  }

  return (
    <div className='flex flex-col'>
      {/* MARK: 화면 상단
       */}
      <div
        className='
        flex flex-col gap-spacing-40 items-center justify-start
        h-[400px] py-spacing-64
        '
      >
        {/* 헤더 텍스트 영역 */}
        <div className='flex flex-col items-center gap-spacing-16'>
          <div className='flex flex-col items-center gap-spacing-8'>
            <div className='text-color-text-primary heading-desktop-4xl'>SSAFY 일정관리</div>
            <div className='text-color-text-primary heading-desktop-3xl'>
              SSAFICE와 함께 시작하기
            </div>
          </div>
          <div className='text-color-text-primary body-lg-medium'>
            SSAFICE는 SSAFY 구성원에게 최적의 일정 관리 서비스를 제공합니다.
          </div>
        </div>
        <button
          onClick={handleOnClickShortcut}
          className='flex text-white px-spacing-24 py-spacing-10 body-lg-medium bg-color-bg-interactive-primary hover:bg-color-bg-interactive-primary-hover rounded-radius-32'
        >
          SSAFICE 바로가기
        </button>
      </div>

      {/* MARK: 화면 하단
       */}
      <div className='flex flex-col justify-start border-t gap-spacing-40 px-spacing-128 py-spacing-64 border-t-color-border-tertiary'>
        {/* 텍스트, 탭 5개 영역 */}
        <div className='flex flex-col items-center gap-spacing-20'>
          <div className='text-color-text-primary body-xl-semibold'>
            교육생과 프로 모두에게 최적의 경험을 제공합니다.
          </div>
          {/* button tabs */}
          <div className='flex flex-row gap-spacing-16'>
            {tabLabels.map((each, index) => (
              <button
                type='button'
                className={index === selectedIndex ? selectedBtnClasses : btnClasses}
                onClick={() => handleSelectedIndex(index)}
              >
                {each}
              </button>
            ))}
          </div>
        </div>

        {/* 탭 이미지, 상세설명 영역 */}
        <div
          className='
        flex justify-between gap-spacing-32
        h-[400px]
        '
        >
          {/* 탭 설명 영역 */}
          <div className='flex flex-col items-start justify-center gap-spacing-32'>
            <div className='flex flex-col gap-spacing-16'>
              <div className='text-color-text-primary heading-desktop-2xl'>{selectedTitle}</div>
              <div className='whitespace-pre-wrap text-color-text-primary body-lg-medium'>
                {selectedContent}
              </div>
            </div>
            <div className='flex justify-start gap-spacing-12'>
              <button
                onClick={handleOnClickShortcut}
                className='text-color-text-info body-lg-semibold'
              >
                SSAFICE 바로가기 -&gt;
              </button>
            </div>
          </div>

          {/* 이미지 영역 */}
          <div className={`w-[600px] h-[400px] overflow-hidden transform ${animationClass}`}>
            <img
              id='slide-target'
              src={selectedImage}
              className='object-cover w-full h-full'
              alt='탭 이미지'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
