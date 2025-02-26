import { useState } from 'react'

export const useClickedToggle = () => {
  // 토글 형식의 클릭 이벤트 케어에 사용하는 함수입니다.
  // 사용자 클릭 후, 다시 클릭하기 전까지 true 상태를 유지합니다.
  // 메인 공지/미등록 공지 탭의 article 펼치기/접기에 사용됩니다.

  const [isClicked, setIsClicked] = useState(false)

  const handleIsClicked = () => {
    setIsClicked(!isClicked)
  }

  return { isClicked, setIsClicked, handleIsClicked }
}
