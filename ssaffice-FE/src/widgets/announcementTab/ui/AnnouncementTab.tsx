import {
  useIsTabOpenStore,
  useSetIsTabOpenStore,
  useIsAnimationStore,
  useSetIsAnimationStore,
  useIsFirstRenderStore,
  useSetIsFirstRenderStore,
  SummaryContext,
} from '@/shared/model'
import {
  SearchBar,
  TabLayout,
  HoverButton,
  RefreshMattermostConnection,
  useElementOverflow,
} from '@/shared/ui'
import { FastLeftArrowIcon } from '@/assets/svg'
import { AnnouncementList } from './AnnouncementList'
import { useAnnouncementTabSelectView } from '@/features/announcementTab'
import { UnscheduledList } from '@/widgets/unscheduledTab'
import { useContext, useEffect, useRef, useState } from 'react'

export const AnnouncementTab = () => {
  const [page, setPage] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [searchValue, setSearchValue] = useState('')

  // hook
  const { isOverflow, overflowCalcTrigger } = useElementOverflow({
    ref: containerRef,
    isHeight: true,
  })

  // context
  const summaryContext = useContext(SummaryContext)
  if (!summaryContext)
    throw new Error('no Provider Error : SummaryContext, called at AnnouncementTab')

  // store
  const isTabOpen = useIsTabOpenStore()
  const setIsTabOpen = useSetIsTabOpenStore()

  const isAnimation = useIsAnimationStore()
  const setIsAnimation = useSetIsAnimationStore()

  const isFirstRender = useIsFirstRenderStore()
  const setIsFirstRender = useSetIsFirstRenderStore()

  // animation
  const tabAnimationClass = `${isAnimation ? 'animate-slideShrink' : !isFirstRender ? 'animate-slideExpand' : null}`
  const contentsAnimationClass = `${isAnimation ? 'animate-fadeOut' : !isFirstRender ? 'animate-fadeIn' : null}`

  // event
  const handleOnClickClose = () => {
    if (isFirstRender) {
      setIsFirstRender(false)
    }

    setIsAnimation(true)

    setTimeout(() => {
      setIsTabOpen(isTabOpen)
    }, 400)
  }

  const { isAllNoticeView, handleNoticeViewSelect, selectedStyle, unselectedStyle } =
    useAnnouncementTabSelectView()

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current
        // console.log(scrollTop, scrollHeight, clientHeight)
        if (scrollTop + clientHeight >= scrollHeight) {
          setPage && setPage((prevPage: number) => prevPage + 1)
        }
      }
    }

    const container = containerRef.current
    container?.addEventListener('scroll', handleScroll)

    return () => {
      container?.removeEventListener('scroll', handleScroll)
    }
  }, [setPage])

  return (
    <TabLayout animation={tabAnimationClass}>
      <TabLayout.Header animation={contentsAnimationClass}>
        <div className='flex heading-desktop-xl'>
          <div
            onClick={() => {
              handleNoticeViewSelect('미등록 공지')
              setPage(0)
            }}
            className={isAllNoticeView ? unselectedStyle : selectedStyle}
          >
            미등록 공지
          </div>
          <div className='text-color-text-primary'>&nbsp;|&nbsp;</div>
          <div
            onClick={() => {
              handleNoticeViewSelect('전체 공지')
              setPage(0)
            }}
            className={isAllNoticeView ? selectedStyle : unselectedStyle}
          >
            전체 공지
          </div>
        </div>
        <HoverButton
          icon={<FastLeftArrowIcon className='w-6' />}
          tooltip='공지 접기'
          onClickEvent={handleOnClickClose}
        />
      </TabLayout.Header>

      <TabLayout.Add animation={contentsAnimationClass}>
        <div className='pb-spacing-8' onClick={summaryContext.summaryRefresher} role='presentation'>
          <RefreshMattermostConnection />
        </div>
        {isAllNoticeView && <SearchBar setSearchValue={setSearchValue} />}
      </TabLayout.Add>

      <TabLayout.Content animation={contentsAnimationClass}>
        <div
          ref={containerRef}
          className={`
          flex
          ${isOverflow ? (isAllNoticeView ? 'mb-[172px]' : 'mb-[100px]') : 'h-full'} px-spacing-16 pb-spacing-16 
          bg-color-bg-tertiary
          rounded-radius-8
          overflow-y-auto
          `}
        >
          {isAllNoticeView ? (
            <AnnouncementList
              page={page}
              searchValue={searchValue}
              overflowHandler={overflowCalcTrigger}
            />
          ) : (
            <UnscheduledList page={page} overflowHandler={overflowCalcTrigger} />
          )}
        </div>
      </TabLayout.Content>
    </TabLayout>
  )
}
