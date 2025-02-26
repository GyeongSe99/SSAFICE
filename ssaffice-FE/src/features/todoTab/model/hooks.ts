import { useEffect } from 'react'

export const useLockScrollX = (element: string) => {
  useEffect(() => {
    const container = document.querySelector(element)
    if (!container) return

    const handleScroll = () => {
      container.scrollLeft = 0
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])
}
