import { Children, isValidElement, ReactNode } from 'react'
import {
  DropDownImageProps,
  DropDownTitleProps,
  DropDownSubTitleProps,
  DropDownContentProps,
  DropDownMainProps,
} from './types'

// 서브 컴포넌트

function DropDownImage({ children }: DropDownImageProps) {
  return children
}

function DropDownTitle({
  children,
  color = 'text-color-text-primary',
  titleType = 'VIEW',
  title,
  setTitle,
  onClickEvent,
}: DropDownTitleProps) {
  const onChangetitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle && setTitle(e.target.value)
  }

  switch (titleType) {
    case 'EDIT':
      return (
        <div className='flex items-center gap-x-spacing-8'>
          <input
            type='text'
            onChange={onChangetitle}
            className={`body-sm-medium w-[260px] border border-color-border-primary rounded-radius-2 px-spacing-4 focus:outline-none ${color}`}
            value={title}
          />
          <button
            onClick={onClickEvent}
            className='body-xs-semibold text-color-text-info min-w-max'
          >
            저장
          </button>
        </div>
      )
    case 'VIEW':
      return <h1 className={`body-sm-medium ${color} truncate w-[265px]`}>{children}</h1>
  }
}

function DropDownSubTitle({ children, color = 'text-color-text-disabled' }: DropDownSubTitleProps) {
  return <h2 className={`body-xs-medium ${color}`}>{children}</h2>
}

// 서브 컴포넌트 레이아웃

function getDropDownImage(children: ReactNode) {
  const DropDownImageType = (<DropDownImage />).type
  const childrenArray = Children.toArray(children)

  return childrenArray.filter((child) => isValidElement(child) && child.type === DropDownImageType)
}

function getDropDownContent(children: ReactNode) {
  const DropDownImageType = (<DropDownImage />).type
  const childrenArray = Children.toArray(children)

  return childrenArray.filter((child) => isValidElement(child) && child.type !== DropDownImageType)
}

function DropDownContent({
  children,
  onClickEvent,
  isHover,
  isFocus,
  isPaddingY,
  isHoverHighLight,
  isDefaultHover,
}: DropDownContentProps) {
  const Wrapper = onClickEvent ? 'button' : 'div'
  const dropDownImage = getDropDownImage(children)
  const dropDownContent = getDropDownContent(children)

  return (
    <Wrapper
      onClick={onClickEvent}
      className={`flex w-full items-center px-spacing-16 ${isFocus ? 'bg-color-bg-interactive-selected-hover' : ''} ${isDefaultHover && isHoverHighLight ? 'bg-color-bg-tertiary shadow-[inset_3px_0_0_0_rgba(29,78,216,1)]' : isDefaultHover ? 'bg-color-bg-tertiary' : ''} ${isHoverHighLight ? 'hover:shadow-[inset_3px_0_0_0_rgba(29,78,216,1)]' : ''} ${isPaddingY ? 'py-spacing-10' : 'py-spacing-4'} ${isHover ? 'hover:bg-color-bg-tertiary' : ''}`}
    >
      {dropDownImage.length > 0 && <div className='mr-spacing-12'>{dropDownImage}</div>}
      <div className='flex flex-col'>{dropDownContent}</div>
    </Wrapper>
  )
}

// 메인 컴포넌트

function DropDownMain({
  children,
  isOpen,
  isShadow,
  isDivide,
  isPaddingY,
  width,
  position,
}: DropDownMainProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div
      className={`absolute z-20 flex flex-col border bg-color-bg-primary border-color-border-tertiary rounded-radius-8 ${width} ${position} ${isShadow ? 'effect-shadow' : ''} ${isDivide ? 'divide-y-2 divide-color-bg-tertiary' : ''} ${isPaddingY ? 'py-spacing-10' : ''}`}
    >
      {children}
    </div>
  )
}

export const DropDown = Object.assign(DropDownMain, {
  Content: DropDownContent,
  Image: DropDownImage,
  Title: DropDownTitle,
  SubTitle: DropDownSubTitle,
})
