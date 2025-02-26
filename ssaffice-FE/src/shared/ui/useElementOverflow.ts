// 어떤 요소에서 overflow가 발생하고 있는지(스크롤이 생겼는지) 여부를 리턴합니다.
import { useState, useEffect } from 'react'

type useElementOverflowProp = {
  ref: React.RefObject<HTMLDivElement>
  isHeight: boolean // scroll-y인지? (false 시 횡스크롤 여부 리턴)
}

export const useElementOverflow = ({ ref, isHeight }: useElementOverflowProp) => {
  const [isOverflow, setIsOverflow] = useState<boolean>(false)
  const [trigger, setTrigger] = useState<number>(Date.now()) // 컨테이너 크기 다시 계산

  const overflowCalcTrigger = () => {
    setTrigger(Date.now())
  }

  useEffect(() => {
    const checkOverflow = () => {
      if (ref.current) {
        const { scrollHeight, scrollWidth, clientWidth, clientHeight } = ref.current
        isHeight
          ? setIsOverflow(scrollHeight > clientHeight)
          : setIsOverflow(scrollWidth > clientWidth)
      }
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)

    return () => {
      window.removeEventListener('resize', checkOverflow)
    }
  }, [ref, isHeight, trigger])

  return { isOverflow, overflowCalcTrigger }
}
