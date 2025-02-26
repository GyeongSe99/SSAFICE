import { useEffect, useState } from 'react'
import { tabLabels, tabValues, tabImages } from '@/shared/data/index'

type SelectedData = {
  selectedTitle: string
  selectedContent: string
  selectedImage: string
}

//MARK: LOGIC
const useLandingPageModel = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  // 0번 인덱스를 기본으로 보여줍니다.

  const [selectedData, setSelectedData] = useState<SelectedData>({
    selectedTitle: tabLabels[selectedIndex],
    selectedContent: tabValues[selectedIndex],
    selectedImage: tabImages[selectedIndex],
  })

  const handleSelectedIndex = (index: number) => {
    setSelectedIndex(index)
  }

  useEffect(() => {
    setSelectedData({
      selectedTitle: tabLabels[selectedIndex],
      selectedContent: tabValues[selectedIndex],
      selectedImage: tabImages[selectedIndex],
    })
  }, [selectedIndex])

  // useEffect(() => {
  //   const eventTarget = document.getElementById('slide-target')
  //   if (eventTarget) {
  //     eventTarget.classList.add('animate-slideToLeft')

  //     eventTarget.addEventListener(
  //       'animationend',
  //       () => {
  //         eventTarget.classList.remove('animate-slideToLeft')
  //       },
  //       { once: true },
  //     )
  //   }
  // }, [selectedData.selectedImage]) // 이미지가 변경되면 작동하는 이벤트

  return {
    tabLabels,
    selectedIndex,
    selectedTitle: selectedData.selectedTitle,
    selectedContent: selectedData.selectedContent,
    selectedImage: selectedData.selectedImage,
    handleSelectedIndex,
  }
}

export default useLandingPageModel
