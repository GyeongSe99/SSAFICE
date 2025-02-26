import { useEffect, useState } from 'react'

const useLandingImageAnimation = (selectedImage: string) => {
  const [animationClass, setAnimationClass] = useState('')

  useEffect(() => {
    // 애니메이션 클래스 추가
    setAnimationClass('animate-slideInFromRight')

    // 일정 시간 후 애니메이션 클래스 제거
    const timer = setTimeout(() => {
      setAnimationClass('')
    }, 800) // 애니메이션 지속 시간과 동일하게 설정

    return () => clearTimeout(timer)
  }, [selectedImage])

  return animationClass
}

export default useLandingImageAnimation
