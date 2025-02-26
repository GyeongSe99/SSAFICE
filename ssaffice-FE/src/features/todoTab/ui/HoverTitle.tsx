import { ReactNode, useEffect, useState } from 'react'
import {
  useIsTabOpenStore,
  useSetIsTabOpenStore,
  useSetIsAnimationStore,
  useIsFirstRenderStore,
  useSetIsFirstRenderStore,
  useHover,
} from '@/shared/model'

type HoverTitleProps = {
  mouseOverIcon: ReactNode
  mouseOutIcon: ReactNode
  title: string
}

export const HoverTitle = ({ mouseOverIcon, mouseOutIcon, title }: HoverTitleProps) => {
  // store
  const isTabOpen = useIsTabOpenStore()
  const setIsTabOpen = useSetIsTabOpenStore()

  const setIsAnimation = useSetIsAnimationStore()

  const isFirstRender = useIsFirstRenderStore()
  const setIsFirstRender = useSetIsFirstRenderStore()

  // hook
  const [hoverRef, isHover, setIsHover] = useHover<HTMLDivElement>()
  const [buttonHoverRef, isButtonHover, setIsButtonHover] = useHover<HTMLDivElement>()

  // state
  const [isLazyHover, setIsLazyHover] = useState(false)

  // event
  useEffect(() => {
    if (isHover) {
      setTimeout(() => {
        setIsLazyHover(true)
      }, 200)
    } else {
      setTimeout(() => {
        setIsLazyHover(false)
      }, 200)
    }
  }, [isHover])

  const handleOnClickOpen = () => {
    if (isFirstRender) {
      setIsFirstRender(false)
    }

    setIsTabOpen(isTabOpen)
    setIsAnimation(false)
    setIsHover(false)
    setIsButtonHover(false)
  }

  return (
    <div
      ref={hoverRef}
      className={`flex items-center ${isLazyHover ? 'gap-x-spacing-4' : 'gap-x-spacing-12'}`}
    >
      <div
        ref={buttonHoverRef}
        className={`flex items-center ${isTabOpen ? 'hidden' : 'animate-slideExpandFast'}`}
      >
        {!isTabOpen ? (
          isLazyHover ? (
            <div className='relative flex flex-col items-center'>
              <button
                onClick={handleOnClickOpen}
                className={`rounded-radius-circle p-spacing-4 transition-opacity duration-200 ${isHover ? 'opacity-100' : 'opacity-30'} hover:bg-color-bg-tertiary`}
              >
                {mouseOverIcon}
              </button>
              {isButtonHover && (
                <p className='absolute left-0 min-w-max body-md-medium text-color-text-tertiary bg-color-bg-tertiary rounded-radius-8 px-spacing-8 py-spacing-4 top-9 animate-taDa'>
                  공지 펼치기
                </p>
              )}
            </div>
          ) : (
            <button
              className={`transition-opacity duration-200 ${isHover ? 'opacity-30' : 'opacity-100'}`}
            >
              {mouseOutIcon}
            </button>
          )
        ) : null}
      </div>
      <h1 className='min-w-max'>{title}</h1>
    </div>
  )
}
