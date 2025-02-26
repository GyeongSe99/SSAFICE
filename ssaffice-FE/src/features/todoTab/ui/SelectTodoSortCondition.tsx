type SelectTodoSortConditionProps = {
  // state?: string
  selectedSort: string
  setSelectedSort: (sort: string) => void
}

import { useClickOutsideToggle, useHover } from '@/shared/model'
import { useEffect, useRef, useState } from 'react'
import { DropDown } from '@/shared/ui'
import { SelectedSortConditionElements } from '../model/SelectedSortConditionElements'
import { DownArrowIcon } from '@/assets/svg'

export const SelectTodoSortCondition = ({
  // state = 'by deadline',
  selectedSort,
  setSelectedSort,
}: SelectTodoSortConditionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  //  const [selectedSortCondition, setSelectedSortCondition] = useState(state)
  const [isDefaultHover, setIsDefaultHover] = useState(true)
  const dropDownRef = useRef<HTMLDivElement | null>(null)

  useClickOutsideToggle(dropDownRef, setIsOpen)
  const [hoverRef, isHover] = useHover<HTMLDivElement>()

  const selectedSortConditionElements = SelectedSortConditionElements({
    selectedSortCondition: selectedSort,
    isOpen,
  })

  // hover 이벤트 발생 시, 기본 hover 상태를 해제
  useEffect(() => {
    if (!isDefaultHover) return

    if (isHover) {
      setIsDefaultHover(false)
    }
  }, [isHover])

  // dropDown이 닫힐 때, 기본 hover 상태로 변경
  useEffect(() => {
    if (!isOpen) {
      setIsDefaultHover(true)
    }
  }, [isOpen])

  // event
  const handleOnClickOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleOnClickContent = (type: string) => {
    setSelectedSort(type)
    setIsDefaultHover(true)
  }
  return (
    <div ref={dropDownRef} className='relative w-fit'>
      <button onClick={handleOnClickOpen} className={selectedSortConditionElements?.bgClass}>
        <div
          className={`flex items-center ${selectedSort === 'by deadline' ? 'gap-x-spacing-10' : ''}`}
        >
          <p className={selectedSortConditionElements?.labelClass}>
            {selectedSortConditionElements?.label}
          </p>

          <div className='w-4'>
            <DownArrowIcon />
          </div>
        </div>
      </button>

      <div ref={hoverRef}>
        <DropDown isOpen={isOpen} position='top-8' width='w-[12.5rem]' isPaddingY={true}>
          {selectedSortConditionElements?.contents.map((content, index) => (
            <DropDown.Content
              key={index}
              onClickEvent={() => handleOnClickContent(content.type)}
              isHover={true}
              isHoverHighLight={true}
              isDefaultHover={isDefaultHover && content.isDefaultHover}
            >
              <p className={content.classname}>{content.label}</p>
            </DropDown.Content>
          ))}
        </DropDown>
      </div>
    </div>
  )
}
