import { useState } from 'react'

export const useAnnouncementTabSelectView = () => {
  const [isAllNoticeView, setIsAllNoticeView] = useState(false)
  const selectedStyle: string = 'text-color-text-primary cursor-default'
  const unselectedStyle: string = 'text-color-text-disabled cursor-pointer'

  const handleNoticeViewSelect = (label: '미등록 공지' | '전체 공지') => {
    switch (label) {
      case '미등록 공지':
        setIsAllNoticeView(false)
        break
      case '전체 공지':
        setIsAllNoticeView(true)
        break
    }
  }

  return { isAllNoticeView, handleNoticeViewSelect, selectedStyle, unselectedStyle }
}
