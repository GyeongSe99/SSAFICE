import { RefObject, useEffect, useCallback, useState, useRef } from 'react'

export const useClickOutsideToggle = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [ref])
}

export const useHover = <T extends HTMLElement>(): [
  RefObject<T>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
] => {
  const [isHover, setIsHover] = useState<boolean>(false)
  const ref = useRef<T>(null)

  const handleMouseOver = useCallback(() => {
    setIsHover(true)
  }, [])
  const handleMouseOut = useCallback(() => {
    setIsHover(false)
  }, [])

  useEffect(() => {
    const element = ref.current

    if (!element) return
    element.addEventListener('mouseover', handleMouseOver)
    element.addEventListener('mouseout', handleMouseOut)

    return () => {
      element.removeEventListener('mouseover', handleMouseOver)
      element.removeEventListener('mouseout', handleMouseOut)
    }
  }, [ref, handleMouseOver, handleMouseOut])

  return [ref, isHover, setIsHover]
}
